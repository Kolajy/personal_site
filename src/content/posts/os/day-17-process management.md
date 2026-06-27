---
title: 30 Days Of Operating Systems - Day 17
excerpt: Processes and Threads
date: 2024-10-16
readTime: 3 min read
tags:
  - Operating-Systems
---
Today I dove into Process Management, specifically the Unix process creation model: `fork()` and `exec()`.

To create a new process, the parent process calls `fork()`. The kernel copies the parent's process state, creating a child with the exact same variables and code pointer. To run a new program, the child immediately calls `exec()`, replacing its memory image with the target executable.

Copying an entire 1GB process address space on `fork()` sounds slow. But the kernel uses **Copy-on-Write (COW)**. 

The child process shares the physical memory page tables of the parent. The kernel only duplicates a page if one of the processes attempts to modify it. This makes process creation incredibly efficient.
