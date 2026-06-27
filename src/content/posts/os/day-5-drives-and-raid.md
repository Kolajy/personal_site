---
title: "30 Days Of Operating Systems - Day 5"
excerpt: "Drives and RAID"
date: "2024-10-05"
readTime: "3 min read"
tags:
  - Operating-Systems
---
Today I looked at the physical layer: Magnetic HDDs vs Solid State Drives (SSDs), and how RAID groups them.

I knew SSDs were fast, but I didn't realize they have a built-in operating system called the Flash Translation Layer (FTL). SSDs cannot overwrite data in place; they must erase entire large blocks (pages) before writing. The FTL handles virtual-to-physical block mapping on the drive itself, doing garbage collection and wear leveling to make sure the flash cells don't burn out prematurely.

Then there is RAID. I've configured software RAID on servers before but never thought about the trade-offs:
- **RAID 0**: Striping. Fast, but if one drive dies, you lose everything.
- **RAID 1**: Mirroring. Safe, but cuts capacity in half.
- **RAID 5/6**: Parity calculations. Good balance, but writes have a penalty because the CPU has to recalculate parity blocks.

Understanding the wear-leveling limits of SSDs explains why databases write to temporary memory pages first to avoid frequent SSD erases.
