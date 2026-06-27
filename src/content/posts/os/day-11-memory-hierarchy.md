---
title: "30 Days Of Operating Systems - Day 11"
excerpt: "The Memory Hierarchy"
date: "2024-10-11"
readTime: "3 min read"
tags:
  - Operating-Systems
---
Today I reviewed the Memory Hierarchy. In systems design, speed is entirely relative. 

Here is the latency scale I mapped out:
- **CPU Registers**: < 0.5 nanoseconds (speed of light limits)
- **L1 Cache**: ~1 nanosecond (on-chip)
- **L2 Cache**: ~3-4 nanoseconds
- **L3 Cache**: ~12-15 nanoseconds (shared across cores)
- **Main RAM**: ~60-100 nanoseconds
- **NVMe SSD**: ~10,000 - 50,000 nanoseconds
- **Network Roundtrip**: ~10,000,000+ nanoseconds

If the CPU registers were a coffee cup on your desk, L1 is your bookshelf, RAM is a store down the street, and disk is a warehouse on another continent.

This hierarchy is why cache-friendly code (keeping data contiguous so it fits in L1/L2 caches) runs circles around code that jumps all over memory.
