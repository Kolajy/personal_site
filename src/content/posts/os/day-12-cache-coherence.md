---
title: 30 Days Of Operating Systems - Day 12
excerpt: Wtf is Cache Coherence?
date: 2024-10-12
readTime: 3 min read
tags:
  - Operating-Systems
---
If you have 8 CPU cores, and each core has its own private L1/L2 cache, what happens when Core 1 modifies a memory address that Core 2 has cached? That is the Cache Coherence problem.

CPUs solve this using hardware protocols (like MESI - Modified, Exclusive, Shared, Invalid). The cores constantly listen to a shared bus (bus snooping) to invalidate cached blocks if another core writes to them.

But this leads to a software bottleneck: **False Sharing**. 

If two threads on different cores update two unrelated variables that happen to live on the same 64-byte chunk of memory (a cache line), the CPU has to bounce that entire cache line back and forth between the cores' caches. 

Relearning this made me see why high-performance queues (like LMAX Disruptor) pad variables with empty bytes to force them onto separate cache lines.
