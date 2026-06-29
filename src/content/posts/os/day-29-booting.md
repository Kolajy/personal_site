---
title: "Computer Lifecycle Stuff"
excerpt: "30 Days Of Operating Systems - Day 29"
date: 2024-10-29
readTime: 3 min read
tags:
  - Operating-Systems
---
Today I looked at how a computer boots up. It is a chain reaction of bootstrap stages:

1. **BIOS/UEFI**: Runs Power-On Self-Test (POST) and initializes hardware.
2. **Bootloader**: UEFI reads the boot partition and runs the bootloader (like GRUB or Windows Boot Manager).
3. **Kernel Loading**: The bootloader loads the compressed kernel image into RAM and jumps execution to it.
4. **Init Process**: The kernel mounts the root filesystem and spawns the first user-space process (like `systemd` on Linux, or `launchd` on macOS) with PID 1.
5. PID 1 spawns all other system services and user shells.

When you press the power button the firmware kicks on, BIOS on older systems, UEFI on modern ones. Its job is to run a quick hardware check (POST) and then find something bootable. It hands off to the bootloader, typically GRUB on Linux, which lives in a small reserved section of the disk. The bootloader loads the kernel into memory and passes control to it.

From there the kernel takes over. It initializes the hardware, loads drivers so it can actually talk to devices and mounts the root filesystem. Once the kernel has enough set up to run user space it spawns PID 1, the first and only process it directly creates. On modern Linux this is systemd, on macOS it's launchd.

Every process on the system from that point forward is a descendant of PID 1. Systemd works through a dependency graph of services, networking, logging, display servers, daemons -- starting them in the right order until the system is fully up. What feels like an instant from pressing power to seeing a login screen is actually a carefully sequenced handoff from firmware to bootloader to kernel to user space, each stage only possible because the one before it succeeded.

Relearning this made me see how critical PID 1 is—it acts as the parent of all processes and is responsible for cleaning up orphan zombie processes.
