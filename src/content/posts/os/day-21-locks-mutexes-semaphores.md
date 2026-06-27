---
title: "30 Days Of Operating Systems - Day 21"
excerpt: "Locks, Mutexes, and Semaphores"
date: "2024-10-21"
readTime: "3 min read"
tags:
  - Operating-Systems
---
Today I dove into synchronization primitives. When multiple threads access shared resources, we need locks to prevent race conditions.

I compared:
- **Spinlocks**: The thread loops repeatedly checking if the lock is free. It wastes CPU cycles but is fast if the lock is held for brief moments.
- **Mutexes/Sleep Locks**: If the lock is busy, the thread tells the kernel to block it. The scheduler moves the thread to the sleep queue and runs another process. When the lock releases, the kernel wakes it up.

Relearning this made me see why spinlocks are restricted to kernel space and very low-level routines—user-space spinlocks can completely starve other threads if the thread holding the lock is context-switched out.
