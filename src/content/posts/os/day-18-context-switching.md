---
title: "Context Switching"
excerpt: "30 Days Of Operating Systems - Day 18"
date: 2024-10-17
readTime: 3 min read
tags:
  - Operating-Systems
---
When the OS scheduler decides to run a different process on a CPU core, it performs a **Context Switch**. 

This involves:
1. Saving the current CPU register values (Program Counter, Stack Pointer, accumulator, etc.) into the process's Task State Segment or kernel stack.
2. Swapping the active page directory pointers to load the new process's virtual memory map.
3. Flushing or tagging the Translation Lookaside Buffer (TLB).
4. Loading the new process's saved register values back into the CPU.

Context switching is a necessary cost of multi-tasking. If your server is running too many threads, it spends all its CPU cycles swapping register states rather than processing requests. In Unix, you can check context switches using `vmstat`.
