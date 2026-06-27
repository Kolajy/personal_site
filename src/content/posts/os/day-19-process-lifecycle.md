---
title: 30 Days Of Operating Systems - Day 19
excerpt: The life of a Process
date: 2024-10-18
readTime: 3 min read
tags:
  - Operating
  - Systems
  - Memory
---

What happens when you run out of physical RAM? The OS can write inactive memory pages to disk (swap space) to free up physical frames. 

This leads to **Demand Paging**.

When a process accesses a page that is mapped to virtual memory but is not currently in physical RAM:
1. The page table entry indicates the page is invalid.
2. The MMU generates a hardware interrupt called a **Page Fault**.
3. The kernel traps the interrupt, halts the process, reads the page content from the disk swap file, loads it into a physical frame, updates the page table, and resumes the process.

This process is slow because disk reads are orders of magnitude slower than RAM, but it lets us run applications larger than our physical memory.
