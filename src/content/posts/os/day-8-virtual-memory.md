---
title: "30 Days Of Operating Systems - Day 8"
excerpt: "Virtual Memory"
date: "2024-10-08"
readTime: "3 min read"
tags:
  - Operating-Systems
---
Virtual Memory is easily one of the most brilliant illusions in software engineering. 

Every application thinks it has access to a continuous, contiguous range of memory starting from address `0x0000` up to the hardware max. In reality, the physical slots of RAM are fragmented all over the place.

The CPU hardware has a Memory Management Unit (MMU) that sits between the CPU cores and memory. Every time an instruction references an address, the MMU intercepts it and translates it on the fly using page tables maintained by the kernel.

If Process A and Process B both reference virtual address `0x0400`, they are completely isolated: Process A's translates to physical address `0x9010`, and B's translates to `0x1250`. This hardware-enforced sandbox is what prevents user applications from reading each other's memory.
