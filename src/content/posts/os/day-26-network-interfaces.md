---
title: 30 Days Of Operating Systems - Day 26
excerpt: Network Interfaces
date: 2024-10-26
readTime: 3 min read
tags:
  - Operating
  - Systems
  - Storage
  - Algorithms
---

Even though SSDs are common now, mechanical hard drives still run heavily in data centers. To read blocks, a mechanical arm must physically seek across tracks.

To minimize seek times, the OS uses disk scheduling:
- **FCFS**: Arm moves erratically depending on request sequence.
- **SSTF (Shortest Seek Time First)**: Move to the closest track. Efficient, but can starve requests on far tracks.
- **SCAN (Elevator Algorithm)**: The arm moves from one end of the disk to the other, servicing requests along the way, then reverses.
- **LOOK**: Similar to SCAN, but the arm reverses immediately once there are no more requests ahead in that direction.

Mechanical limits are why understanding physical layout is so important for performance.
