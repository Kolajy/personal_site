---
title: 30 Days Of Operating Systems - Day 15
excerpt: Malloc and Mmap
date: 2024-10-14
readTime: 3 min read
tags:
  - Operating-Systems
---

Today I reviewed the **Banker's Algorithm**, designed by Edsger Dijkstra. It is a deadlock avoidance algorithm.

The algorithm simulates resource allocation for processes. Before allocating a requested resource, the OS runs safety checks to see if there is still a valid sequence in which all processes can complete, assuming they request their maximum declared resources.

If the allocation leads to an "unsafe state" (where a deadlock *might* occur), the OS denies the request and forces the calling thread to wait. While theoretically sound, it is rarely used in general-purpose OSes because declaring a program's maximum resource needs upfront is impractical.
