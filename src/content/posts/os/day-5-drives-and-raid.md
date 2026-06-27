---
title: 30 Days Of Operating Systems - Day 5
excerpt: Drive types and RAID
date: 2024-10-05
readTime: 3 min read
tags:
  - Operating
  - Systems
  - CPU
  - Scheduling
---

How does the CPU decide which Ready process to run next? I refreshed my memory on the basic scheduling algorithms:

1. **First-Come, First-Served (FCFS)**: Simple FIFO queue. But it suffers from the convoy effect—if a massive CPU-bound task runs first, all short interactive tasks get stuck behind it.
2. **Shortest Job First (SJF)**: Minimizes average waiting time by running the quickest jobs first. Sounds perfect, but it is impossible to predict exactly how long a future job will take.
3. **Round Robin (RR)**: Each process gets a small slice of time (a quantum). If it doesn't finish, it goes to the back of the queue. This is fair and highly responsive for interactive systems.

Modern operating systems don't use these pure algorithms directly; they use mixed systems called Multi-Level Feedback Queues, which we will look at next.
