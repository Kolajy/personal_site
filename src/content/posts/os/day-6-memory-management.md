---
title: "Adventures with RAM"
excerpt: "30 Days Of Operating Systems - Day 6"
date: 2024-10-06
readTime: 3 min read
tags:
  - Operating-Systems
---
Moving on to memory! Today I dove into how the kernel allocates physical RAM pages to process heaps and stacks.

When a program boots, the OS sets up two distinct zones:
1. **The Stack**: Fast, static memory allocation managed automatically by CPU stack pointer registers. It grows and shrinks as functions push and pop frames.
2. **The Heap**: Dynamic memory allocation. When we call `malloc()` in C or instantiate objects in JS, we are requesting blocks on the heap.

The kernel doesn't want to run a syscall for every small `malloc()` because context switches are expensive. Instead, libraries (like jemalloc or glibc) allocate large pools of memory pages from the kernel using `brk()` or `mmap()` syscalls, and then divide them up internally for the application.

It's a neat division of labor: the OS manages pages (large blocks), and the runtime library manages the individual objects (small blocks).
