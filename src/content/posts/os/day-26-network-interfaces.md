---
title: 30 Days Of Operating Systems - Day 26
excerpt: Network Interfaces
date: 2024-10-26
readTime: 3 min read
tags:
  - Operating-Systems
---
Today I looked at how the kernel communicates with physical Network Interface Cards (NICs).

In high-throughput environments (like 10Gbps+ links), hardware interrupts become a bottleneck. If a packet arrives every microsecond, handling an interrupt for each packet would freeze the CPU ("interrupt storm").

Modern network drivers solve this using **NAPI (New API)**. 

When a packet arrives, the NIC fires one interrupt. The kernel driver disables interrupts and switches to a polling loop, reading packets directly from the NIC's ring buffer in RAM. Once the buffer is empty, it re-enables interrupts.

This hybrid approach balances responsiveness at low traffic with throughput at high volumes.
