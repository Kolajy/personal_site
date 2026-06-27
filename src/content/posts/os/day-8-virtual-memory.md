---
title: 30 Days Of Operating Systems - Day 8
excerpt: How does Virtual Memory Work?
date: 2024-10-08
readTime: 3 min read
tags:
  - Operating-Systems
---

Pipes and shared memory are great for processes running on the same machine. But what if the processes are running on different servers across the world?

We use **Sockets**.

A socket is an IPC abstraction represented as a file descriptor. The operating system handles all the TCP/IP stack implementation beneath the hood. When you write to a socket, the kernel wraps your data in packets and forwards it to the network card.

It's fascinating that the Unix philosophy treats local files, pipes, and network sockets under the same abstraction: everything is a file descriptor you can `read()` and `write()` from.
