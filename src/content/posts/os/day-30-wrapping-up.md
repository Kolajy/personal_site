---
title: "30 Days Of Operating Systems - Day 30"
excerpt: "Wrapping Up the 30 Days"
date: "2024-10-30"
readTime: "3 min read"
tags:
  - Operating-Systems
---
I've finished my 30-day OS journey! What did I actually learn?

Main takeaways:
- **Everything is caching**: Memory caches, page caches, directory mappings—caching is what makes hardware fast.
- **Locks are dangerous**: Concurrency errors are systemic. You must think about lock ordering and lock scopes.
- **The kernel handles everything**: Filesystems, virtual memory, threads, and packet routing are all abstracted away by the kernel.

I no longer treat the operating system as a black box. Having a clear mental model of kernel mode switches, page tables, and context switching makes it much easier to write efficient, stable applications. 

Thanks for reading along!
