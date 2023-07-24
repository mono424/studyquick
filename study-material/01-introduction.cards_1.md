1. Q: What encouraged every department to acquire and operate its servers in pre-cloud IT?
   A: The affordability of computers was a significant factor.

2. Q: How did the growth of servers in every department affect the organization's IT budget?
   A: As the number of servers grew, each department hired staff to operate them, leading to overlap and duplication of expertise and thus increasing the IT budget.

3. Q: What is a data center in the context of cloud computing?
   A: A data center is a centralized facility used for housing computer systems and associated components, like telecommunications and storage systems.

4. Q: Why might "compute center" be a better term for data centers?
   A: "Compute center" might be a better term because these facilities primarily function to provide centralized computing resources.

5. Q: What is the purpose of racks in a data center?
   A: Racks allow for the organization and compact storage of servers within a small space.

6. Q: What is a 'pod' in the context of a data center?
   A: A pod refers to a set of racks that contain servers, storage facilities, network switches+connections, and power connections.

7. Q: What is the concept behind the "hot aisle" and "cold aisle" cooling method in data centers?
   A: This concept involves the arrangement of racks in a way that one side of the racks forms a 'cold aisle' that faces the air conditioning output, while the opposite side forms a 'hot aisle' where the server exhausts are placed.

8. Q: What is the standard Ethernet network in large data centers?
   A: The standard Ethernet network in large data centers is 10 Gbit, although 40 Gbit and 100 Gbit are also common.

9. Q: What is a Top-of-Rack (ToR) switch?
   A: A Top-of-Rack (ToR) switch is a network switch that is located at the top of a rack and is responsible for connecting the servers in that rack to the network.

10. Q: What is the disadvantage of having a root switch in a Fat Tree topology?
   A: The root switch is a single point of failure, meaning if it fails, it could disrupt the whole network.

11. Q: How does a Leaf-Spine topology benefit large data centers?
   A: A Leaf-Spine topology can survive the failure of a spine switch and can be scaled to accommodate more racks to some extent.

12. Q: How does a Superspine level contribute to the Leaf-Spine topology?
   A: A Superspine level solves the limitation of a limited number of connections that switches have, enabling very large data centers.

13. Q: What is the role of a hypervisor in virtualization?
   A: A hypervisor enables virtualization by creating and managing virtual machines, providing each with a virtual operating platform that emulates the underlying hardware.

14. Q: How does modern CPU hardware support virtualization?
   A: Modern CPUs have hardware support for virtualization through technologies like Intel VT-x and AMD-V, which enable efficient execution of virtual machines.

15. Q: How does a hypervisor handle I/O device access for virtual machines?
   A: The hypervisor provides virtual hardware devices for each virtual machine or guest OS. When an OS attempts to access a device, control passes to the hypervisor, which invokes the virtual device software.

16. Q: What is the importance of built-in virtualization in modern cloud vendor hardware?
   A: Built-in virtualization in hardware like SSDs allows for the hypervisor to be bypassed on the "data path," speeding up operations like read and write.

17. Q: How does virtualization provide security and performance isolation for tenants?
   A: Virtualization isolates tenants at a very low level, providing good security as each virtual machine is separate. However, performance isolation may vary depending on what other tenants are doing on the same physical machine.

18. Q: What happens to the content of a local disk if an instance is stopped in a VM?
   A: If an instance is stopped, the content of a local disk in a VM is generally gone.

19. Q: What is the solution to preserving data when a VM instance is stopped?
   A: The solution is the use of virtual remote disks which can be provisioned on demand and allow for elastic pricing. 

20. Q: What are the two main options for implementing virtual disks?
   A: The two main options are Network Attached Storage (NAS) and Storage Area Network (SAN).

21. Q: What are containers in the context of cloud computing?
   A: Containers are lightweight, isolated environments for running applications in a cloud infrastructure. They are based on extended process isolation facilities of operating systems.

22. Q: What are some benefits of containers compared to VMs?
   A: Containers offer lower startup times and better memory utilization than VMs.

23. Q: What are some benefits of VMs compared to containers?
   A: VMs offer better security, better performance isolation, and allow for changing the operating system, compared to containers.

24. Q: What is Functions as a Service (FaaS)?
   A: Functions as a Service (FaaS) is a cloud service that allows users to upload code (a function) that is exposed through HTTP and is launched and scaled automatically by the cloud provider.

25. Q: What are unikernels in the context of cloud computing?
   A: Unikernels are simple, single-address space operating systems designed for cloud environments where only one service per VM is common. They remove the need for process isolation, simplifying the operating system.

26. Q: What components are considered in the Total Cost of Ownership (TCO) of a data center?
   A: The Total Cost of Ownership (TCO) includes capital expenses (CAPEX) such as the cost of facilities, compute, storage, networking, and operational expenses (OPEX) such as energy, maintenance, and staff costs.

27. Q: How does power consumption impact the Total Cost of Ownership (TCO) of a data center?
   A: Power consumption is crucial for data centers as all the primary components of a data center (power, cooling, and space) scale linearly with watts. Hence, a significant portion of the TCO is determined by power costs.

28. Q: What is a typical server power consumption in a data center?
   A: A typical server in a data center consumes about 500W.

29. Q: How does server cost affect the Total Cost of Ownership (TCO) of a data center?
   A: The cost of servers, their power consumption, and their maintenance costs are part of the capital expenses and operational expenses that contribute to the TCO.

30. Q: What is server depreciation in the context of data center costs?
   A: Server depreciation is