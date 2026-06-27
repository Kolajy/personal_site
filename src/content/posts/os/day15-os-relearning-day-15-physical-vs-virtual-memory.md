---
title: "OS Relearning: Day 15 - Physical vs Virtual Memory"
excerpt: "Why virtual memory is the greatest illusion in computer science."
date: "2024-10-15"
readTime: "3 min read"
tags: ["Operating Systems","Memory"]
---

When a computer boots up, RAM is just a massive physical array of bytes. In early computers, programs wrote directly to these physical addresses. If two programs ran at the same time, they could overwrite each other's data.

To solve this, modern OSes implement **Virtual Memory**.

Every process is given the illusion that it has a private, contiguous memory space spanning the entire system capacity (e.g., 4GB on a 32-bit CPU). Under the hood, the CPU's **Memory Management Unit (MMU)** translates these virtual addresses to physical RAM addresses on-the-fly.

This means address `0x0040` in Process A maps to physical slot `0x9500`, while the same virtual address in Process B maps to slot `0x1200`. Complete isolation, transparently managed.
