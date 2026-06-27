---
title: 30 Days Of Operating Systems - Day 14
excerpt: Numa Numa Numa
date: 2024-10-13
readTime: 3 min read
tags:
  - Operating-Systems
---
When you scale to multi-socket servers (servers with 2 or 4 physical CPU chips), you encounter **NUMA (Non-Uniform Memory Access)**.

In a NUMA system, RAM slots are physically divided and wired directly to specific CPU sockets. 
- CPU 1 accessing its local RAM node is incredibly fast.
- CPU 1 accessing RAM wired to CPU 2 requires jumping across an interconnect bus (like QPI or Infinity Fabric), which adds latency and congestion.

If the OS scheduler moves a database thread from CPU 1 to CPU 2, but all its cache data and memory allocations remain on CPU 1's local RAM node, performance degrades.

Relearning this explains why tools like `numactl` are critical when running large databases: we can pin the database process to a specific socket and force it to only allocate local RAM.
