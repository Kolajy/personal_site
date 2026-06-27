---
title: "30 Days Of Operating Systems - Day 16"
excerpt: "Memory Overflows and Protection"
date: "2024-10-16"
readTime: "3 min read"
tags:
  - Operating-Systems
---
How does the operating system protect itself from malicious memory exploits? Today I looked at memory overflows and stack protections.

In old C code, calling `strcpy()` on a buffer without bounds checks could write past the stack frame, overwriting the function's return address pointer. A hacker could inject shellcode and point the return address back to it.

To prevent this, modern OSes implement:
- **NX Bit (No-Execute)**: Marks memory pages (like the stack and heap) as non-executable. Even if you inject code there, the CPU refuses to run it.
- **ASLR (Address Space Layout Randomization)**: Randomizes the memory locations of the stack, heap, and libraries every time the app starts, making it impossible for exploit code to target hardcoded jump addresses.

It's neat to see how hardware-level flags (NX bit) and kernel layouts (ASLR) work together to secure our code.
