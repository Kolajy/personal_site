---
title: 30 Days Of Operating Systems - Day 13
excerpt: How's a CPU work?
date: 2024-10-21
readTime: 3 min read
tags:
  - Operating-Systems
---
Today I looked at CPU Cores and SMT (Simultaneous Multithreading, or Hyperthreading).

A physical core has the actual ALU, registers, and execution units. A logical core is just a duplicated register state. Hyperthreading works by giving a single physical core two sets of registers, pretending to be two processors.

If Thread A is waiting for a memory block to load from RAM (taking 100ns), the CPU instantly switches execution to Thread B on the other logical thread. 

However, they share the same physical execution pipeline. If both threads are doing heavy mathematical calculation, hyperthreading won't double your speed—it might even slow things down due to pipeline stalls.

This is why container CPU allocations must be carefully tuned depending on whether the workload is CPU-bound or I/O-bound.
