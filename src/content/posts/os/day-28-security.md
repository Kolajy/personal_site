---
title: 30 Days Of Operating Systems - Day 28
excerpt: I should probably cover security
date: 2024-10-28
readTime: 3 min read
tags:
  - Operating-Systems
---
Today I researched how the kernel enforces security. The core principle is isolation.

The CPU enforces hardware-level privileges. 
- **Ring 0**: Kernel Mode. Full access to physical memory and hardware.
- **Ring 3**: User Mode. Sandboxed access.

User programs access kernel resources using system calls. The kernel validates the syscall caller using UID/GID credentials. Linux also uses capabilities to divide root privileges into small permissions (like `CAP_NET_ADMIN` or `CAP_SYS_RAWIO`), so a network tool doesn't need full root access.

Understanding privilege rings explains why system designs restrict container processes to non-root users: if an attacker escapes the user-mode sandbox, they can't hijack Ring 0.
