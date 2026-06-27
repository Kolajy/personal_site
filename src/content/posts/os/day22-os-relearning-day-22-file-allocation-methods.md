---
title: "OS Relearning: Day 22 - File Allocation Methods"
excerpt: "Comparing contiguous, linked, and indexed block allocations."
date: "2024-10-22"
readTime: "3 min read"
tags: ["Operating Systems","File System"]
---

Today I reviewed the three main ways a file system can organize file blocks on a disk:

1. **Contiguous Allocation**: Files are stored in sequential disk sectors. Great read performance (sequential reads are very fast), but suffers from fragmentation and makes it hard to grow a file.
2. **Linked Allocation**: Each block contains a pointer to the next block (like a linked list). Wastes no space, but random access is terrible because you have to read every block sequentially to reach the middle.
3. **Indexed Allocation**: All block pointers are collected in a single index block (the Inode method). This supports fast random access and avoids fragmentation, which is why it is preferred by modern Unix filesystems.
