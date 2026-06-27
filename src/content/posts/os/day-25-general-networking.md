---
title: 30 Days Of Operating Systems - Day 25
excerpt: Networking
date: 2024-10-25
readTime: 3 min read
tags:
  - Operating
  - Systems
  - Hardware
  - IO
---

How does the OS know when a device has finished a task?
- **Polling**: The CPU repeatedly loops and checks a register status bit. Simple, but wastes massive CPU cycles ("busy waiting").
- **Interrupts**: The controller sends a hardware signal when it's done. The CPU pauses its current instruction, runs the Interrupt Service Routine (ISR), and resumes.
- **Direct Memory Access (DMA)**: For heavy transfers (like disk reads), the CPU tells the DMA controller the target memory address and tells the device to write directly to RAM. Once complete, the DMA controller sends a single interrupt. This frees the CPU from copying bytes individually.
