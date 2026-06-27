---
title: 30 Days Of Operating Systems - Day 9
excerpt: Whats the Buffer Cache
date: 2024-10-09
readTime: 3 min read
tags:
  - Operating-Systems
---

Today we entered the territory of concurrency. The classic problem is the **Race Condition**.

Imagine two threads attempting to withdraw $50 from a shared bank account holding $80 concurrently.
1. Thread A checks if balance ($80) >= $50. Yes.
2. Thread B checks if balance ($80) >= $50. Yes.
3. Thread A deducts $50. Balance is now $30.
4. Thread B deducts $50. Balance is now -$20!

This happens because the operation `balance = balance - withdrawal` is not atomic. In assembly, it's compiled to loading the memory address into a register, subtracting, and writing it back. If a context switch occurs in the middle, data gets corrupted.
