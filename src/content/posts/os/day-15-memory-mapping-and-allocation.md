---
title: "30 Days Of Operating Systems - Day 15"
excerpt: "Memory Mapping and Allocation"
date: "2024-10-15"
readTime: "3 min read"
tags:
  - Operating-Systems
---
Today I looked at the `mmap()` system call. 

Instead of reading a file by copying it into a buffer, `mmap()` tells the kernel to map the file contents directly into the process's virtual address space. 

When you read a mapped memory address, the CPU triggers a page fault, and the kernel loads the file block directly from disk into RAM. It bypasses the double copying (copying from disk cache to user buffers).

Many databases (like MongoDB's MMAPv1 engine or LMDB) use `mmap()` to delegate cache management entirely to the operating system. Let the OS kernel handle page eviction instead of writing database-level memory managers.
