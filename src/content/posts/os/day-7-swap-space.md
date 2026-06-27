---
title: 30 Days Of Operating Systems - Day 7
excerpt: Is Swap Space Bad?
date: 2024-10-07
readTime: 3 min read
tags:
  - Operating-Systems
---

Since processes have isolated memory address spaces, they cannot read or write to each other's memory directly. To coordinate, they must use **Inter-Process Communication (IPC)**.

The two main strategies are:
1. **Shared Memory**: The kernel maps a common memory page to the address spaces of both processes. Once mapped, they read/write directly at hardware speed. However, they must synchronize accesses themselves.
2. **Message Passing (Pipes/Queues)**: Processes write messages to a kernel-managed buffer. This is safer because the kernel manages the queue, but it involves multiple syscalls and memory copies.

Relearning this made me see why unix pipes (`ls | grep`) are so elegant—they are kernel-managed byte streams connecting stdout to stdin.
