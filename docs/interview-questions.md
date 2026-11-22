# Interview Questions (AWS Cloud Support Engineer)
1. **What is a hypervisor?** Software that lets one physical machine run multiple isolated VMs by sharing CPU, memory and I/O.
2. **What is the AWS Nitro System?** Dedicated Nitro Cards (VPC, EBS, security) plus a lightweight hypervisor and security chip.
3. **What does the Nitro Hypervisor do?** CPU and memory isolation; I/O is offloaded to Nitro hardware.
4. **What is a vCPU?** A virtual processor, usually one hardware thread of the host.
5. **Can you choose the physical host?** Not normally; use Dedicated Hosts or placement groups for control.
6. **How are instances isolated?** Hypervisor-enforced memory/CPU isolation, separate ENIs, security groups and EBS volumes.
7. **What is an AMI?** A template with the root volume, launch permissions and block device mappings.
8. **Security Group vs NACL?** SG is stateful, instance-level, allow-only; NACL is stateless, subnet-level, allow and deny.
9. **Site not loading on EC2 – steps?** Instance/status checks, SG port 80, IGW route, NGINX status, file permissions, logs.
10. **Who is responsible for what?** AWS: hardware to hypervisor. Customer: guest OS, apps, SG rules, data, IAM.
