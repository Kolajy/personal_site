---
title: "OS Relearning: Day 24 - I/O Devices and Controllers"
excerpt: "How the CPU coordinates reads and writes to physical hardware devices."
date: "2024-10-24"
readTime: "3 min read"
tags: ["Operating Systems","Hardware","IO"]
---

An operating system communicates with hardware devices through **Device Controllers**. A controller acts as a bridge, translating high-level instructions into raw electrical signals.

The CPU communicates with controllers using:
- **I/O Ports**: Dedicated register addresses read/written using special CPU instructions (like `in` and `out` in x86).
- **Memory-Mapped I/O (MMIO)**: The controller registers are mapped directly to the CPU's memory address space. Reading or writing to those memory addresses triggers hardware actions directly on the device.

To shield developers from writing raw MMIO instructions for every mouse or hard drive model, the OS uses **Device Drivers** to provide a standard interface.
