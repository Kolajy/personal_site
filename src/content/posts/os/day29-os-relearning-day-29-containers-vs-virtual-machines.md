---
title: "OS Relearning: Day 29 - Containers vs Virtual Machines"
excerpt: "How kernel namespaces and cgroups allow containers to skip the guest OS overhead."
date: "2024-10-29"
readTime: "3 min read"
tags: ["Operating Systems","Virtualization","Containers"]
---

Why are Docker containers so much lighter than Virtual Machines?
- **Virtual Machines**: Include a full guest OS, virtual drivers, and virtual memory configurations. They run on virtual hardware managed by a hypervisor.
- **Containers**: Share the host OS kernel directly. 

Containers use two core Linux kernel features:
1. **Namespaces**: Isolate system resources (processes, mount points, network interfaces) so a container thinks it is isolated.
2. **Cgroups (Control Groups)**: Limit and measure resource usage (CPU cores, memory, disk I/O) for a process group.

Containers skip the boot sequence and overhead of a full guest OS, running at native execution speed.
