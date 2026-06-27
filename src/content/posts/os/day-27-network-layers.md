---
title: "30 Days Of Operating Systems - Day 27"
excerpt: "Network Layers and Routing"
date: "2024-10-27"
readTime: "3 min read"
tags:
  - Operating-Systems
---
How does the kernel decide where to send a packet? It walks the **Routing Table**.

Every OS maintains a routing table mapping IP subnets to specific interfaces or gateway routers. When a process sends data, the kernel evaluates the destination IP, matches the most specific subnet route, wraps the data in an Ethernet frame with the gateway's MAC address, and sends it out.

This is exactly what happens with the "Routing Hub" metric on my site's specs bar. The IP address geolocates back to the ISP's gateway routing center, which acts as the edge node connecting your local network to the global internet backbone.
