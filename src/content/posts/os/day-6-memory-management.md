---
title: 30 Days Of Operating Systems - Day 6
excerpt: Adventures with RAM
date: 2024-10-06
readTime: 3 min read
tags:
  - Operating
  - Systems
  - Scheduling
---

Yesterday we learned that we can't predict process runtimes. How do modern operating systems schedule tasks without knowing their futures?

They use **Multi-Level Feedback Queues (MLFQ)**.

The scheduler maintains multiple queues with different priority levels:
- High-priority queues have small time quantums (optimized for quick, interactive tasks like mouse clicks).
- Low-priority queues have large time quantums (optimized for heavy computation).

Processes start at the top queue. If a process uses its entire time slice without yielding (CPU-bound), the scheduler pushes it down to a lower queue. If it yields early (interactive or waiting for I/O), it stays at the top. This simple design allows the system to prioritize interactive tasks automatically.
