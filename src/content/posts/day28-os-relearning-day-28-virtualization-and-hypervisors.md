---
title: "OS Relearning: Day 28 - Virtualization and Hypervisors"
excerpt: "How hypervisors coordinate multiple guest OS kernels on a single physical host."
date: "2024-10-28"
readTime: "3 min read"
tags: ["Operating Systems","Virtualization"]
---

Virtualization lets us run multiple independent Operating Systems concurrently on a single physical machine. The core magic behind this is the **Hypervisor** (VMM).

- **Type 1 (Bare Metal)**: Runs directly on the host hardware (e.g., VMware ESXi, Xen). Highly efficient.
- **Type 2 (Hosted)**: Runs as an application inside a host OS (e.g., VirtualBox).

The hypervisor intercepts privilege instructions from guest OSes and translates or coordinates them. Modern CPUs include hardware support (Intel VT-x, AMD-V) to let guest OSes run directly on the hardware for non-sensitive commands, stepping in only for privileged boundary transitions.
