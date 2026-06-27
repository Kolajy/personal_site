---
title: 30 Days Of Operating Systems - Day 13
excerpt: How's a CPU work?
date: 2024-10-21
readTime: 3 min read
tags:
  - Operating-Systems
---

How does a file system map a file name like `hello.txt` to blocks on a raw magnetic disk or SSD? In Unix systems, the core abstraction is the **Inode (Index Node)**.

An inode is a metadata structure containing:
- File size, permissions, and owner.
- Creation, modification, and access timestamps.
- A list of pointers to the raw disk blocks containing the data.

Crucially, the inode does *not* contain the file name. Directory structures are just special files that map file names to inode numbers. This explains why renaming a file is instant—it just modifies a directory name-to-inode map, without copying any file blocks.
