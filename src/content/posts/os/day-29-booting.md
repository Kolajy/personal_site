---
title: "30 Days Of Operating Systems - Day 29"
excerpt: "The Booting Process"
date: "2024-10-29"
readTime: "3 min read"
tags:
  - Operating-Systems
---
Today I looked at how a computer boots up. It is a chain reaction of bootstrap stages:

1. **BIOS/UEFI**: Runs Power-On Self-Test (POST) and initializes hardware.
2. **Bootloader**: UEFI reads the boot partition and runs the bootloader (like GRUB or Windows Boot Manager).
3. **Kernel Loading**: The bootloader loads the compressed kernel image into RAM and jumps execution to it.
4. **Init Process**: The kernel mounts the root filesystem and spawns the first user-space process (like `systemd` on Linux, or `launchd` on macOS) with PID 1.
5. PID 1 spawns all other system services and user shells.

Relearning this made me see how critical PID 1 is—it acts as the parent of all processes and is responsible for cleaning up orphan zombie processes.
