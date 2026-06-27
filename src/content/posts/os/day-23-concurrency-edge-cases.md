---
title: 30 Days Of Operating Systems - Day 23
excerpt: Deadlocks and Spinlocks and stuff
date: 2024-10-23
readTime: 3 min read
tags:
  - Operating-Systems
---
Today I looked at concurrency edge cases, specifically **Priority Inversion**.

This happens when:
1. Low-priority Thread L holds Lock A.
2. High-priority Thread H requests Lock A and blocks, waiting for L to finish.
3. Medium-priority Thread M starts running a long compute task. Since M has higher priority than L, the scheduler runs M, starving L.
4. Because L is starved, it never releases Lock A. H is locked out indefinitely by a medium-priority thread!

Modern OSes solve this using **Priority Inheritance**: when Thread H blocks on a lock held by Thread L, the kernel temporarily boosts L's priority to match H's, ensuring L runs and releases the lock quickly.
