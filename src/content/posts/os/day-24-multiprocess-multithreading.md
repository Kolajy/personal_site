---
title: "When is multiprocessing faster than multithreading"
excerpt: "30 Days Of Operating Systems - Day 24"
date: 2024-10-24
readTime: 3 min read
tags:
  - Operating-Systems
---
When building backend systems, how do you choose between scaling with processes vs. threads?

- **Multithreading**: Threads share address space. Communication is fast and memory overhead is low. But a single segfault crashes the entire application, and you must coordinate locks.
- **Multiprocessing**: Processes are completely sandboxed. If a worker process crashes, the master process spawns a replacement. But communication requires IPC, and context-switching is slower.

Relearning this made me see why Chrome isolates tabs into separate OS processes (so a crashed tab doesn't kill the browser), while web servers like Nginx use a multi-process worker pool for stability.
