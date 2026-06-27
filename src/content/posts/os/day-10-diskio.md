---
title: 30 Days Of Operating Systems - Day 10
excerpt: How can I optimize disk IO
date: 2024-10-10
readTime: 3 min read
tags:
  - Operating-Systems
---

To solve race conditions, we must protect the code segment that accesses shared resources. This segment is called the **Critical Section**.

Any solution must satisfy three requirements:
1. **Mutual Exclusion**: Only one thread can execute in the critical section at a time.
2. **Progress**: If no thread is in the critical section, wait cycles must not block ready threads from entering.
3. **Bounded Waiting**: There must be a limit on how many times other threads can enter before a waiting thread gets its turn.

Peterson's Algorithm is a beautiful software-only solution for two threads using shared flag variables and a turn indicator, though modern CPUs require hardware atomic instructions to enforce it.
