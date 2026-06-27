---
title: "30 Days Of Operating Systems - Day 9"
excerpt: "Buffer Cache"
date: "2024-10-09"
readTime: "3 min read"
tags:
  - Operating-Systems
---
Today I looked at the Buffer Cache (also called the Page Cache). 

When you read a file, the OS doesn't just read it once and forget it. It caches the file blocks in free physical RAM. The next time you read the file, the read is completed entirely from RAM, avoiding the disk controllers.

When you write to a file, the OS writes it to the page cache in RAM, marks the page as "dirty," and immediately returns success to your application. A background kernel thread (like `pdflush` or `kswapd`) runs periodically to flush these dirty pages to disk.

This is why pulling a flash drive out without unmounting it can corrupt files: the data was written to the RAM buffer cache, but the kernel hadn't flushed it to the physical flash cells yet. Calling `fsync()` forces the kernel to write immediately.
