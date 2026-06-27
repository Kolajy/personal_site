---
title: "OS Relearning: Day 3 - The System Call Boundary"
excerpt: "Exploring how user space requests actions from kernel space, and why user-to-kernel mode switches are expensive."
date: "2024-10-03"
readTime: "3 min read"
tags: ["Operating Systems","Kernel","Syscalls"]
---

When a program wants to read a file or send a network packet, it can't just access the hardware directly. If it could, malicious code could easily hijack the system. Instead, the OS implements a strict boundary: User Mode vs. Kernel Mode.

To cross this boundary, programs use **System Calls (syscalls)**.

When a syscall is made:
1. The CPU generates a software interrupt.
2. The CPU switches from User Mode (ring 3) to Kernel Mode (ring 0).
3. The kernel's trap handler validates the request and runs the corresponding kernel code.
4. The CPU switches back to User Mode.

This switch is known as a mode switch. It's expensive because the CPU has to save registers, change privilege rings, and clear or update CPU caches. It explains why batching disk reads is always faster than reading byte-by-byte.
