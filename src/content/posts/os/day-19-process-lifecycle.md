---
title: "30 Days Of Operating Systems - Day 19"
excerpt: "The Process Lifecycle"
date: "2024-10-19"
readTime: "3 min read"
tags:
  - Operating-Systems
---
Today I mapped out the process lifecycle and states inside the kernel task struct:

- **TASK_RUNNING**: The process is either currently running on a core, or waiting in the scheduler queue (Runnable).
- **TASK_INTERRUPTIBLE / UNINTERRUPTIBLE**: Sleeping/Waiting for an event (like I/O). Interruptible sleeps can be woken up by software signals, while uninterruptible sleeps are waiting on hardware events (like a disk read).
- **EXIT_ZOMBIE**: The process has finished, but its exit code is still waiting to be read by its parent. 

Zombies don't consume memory or CPU; they are just single rows in the process table. But if parent processes fail to call `wait()`, the process table fills up and blocks new process allocations.
