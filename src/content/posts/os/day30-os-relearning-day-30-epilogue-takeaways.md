---
title: "OS Relearning: Day 30 - Epilogue & Takeaways"
excerpt: "Wrapping up 30 days of Operating Systems concepts: what changed in my engineering mindset."
date: "2024-10-30"
readTime: "3 min read"
tags: ["Operating Systems","Relearning","Conclusion"]
---

Today marks the end of my 30-day journey relearning Operating Systems. Looking back, I realize how much of modern application design is shaped by kernel-level limitations.

My main takeaways:
1. **Caching is everywhere**: From hardware registers and TLB lookup tables to filesystems and disk buffers, caching is what makes things fast.
2. **Concurrency is hard**: The kernel solves the same problems we face in app dev (deadlocks, lock synchronization, and data races).
3. **Abstractions hide costs**: File descriptors, virtual memory, and process threads hide massive complexities (context switches, page faults, and page table walks).

I no longer view the operating system as a black box. It makes me a better developer, database operator, and troubleshooter. Thanks for reading along!
