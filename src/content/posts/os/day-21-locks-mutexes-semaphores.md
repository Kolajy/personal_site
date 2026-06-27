---
title: 30 Days Of Operating Systems - Day 21
excerpt: Concurrency Primitives
date: 2024-10-20
readTime: 3 min read
tags:
  - Operating-Systems
---

While **Paging** divides memory into fixed physical blocks (like pages of a book), **Segmentation** divides memory into logical blocks of variable size based on how programmers view their code (e.g., Code Segment, Stack Segment, Heap, Libraries).

Paging prevents external fragmentation (unused gaps between allocations) but suffers from internal fragmentation (wasted space inside the last 4KB page). Segmentation prevents internal fragmentation but leads to external fragmentation over time as segments of different sizes are loaded and freed.

Modern systems use a hybrid approach: segmentation at the logical layer, mapped to physical frames using paging underneath.
