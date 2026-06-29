---
title: Networks and Protocols
excerpt: 30 Days Of Operating Systems - Day 25
date: 2024-10-25
readTime: 9 min read
tags:
  - Operating-Systems
---
# Day 25: Networking

It's day 25 and today we're going over networking. This topic is near and dear to me because it's something I've spent a lot of time on, troubleshooting routers, ping, connectivity, and spent over a year in college diving into network protocols and performing internet scale measurements on the reliability of the Online Certificate Status Protocol. Today we're going to stick with the main network protocols and refresh our knowledge on how the OS handles networking and network models. I suspect this will overlap a lot with distributed systems but I'd like to stick as closely to single systems as I can since distributed systems could be an entire series on its own.

There's a lot when it comes to networks. It's hard to know where to really start so I'll begin with the OSI model.

## OSI Model

This is the classic 7 layer network stack they teach in college. The OSI model is a theoretical framework established by the International Organization for Standardization, it had a lot of stakeholders and compromise which left it more conceptual than practical. In reality the TCP/IP model developed by ARPANET researchers is the standard that actually runs the internet.

|Layer|Name|What it does|Example|
|---|---|---|---|
|7|Application|User-facing protocols|HTTP, DNS, SSH|
|6|Presentation|Encoding, encryption|TLS, JPEG|
|5|Session|Managing connections|NetBIOS|
|4|Transport|End-to-end delivery|TCP, UDP|
|3|Network|Routing between networks|IP, ICMP|
|2|Data Link|Node-to-node on same network|Ethernet, MAC|
|1|Physical|Raw bits over a medium|Cables, Wi-Fi signals|

Below is the TCP/IP model which collapses this into 4 layers:

|Layer|Name|What it covers|Examples|
|---|---|---|---|
|4|Application|Everything the user/app touches|HTTP, DNS, SMTP, SSH, TLS|
|3|Transport|End-to-end communication between processes|TCP, UDP|
|2|Internet|Addressing and routing packets across networks|IP, ICMP, ARP|
|1|Network Access|Physical transmission + framing on a local network|Ethernet, WiFi, MAC addresses|

OSI layers 5 and 6 basically collapse into the application layer and layers 1 and 2 collapse into network access. This model is a lot more straightforward and maps more closely to how networks actually work today.

## A Note on the Session Layer

Different types of developers worry about different layers of the stack. I'd never really heard about the session layer or NetBIOS before this but upon investigation it's a legacy API that predates DNS;  it let computers find each other by name on a LAN, establish two-way sessions and broadcast messages. It's a relic of 80s LAN networking that's disabled on most systems today.

Session-like features are now handled by other protocols like RPC, database sessions and TLS handshakes, just implemented at different layers rather than in one dedicated place.

For the rest of this post we'll follow the TCP/IP model.

## Network Access Layer

This layer covers Ethernet, WiFi and MAC addresses. Honestly this is the domain of home network debugging for me but it gets a lot more complex when you're managing many machines in an organization.

MAC addresses are unique device identifiers, every network interface has one baked in. Importantly they don't travel outside the local network. Within a LAN, switches (not routers) maintain a MAC address table to forward frames to the right device. Externally everything communicates by IP, but locally the network uses MAC addresses to actually deliver frames to the right machine.

The glue between IP and MAC addresses is ARP (Address Resolution Protocol). When a device knows an IP but needs the MAC to deliver a frame locally, ARP broadcasts "who has this IP?" and gets a MAC back. ARP technically lives in the Internet layer of the TCP/IP model but operates below IP conceptually since IP needs ARP to function on a local network.

Ethernet is the protocol for wired connections. WiFi works similarly at the framing level but the headers differ due to the medium, WiFi has to deal with shared airspace, interference and distance in ways a physical cable doesn't, so the standards for handling collisions and retransmissions are different.

There's a lot more to get into here, WiFi bands, standards, auth methods and so on, but most developers work at much higher layers so I'll leave it there.

## Internet Layer

This layer contains IP and ICMP (and technically ARP as mentioned above, though it's a bit fuzzy).

IP's job is to address and route packets across networks. It's connectionless and provides no guarantees around order or reliability, it just does its best to deliver and moves on. The transport layer above handles reliability.

An IP packet wraps data with a header containing metadata like source IP, destination IP and TTL. The TTL (Time to Live) is a counter that gets decremented at each router hop. When it hits zero the packet is dropped, which prevents packets from looping around the internet forever when they can't find their destination.

The IP address itself is split into two parts: the network portion and the host portion. Routers use the network portion to forward packets toward the right destination without needing to know about every individual device on earth. Once the packet gets close enough, the host portion identifies the specific machine. IPv4 has around 4 billion addresses (largely exhausted), IPv6 has near unlimited.

ICMP (Internet Control Message Protocol) isn't for sending application data, it's for network diagnostics. When a router encounters a problem with an IP packet (like an expired TTL), it sends an ICMP message back to the source. ICMP rides inside an IP packet and the message is purely diagnostic.

This is what `ping` uses under the hood (echo request/reply) and what `traceroute` exploits, it sends packets with incrementing TTL values starting at 1. Each router that drops the packet due to TTL expiry sends back a "time exceeded" ICMP message revealing its address, which lets traceroute map out each hop on the path to a destination.

## Transport Layer

Most developers who've worked with distributed systems are familiar with TCP and UDP. TCP provides reliable, ordered delivery. UDP is fire and forget. Each has its place.

UDP is used in things like voice calls and gaming where missing a packet isn't mission critical and having the most up-to-date information matters more than having complete information. There's also QUIC, Google's protocol that runs on UDP but reimplements reliability at the application layer, TCP-like guarantees with better performance. It's what HTTP/3 runs on.

The transport layer's job is to get data to the right application on a device, not just the right device. It does this through ports, IP gets you to the machine, ports get you to the right process on that machine. A full connection is identified by a 4-tuple: source IP, source port, destination IP, destination port. Well-known services listen on fixed ports (443 for HTTPS, 22 for SSH) while the client side gets a random ephemeral port assigned by the OS for each connection, typically in the 49152-65535 range.

TCP establishes a connection with a 3-way handshake (SYN, SYN-ACK, ACK) before any data flows. Once connected, each segment gets a sequence number. The receiver sends back cumulative ACKs saying "I have everything up to byte X", not per-segment confirmations. The sender maintains a window of unacknowledged segments that can be in flight simultaneously, which is how TCP keeps the pipe full without waiting for each individual ACK.

If a segment is missing, the receiver buffers everything that arrived after it and keeps ACKing up to the last contiguous segment received. After 3 duplicate ACKs the sender infers a gap and retransmits (fast retransmit) without waiting for a timeout. Duplicate packets are handled gracefully via sequence numbers, the receiver just discards anything it's already seen.

TCP also does flow control (the receiver advertises how much buffer space it has) and congestion control (starting slow and ramping up until it detects loss, then backing off). Teardown is a 4-way process since each direction of the connection closes independently.

On a decent connection packet loss is usually under 1%, which is why UDP-based video works better than you'd expect. Video codecs also help, they don't send complete frames 30 times a second but rather periodic full frames (I-frames) with deltas between them (P and B frames). A dropped packet might only affect a tiny change between frames rather than an entire image. Combined with a 2-10 second buffer on most streams and adaptive bitrate that drops quality rather than freezing, the result is usually seamless even with some loss.

## Application Layer

Last but not least is the application layer. This is where HTTP, DNS, SSH and TLS live.

DNS resolves domain names to IP addresses. Without it we'd be typing IP addresses into the browser. The resolution process walks a hierarchy, recursive resolver to root nameservers to TLD nameservers to the authoritative nameserver for the domain, and results are cached at each step. Record types cover different use cases: A records for IPv4, AAAA for IPv6, CNAME for aliases, MX for mail servers, TXT for verification and email security (SPF/DKIM).

SSH provides encrypted remote access to machines on port 22. Key-based auth is more secure than passwords, the server stores your public key, sends a challenge, and only the matching private key can respond correctly without ever being transmitted.

TLS adds encryption and authentication on top of TCP. The handshake uses asymmetric encryption to establish shared session keys, then switches to symmetric encryption for actual data transfer since it's much faster. The HTTP data gets encrypted and becomes the payload of the TLS record, to anyone in between all that's visible is the source IP, destination IP and port 443. One nuance: the domain name (SNI) is still visible in plaintext during the handshake since the server needs it to know which certificate to present. Encrypted Client Hello (ECH) is a newer extension that closes this gap but isn't universally deployed yet.

HTTP is the protocol the web runs on. It's a request/response protocol, client sends a method (GET, POST, PUT, DELETE etc.) and the server responds with a status code and data. It's stateless, meaning each request is independent and the server has no memory of previous ones. Cookies and sessions are workarounds built on top. HTTP/2 added multiplexing (multiple requests over one connection simultaneously) and HTTP/3 moved to QUIC/UDP for better performance.

## Conclusion

Wrapping up, this is more of an overview of network protocols across the different layers of the stack than a deep dive into any one area. The main mental model I'd take away is that the network stack is like a burrito, the application data is the filling, wrapped multiple times by lower level protocols to get from one place to another.

TCP or UDP wraps the application data and provides delivery guarantees. IP wraps that and handles routing to the right machine. Layer 2 protocols like Ethernet, fiber OTN, DSL and others handle physical delivery on each individual link. The key insight is that IP is designed to be carried over anything, the global internet is a patchwork of different Layer 2 technologies all agreeing to speak IP.

At each hop a router:

1. Receives the frame
2. Strips the Layer 2 wrapping
3. Reads the destination IP in the IP header
4. Looks up its routing table to find the next hop
5. Rewraps in the appropriate Layer 2 protocol for the outgoing link
6. Sends it out

The IP header stays intact through this entire journey except for the TTL decrementing at each hop.

There's a lot of depth here that spans graph algorithms, routing protocols, software defined networking and more. Maybe after this series I'll dive back in, but for now it's out of scope.

Next up: network interfaces, how application data is actually processed by the OS once received, and how data gets sent out.