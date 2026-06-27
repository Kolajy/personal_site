---
title: "30 Days Of Operating Systems - Day 20"
excerpt: "Signals and Interrupts"
date: "2024-10-20"
readTime: "3 min read"
tags:
  - Operating-Systems
---
How does the system coordinate asynchronous events? Today I looked at the difference between hardware interrupts and software signals.

- **Hardware Interrupts**: Fired by physical components (keyboard key press, network packet arrival, or DMA transfer completion). The CPU immediately pauses its pipeline and jumps to the kernel's Interrupt Handler.
- **Software Signals**: Sent by the kernel to user-space processes (like SIGINT when you hit `Ctrl+C`, or SIGKILL when you run `kill -9`).

A process can register custom handlers for most signals to clean up connections before shutting down, but SIGKILL and SIGSTOP bypass user space entirely—the kernel handles them directly to terminate the task.
