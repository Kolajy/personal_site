---
title: "Understanding Disk I/O and Memory Interactions"
excerpt: "30 Days Of Operating Systems - Day 3"
date: 2024-10-03
readTime: 3 min read
tags:
  - Operating-Systems
---
Today I wanted to bridge the gap between memory and storage by digging into Disk I/O and Direct Memory Access (DMA).

Historically, the CPU was responsible for copying every single byte from a disk controller register into RAM. If you wanted to read a large log file, the CPU sat there spinning in a loop copying bytes. This is called Programmed I/O, and it is incredibly wasteful.

To solve this, hardware designers built DMA. The CPU basically offloads the transfer: it tells the DMA controller, "hey, read 50 blocks from this disk track and put them in this RAM address range, let me know when you're done." The CPU is free to schedule other threads, and the DMA hardware handles the raw memory copy. Once finished, a hardware interrupt fires to notify the kernel.

It makes me appreciate why database systems optimize for sequential reads—they are setting up large DMA transfers and letting the hardware run at max throughput.
