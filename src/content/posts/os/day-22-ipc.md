---
title: "30 Days Of Operating Systems - Day 22"
excerpt: "Inter-Process Communication"
date: "2024-10-22"
readTime: "3 min read"
tags:
  - Operating-Systems
---
Processes are isolated. To communicate, they must use Inter-Process Communication (IPC).

I spent today comparing:
1. **Unix Domain Sockets**: Fast local network-like communication. The kernel handles message boundary alignment.
2. **Pipes**: Unidirectional byte streams. Extremely elegant in command line routing (`cat log | grep error`).
3. **Shared Memory**: Mapping a single physical memory frame to the virtual spaces of two processes. This is the fastest IPC because once mapped, it bypasses the kernel completely.

This explains why Redis or local database clients connect via Unix sockets instead of TCP loopback (`127.0.0.1`)—Unix sockets bypass the network stack entirely, cutting latency in half.
