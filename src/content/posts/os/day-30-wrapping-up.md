---
title: That's a Wrap
excerpt: 30 Days Of Operating Systems - Day 30
date: 2024-10-30
readTime: 3 min read
tags:
  - Operating-Systems
---
# Day 30: That's a Wrap

What a ride. I've finished my 30 day OS journey and it's honestly been a lot of fun. Writing this has kept me more actively engaged while reviewing these concepts and helped me stay on track rather than going down endless rabbit holes.

We covered a lot of ground here and while there's definitely more depth to many of these topics I think I've developed enough of a functional understanding to piece things together and dive into any concept without being confused. More importantly I have a much clearer mental model of the operating system as a whole and how it interacts with different components.

A deep understanding of how systems work improves the performance of code written at higher levels and makes it easier to understand what's actually possible versus what approaches might be fundamentally flawed. That alone makes this worth it.

We ended up covering different topics than originally planned on day one, but I think the path we took was better for it. Rather than jumping between disparate parts we were able to progress along a connected path which helped build intuition around the system as a whole. Here's everything we covered over the past 30 days:

1. Intro / Planning / General OS
2. Filesystems
3. Disk IOPS and Direct Memory Access
4. Journaling and Write Ahead Logging
5. Drives and RAID
6. Memory Management
7. SWAP
8. Virtual Memory
9. Buffer Cache
10. Temp
11. Memory Hierarchy
12. Cache Coherence
13. CPU Cores
14. NUMA
15. Memory Mapping and Allocation
16. Overflow
17. Process Management
18. Context Switching
19. Process Lifecycle
20. Signals and Interrupts
21. Locks, Mutexes and Semaphores
22. IPC
23. Concurrency Failure Modes and Edge Cases
24. Multiprocess / Multithreading
25. Network Layers and Network Protocols
26. Network Interfaces
27. Networks
28. Security
29. Boot Process
30. This post!

If I had to wrap everything into four main takeaways:

- **Everything is caching.** Memory caches, page caches, directory mappings. Caching is what makes hardware fast.
- **Locks are dangerous.** Concurrency errors are systemic. You have to think carefully about lock ordering and lock scopes.
- **The kernel handles everything.** Filesystems, virtual memory, threads, packet routing. All of it is abstracted away by the kernel.
- **Layers are everywhere.** Every layer has one job and doesn't need to know how the layers above or below it work, just that they do.

Thanks for reading along!