---
title: 30 Days Of Operating Systems - Day 27
excerpt: OSI Network Model
date: 2024-10-27
readTime: 3 min read
tags:
  - Operating
  - Systems
  - Architecture
  - Kernel
---

Today I read about kernel architectures, specifically the Monolithic vs. Microkernel designs.

- **Monolithic Kernel (Linux)**: The entire OS (scheduler, virtual memory, device drivers, file system) runs in a single, massive address space inside kernel mode. It is fast (no privilege boundaries to cross) but a bug in a single network driver can panic the entire system.
- **Microkernel (MINIX, Mach)**: Only the absolute essentials (IPC, basic scheduling, memory management) run in kernel mode. Drivers and file systems run in user space as normal processes. This is highly secure and stable, but message passing overhead makes it historically slower.

Modern OSes (like macOS or Windows) use hybrid approaches to balance speed and safety.
