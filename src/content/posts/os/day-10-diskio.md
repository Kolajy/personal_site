---
title: 30 Days Of Operating Systems - Day 10
excerpt: How can I optimize disk IO
date: 2024-10-10
readTime: 3 min read
tags:
  - Operating-Systems
---
Yesterday we covered page caches. Today I wanted to dig deeper into optimizing raw Disk I/O.

When writing high-performance backends, you have to choose between Buffered I/O and Direct I/O (O_DIRECT). Direct I/O bypasses the kernel's page cache entirely, reading/writing directly to disk. Database engines like ScyllaDB or Oracle do this because they want to implement their own caching strategies, which are more optimized for databases than the general-purpose OS cache.

There's also disk scheduling. The OS maintains I/O queues and reorganizes requests to minimize seek times:
- **Deadline**: Guarantees a max service time for requests.
- **BFQ (Budget Fair Queueing)**: Allocates bandwidth budgets fairly to processes.

In production, I've seen database latency drop significantly just by switching the Linux I/O scheduler from BFQ to None/Kyber on NVMe SSD drives.
