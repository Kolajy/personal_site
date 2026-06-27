---
title: 30 Days Of Operating Systems - Day 20
excerpt: Stop Interrupting Me
date: 2024-10-19
readTime: 3 min read
tags:
  - Operating-Systems
---

When a page fault occurs and RAM is full, the OS must choose an existing page to evict to make room. How does it choose?

I reviewed three algorithms:
1. **FIFO (First-In, First-Out)**: Evict the oldest page. Easy, but leads to Belady's Anomaly—adding more RAM can sometimes cause *more* page faults!
2. **LRU (Least Recently Used)**: Evict the page that hasn't been accessed for the longest time. Generally optimal for real workloads, but tracking exact access times is too slow for hardware.
3. **Clock (Second Chance)**: An approximation of LRU. It uses a single access bit in hardware. The OS rotates a pointer through pages. If the bit is 1, it sets it to 0 and gives it a second chance. If it is 0, it evicts it.
