require('dotenv').config()
const {DocumentProcessorServiceClient} = require('@google-cloud/documentai').v1;
const {Storage} = require('@google-cloud/storage');
const pdf = require('pdf-parse');
const path = require("path");
const fs = require("fs");

const client = new DocumentProcessorServiceClient({
    apiEndpoint: 'us-documentai.googleapis.com',
    projectId: process.env.GOOGLE_STORAGE_PROJECT_ID,
    credentials: {
      client_email: process.env.GOOGLE_STORAGE_EMAIL,
      private_key: process.env.GOOGLE_STORAGE_PRIVATE_KEY,
    }
});
const storage = new Storage({
    projectId: process.env.GOOGLE_STORAGE_PROJECT_ID,
    credentials: {
      client_email: process.env.GOOGLE_STORAGE_EMAIL,
      private_key: process.env.GOOGLE_STORAGE_PRIVATE_KEY,
    }
});

const googleOCRPreprocess = {
    filesUrls: [],
    async preprocess(files) {
        for (let file of files) {
            console.log(`Uploading & OCR file ${file}...`);
            const absolutePath = path.resolve(file);
            const filename = path.basename(file);
            await uploadFile(absolutePath, filename);
            this.filesUrls.push({
                prefix: await this.getDocumentAiText(filename),
                filename: filename
            });
            await deleteFile(filename);
            console.log(`File OCR done.`);
        }
        console.log(`All texts are ready.`);
    },

    async getInfo(index) {
        const {prefix, filename} = this.filesUrls[index];
        const query = {
            prefix,
        };

        const [files] = await storage.bucket(bucketName).getFiles(query);

        console.log("Collect files ...")
        for (let file of files) {
            console.log(`- ${file.name}`);
        }
        const fileContents = await Promise.all(
            files.map((file) => file.download())
        );

        console.log("Delete files ...")
        await Promise.all(
            files.map((file) => file.delete())
        );
        
        return {filename, content: fileContents.map((file) => JSON.parse(file.toString())["text"]).join("\n")};
    },

    length() {
        return this.filesUrls.length;
    },

    async getDocumentAiText(filename) {
       try {
        const processorId = "2de4ccbdbab25b1a";
        const name = `projects/${process.env.GOOGLE_STORAGE_PROJECT_ID}/locations/us/processors/${processorId}`;
        const outputPrefix = `gs://${bucketName}/${filename}__ocr`;

        const request = {
            name,
            inputDocuments: {
                gcsDocuments: {
                documents: [
                    {
                        gcsUri: `gs://${bucketName}/${filename}`,
                        mimeType: 'application/pdf',
                    },
                ],
                },
            },
            documentOutputConfig: {
                gcsOutputConfig: {
                    gcsUri: outputPrefix,
                    fieldMask: {
                        paths: ['text', 'pages.pageNumber'],
                    },
                },
            },
        };

        const [operation] = await client.batchProcessDocuments(request);
        await operation.promise();
        console.log('Document processing complete.');

        return outputPrefix;
       } catch (error) {
        console.log(error.statusDetails, JSON.stringify(error.statusDetails));
        throw error;
       }
    }
}

const localOCRPreprocess = {
    filesUrls: [],
    async preprocess(files) {
        for (let file of files) {
            const absolutePath = path.resolve(file);
            const filename = path.basename(file);
            this.filesUrls.push({
                fullpath: absolutePath,
                filename: filename
            });
        }
        console.log(`All texts are ready.`);
    },

    async getInfo(index) {
        const {fullpath, filename} = this.filesUrls[index];

        let dataBuffer = fs.readFileSync(fullpath);
        const {text} = await pdf(dataBuffer);
        return {filename, content: text};
    },

    length() {
        return this.filesUrls.length;
    }
}

const bucketName = "studyquick-gpt-4-ocr";

function summaryPrompt(text) {
    return `Summarize the following pdf-extracted text in commonmark format:\n\n${text}`;
}

function cardsPrompt() {
    return `Create flashcards for the summary above. Use the following format:\n\nQ: <question>\nA: <answer>\n\nQ: <question>\nA: <answer>\n\n...`;
}

function getPageText(pageNum, PDFDocumentInstance) {
    return new Promise(function (resolve, reject) {
        PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
            pdfPage.getTextContent().then(function (textContent) {
                var textItems = textContent.items;
                var finalString = "";
                for (var i = 0; i < textItems.length; i++) {
                    var item = textItems[i];
                    finalString += item.str + " ";
                }
                resolve(finalString);
            });
        });
    });
}

async function uploadFile(filePath, destFileName) {
    const options = {
        destination: destFileName,
    };
    
    await storage.bucket(bucketName).upload(filePath, options);
    console.log(`${filePath} uploaded to ${bucketName}`);
}

async function getContents(gcsUri) {
    return (await storage.bucket(bucketName).file(gcsUri).download()).toString();
}

async function deleteFile(gcsUri) {
    await storage.bucket(bucketName).file(gcsUri).delete();
}

//`gs://${bucketName}/${fileName}`
// async function getText(gcsSourceUri) {
//     const gcsDestinationUri = gcsSourceUri + ".ocr.json";

//     const inputConfig = {
//         mimeType: 'application/pdf',
//         gcsSource: {
//             uri: gcsSourceUri,
//         },
//     };

//     const outputConfig = {
//         gcsDestination: {
//             uri: gcsDestinationUri,
//         },
//     };

//     const features = [{type: 'DOCUMENT_TEXT_DETECTION'}];
//     const request = {
//         requests: [
//             {
//                 inputConfig: inputConfig,
//                 features: features,
//                 outputConfig: outputConfig,
//             },
//         ],
//     };

//     const [operation] = await client.asyncBatchAnnotateFiles(request);
//     const [filesResponse] = await operation.promise();
//     const destinationUri = filesResponse.responses[0].outputConfig.gcsDestination.uri;
//     console.log(filesResponse.responses[0].outputConfig.gcsDestination.uri);

//     return destinationUri;
// }

function splitTextByNewline(text, chunkLen) {
    const chunks = [];
    let chunk = '';
    for (let line of text.split('\n')) {
        if (chunk.length + line.length > chunkLen) {
            chunks.push(chunk);
            chunk = '';
        }
        chunk += line + '\n';
    }
    chunks.push(chunk);
    return chunks;
}

async function main(files, output, prompts, preprocessor) {
    const { ChatGPTAPI } = await import('chatgpt')

    const api = new ChatGPTAPI({
        apiKey: process.env.OPENAI_API_KEY,
        completionParams: {
          model: 'gpt-3.5-turbo'
        }
    })

    output = path.resolve(output);

    if (!fs.existsSync(output)) {
        fs.mkdirSync(output);
        console.log('Directory created successfully.');
    } else {
        console.log('Directory already exists.');
    }

    await preprocessor.preprocess(files);

    for(let fileIndex = 0; fileIndex < preprocessor.length(); fileIndex++) {
        const {filename, content} = await preprocessor.getInfo(fileIndex);
        textchunks = splitTextByNewline(content, 35000);

        console.log(`Generating summary for ${filename}, containing ${textchunks.length} chunks ...`);
        let i = 0;
        for (let chunk of textchunks) {
            console.log(`Chunk ${++i}/${textchunks.length} ...`)

            const outputSummary = path.resolve(output, filename.replace(/\.pdf$/, "") + `.summary_${i}.md`);
            const outputCards = path.resolve(output, filename.replace(/\.pdf$/, "") + `.cards_${i}.md`);

            let res = prompts ? {
                text: summaryPrompt(chunk),
            } : await api.sendMessage(summaryPrompt(chunk));
            fs.writeFileSync(outputSummary, res.text);

            res = prompts ? {
                text: cardsPrompt(),
            } : await api.sendMessage(cardsPrompt(), {
                parentMessageId: res.id
            });
            fs.writeFileSync(outputCards, res.text);

            console.log(`Chunk ${i} done.`)
        }
    }
}

require('yargs')
    .command('$0 <files...>', 'Prepare pdfs for learning', (yargs) => {
        return yargs.positional('files', {
            describe: 'a list of pdf files to prepare for learning'
        }).option('output', {
            alias: 'o',
            type: 'string',
            description: 'output folder',
            default: './study-material'
        }).option('prompts', {
            alias: 'p',
            type: 'boolean',
            description: 'saves prompts instead of evaluating them',
            default: false,
        }).option('gcp', {
            alias: 'g',
            type: 'boolean',
            description: 'uses gcp ocr instead of local pdf parsing',
            default: false,
        })
    }, async (argv) => {
        await main(argv.files, argv.output, argv.prompts, argv.gcp ? googleOCRPreprocess : localOCRPreprocess);
    })
    .strictCommands()
    .demandCommand(1)
    .parse()