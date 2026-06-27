---
title: 30 Days Of Operating Systems - Day 12
excerpt: Wtf is Cache Coherence?
date: 2024-10-12
readTime: 3 min read
tags:
  - Operating
  - Systems
  - Concurrency
---

A common source of confusion is whether a **Mutex** is just a binary semaphore. I had to look this up to set my mental model straight.

They are fundamentally different in purpose and ownership:
- **Mutex (Mutual Exclusion)**: Has an owner. The thread that locks the mutex *must* be the thread that unlocks it. It is designed to protect shared state.
- **Binary Semaphore**: Has no owner. Thread A can call `wait()` to block itself, and Thread B can call `signal()` to wake it up. It is designed for signaling and coordination.

Using a semaphore as a lock works, but a mutex is optimized for the lock-unlock pattern and often includes features like priority inheritance to prevent deadlocks.
