---
title: 30 Days Of Operating Systems - Day 2
excerpt: Breaking Down Filesystems
date: 2024-10-02
readTime: 3 min read
tags:
  - Operating-Systems
---

Today I dove back into processes and threads. I used to think of a process as a running application, which is true at a high level. But structurally, what is it?

A **process** is the OS's unit of resource allocation. It has its own isolated address space (code, data, heap, stack), file descriptors, security contexts, and environment variables. If one process crashes, it doesn't drag other processes down with it because of this isolation.

A **thread**, on the other hand, is the unit of CPU execution. It lives inside a process and shares that process's address space, heap, and open files. However, each thread gets its own private program counter, register set, and stack to track its execution.

Relearning this made me appreciate why multi-threading is fast but dangerous. Because threads share memory, context-switching between threads is cheap (no need to swap page tables), but a single bug can corrupt the process's shared state and crash everything.
