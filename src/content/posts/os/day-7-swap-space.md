---
title: "Is Swap Space Bad?"
excerpt: "30 Days Of Operating Systems - Day 7"
date: 2024-10-07
readTime: 3 min read
tags:
  - Operating-Systems
---
Today I relearned what happens when you run out of physical RAM: Swap Space.

Swap is basically a designated portion of your storage drive that the OS uses as virtual RAM overflow. When physical memory fills up, the OS scheduler evicts inactive memory pages and writes them to the swap disk. When the program needs that memory again, the OS triggers a page fault, reads it back, and swaps something else out.

If you swap too much, you hit **thrashing**—where the OS spends 99% of its CPU time copying memory pages to and from the disk, and 1% running actual code. The system freezes.

Modern OSes are smart. macOS, for instance, uses memory compression instead of immediately swapping. It compresses inactive memory pages in RAM using fast compression algorithms. It's much faster to compress data in L3 cache/RAM than to hit the SSD.
