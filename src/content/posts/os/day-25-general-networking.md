---
title: "Networking"
excerpt: "30 Days Of Operating Systems - Day 25"
date: 2024-10-25
readTime: 3 min read
tags:
  - Operating-Systems
---
Today I started the Networking section. The operating system kernel is responsible for implementing the entire TCP/IP network stack.

When you call `socket.connect()`, the kernel triggers the TCP 3-way handshake (SYN, SYN-ACK, ACK) transparently. The kernel maintains buffers for incoming and outgoing network data.

When a packet arrives at the network card, a hardware interrupt is triggered. The kernel's driver copies the data to a socket buffer (sk_buff), parses the TCP headers, and wakes up the process waiting on the socket read.

It's amazing how much packet routing and packet parsing happens in kernel space before your application code even knows a byte arrived.
