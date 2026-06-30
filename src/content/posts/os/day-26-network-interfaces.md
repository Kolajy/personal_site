---
title: "Network Interfaces"
excerpt: "30 Days Of Operating Systems - Day 26"
date: 2024-10-26
readTime: 3 min read
tags:
  - Operating-Systems
---
Today I started the Networking section. The operating system kernel is responsible for implementing the entire TCP/IP network stack.

**What is a network interface?**

A network interface is the point where an operating system connects to a network. It can be physical (an Ethernet card, a Wi-Fi adapter) or virtual (a loopback interface, a VPN tunnel, a bridge). The OS abstracts all of these under a unified model, so software doesn't need to care whether packets travel over copper, air, or software.

When you call `socket.connect()`, the kernel triggers the TCP 3-way handshake (SYN, SYN-ACK, ACK) transparently. The kernel maintains buffers for incoming and outgoing network data.

When a packet arrives at the network card, a hardware interrupt is triggered. The kernel's driver copies the data to a socket buffer (sk_buff), parses the TCP headers, and wakes up the process waiting on the socket read.

It's amazing how much packet routing and packet parsing happens in kernel space before your application code even knows a byte arrived.


Today I looked at how the kernel communicates with physical Network Interface Cards (NICs).

In high-throughput environments (like 10Gbps+ links), hardware interrupts become a bottleneck. If a packet arrives every microsecond, handling an interrupt for each packet would freeze the CPU ("interrupt storm").

Modern network drivers solve this using **NAPI (New API)**. 

When a packet arrives, the NIC fires one interrupt. The kernel driver disables interrupts and switches to a polling loop, reading packets directly from the NIC's ring buffer in RAM. Once the buffer is empty, it re-enables interrupts.

This hybrid approach balances responsiveness at low traffic with throughput at high volumes.
