---
title: 30 Days Of Operating Systems - Day 17
excerpt: Processes and Threads
date: 2024-10-16
readTime: 3 min read
tags:
  - Operating-Systems
---

Yesterday we learned about virtual-to-physical translation. Doing this byte-by-byte would require a massive lookup table. Instead, the OS divides memory into blocks:

- **Pages**: Blocks of virtual memory (typically 4KB).
- **Frames**: Blocks of physical RAM (matching the page size, 4KB).

The mapping between pages and frames is stored in a data structure called a **Page Table**. 

When a program accesses memory, the MMU takes the virtual page number, looks up the corresponding frame in the page table, and adds the byte offset. Because page tables can get huge, modern CPUs use hierarchical (multi-level) page tables so they only allocate table memory for pages currently in use.
