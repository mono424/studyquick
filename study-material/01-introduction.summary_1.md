# TUM Cloud Information Systems Course Overview

This course, presented by Prof. Dr. Viktor Leis, explores cloud computing from a technology company/startup perspective offering a Software as a Service (SaaS) cloud service. Students will understand and analyze public cloud services, design cost-efficient and scalable information systems using these services, and delve into the economic aspects of cloud use.

## Course Topics
- Foundational technologies: data centers, virtualization
- Case study: Amazon Web Services (AWS)
- Architecture of cloud-native information systems: client/server, middleware, microservices
- Cost optimization in public clouds: cost and pricing models
- Economic and model-based cloud architecture comparison
- Multi-cloud deployments
- Implications of SaaS: DevOps, security
- Case studies of cloud-native information system architectures and their building blocks: cloud object stores, key/value stores, OLTP DBMS, OLAP DBMS

## Introduction to Cloud Computing

Cloud computing is compared to electricity as a commodity: it's inexpensive, easy to use, and interoperable. The promise of the cloud includes cost savings, scalability, elasticity, resource decoupling, access to expertise, and high-level services.

AWS's annual revenue from 2013 to 2022 showcases the growth of cloud computing, and worldwide spending shows how the cloud is becoming a larger portion of enterprise spending on data centers.

However, there are also downsides to the cloud, including high costs, vendor lock-in, transitioning from open source technologies to proprietary services, limited control, and unpredictable performance.

## Future Scenarios

Two contrasting scenarios for the future of cloud computing are presented:

- Utopia: Commoditized, cheap, interoperable cloud services lower barriers to entry and drive technological innovation.
- Dystopia: A small number of very big "hyperscalers" dominate everything, with incompatibilities preventing migration to other vendors, leading to technological stagnation and high costs.

## Different Aspects of the Cloud

The move to the cloud represents a major change in infrastructure and a significant shift in software engineering. It also changes the business model from selling software licenses to selling a service, impacting software design, development, and operation.

In the cloud, hardware becomes fluid, scalability is nearly unlimited, and the primary goal is to minimize workload cost.

Based on your provided text, it seems like you're describing the key aspects of a cloud computing infrastructure and its corresponding cost structure. Let's review them:

1. **Data Centers**: Centralized facilities for computing resources. They are designed to house a large number of servers, storage systems, and networking equipment, all of which are organized in racks. Data centers require proper cooling to prevent overheating of equipment. Google and Hetzner are mentioned as examples of companies with data centers.

2. **Networking**: Large data centers use Ethernet networks, with a standard of 10 Gbit, although 40 Gbit and 100 Gbit are also common. Network topologies used in data centers include Fat Tree and Leaf-Spine, the latter of which can be expanded with a Superspine level for larger data centers.

3. **Virtualization**: This technology allows for the creation of virtual machines (VMs), which run on hypervisors that emulate specific hardware, enabling multiple VMs to run on a single physical machine. Virtualization ensures good security and, while performance isolation can vary, it is generally acceptable.

4. **Storage**: Virtual disks provide the ability to access local disk storage without the risk of losing data if the instance is stopped. They are implemented via Network Attached Storage (NAS) or Storage Area Network (SAN) and connect through the network.

5. **Other Compute Abstractions**: Containers, Functions as a Service (FaaS), and Unikernels are other methods of managing and executing processes within cloud infrastructure. Containers offer lightweight, isolated environments; FaaS allows for automatic scaling and launching by the cloud provider; Unikernels simplify operating systems for cloud environments where only one service per VM is common.

6. **Total Cost of Ownership (TCO)**: This consists of both capital expenses (CAPEX), such as the facilities and equipment, and operational expenses (OPEX), like energy, maintenance, and staff costs. Power is a crucial factor in data center TCO, with both construction and operational costs scaling linearly with wattage. 

The document then provides two examples of the cost breakdown in a data center, demonstrating how changes in server cost, power consumption, and other factors can significantly affect the TCO.