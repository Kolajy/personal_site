---
title: "OS Relearning: Day 17 - Translation Lookaside Buffer (TLB)"
excerpt: "How the CPU caches virtual address lookups to avoid hitting RAM twice."
date: "2024-10-17"
readTime: "3 min read"
tags: ["Operating Systems","Memory","CPU"]
---

If every memory access required looking up a page table stored in RAM, our systems would run at half speed. To speed things up, the CPU uses a dedicated hardware cache called the **Translation Lookaside Buffer (TLB)**.

The TLB stores recently translated page-to-frame mappings. 

When the CPU accesses an address:
1. It checks the TLB (fast, single-cycle lookup).
2. If it's a **TLB Hit**, translation is immediate.
3. If it's a **TLB Miss**, the MMU must walk the page table hierarchy in RAM to translate the address and load the mapping into the TLB.

This makes context switching expensive, because switching processes requires flushing the TLB cache (unless tagged with Address Space Identifiers).
