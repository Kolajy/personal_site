---
title: 30 Days Of Operating Systems - Day 11
excerpt: Jeff Dean's numbers
date: 2024-10-11
readTime: 3 min read
tags:
  - Operating-Systems
---

A **Semaphore** is an integer variable managed by the OS that is accessed only through two atomic operations: `wait()` (P) and `signal()` (V).

- **Binary Semaphore**: Can only take values of 0 or 1. Used to enforce mutual exclusion (like a lock).
- **Counting Semaphore**: Can take any non-negative integer. Used to manage a pool of limited resources (e.g., matching 5 available database connections).

When a thread calls `wait()`, the count decrements. If the value becomes negative, the thread blocks and joins the semaphore's queue. Calling `signal()` increments the count and wakes up a blocked thread. The beauty of this is that the scheduler coordinates the waiting queue, so threads do not waste CPU cycles spin-locking.
