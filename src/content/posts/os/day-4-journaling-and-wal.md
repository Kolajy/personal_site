---
title: 30 Days Of Operating Systems - Day 4
excerpt: Digging into Filesystem Journaling
date: 2024-10-04
readTime: 3 min read
tags:
  - Operating
  - Systems
  - Processes
---

A process isn't just running or not running. It progresses through a strict state machine managed by the OS scheduler:

- **New**: The process is being created (loading code into memory).
- **Ready**: The process is loaded and waiting to be assigned to a CPU core.
- **Running**: The CPU is currently executing the process's instructions.
- **Blocked / Waiting**: The process cannot continue until an event occurs (e.g., waiting for disk I/O, network packets, or a sleep timer).
- **Terminated**: The process has finished executing, and the OS is cleaning up its memory.

Understanding the "Blocked" state explains why database calls don't freeze the entire machine. When a thread requests data from disk, the scheduler moves it to the Blocked state and instantly runs another Ready process on that CPU core.
