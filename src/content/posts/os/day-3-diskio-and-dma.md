---
title: "Understanding Disk I/O and Memory Interactions"
excerpt: "30 Days Of Operating Systems - Day 3"
date: 2024-10-03
readTime: 3 min read
tags:
  - Operating-Systems
---
# Disk I/O and DMA

Today I wanted to bridge the gap between memory and storage by digging into Disk I/O and Direct Memory Access (DMA). I've spent a lot of time working with databases and I think this area has always been a blind spot for me. Knowing the drives are saturated on I/O or are constantly topped up doesn't really help with understanding why that is occurring or what optimization approaches could be made to improve performance. I've also never really been sure how I/O translates to megabytes per second and what exactly an I/O operation even is.

## What is Disk I/O

So similar to the last entry lets define Disk I/O. I/O just means moving data between two places and disk I/O refers to moving data between disk and RAM. A system call using read essentially moves the data from disk into a buffer in RAM and that trip is referred to as disk I/O. Its called I/O as a term from early computing referring to data transfer involving a device.

## IOPS vs Throughput

Usually when measuring I/O its referred to as an I/O operation or IOPS which I never really understood how to compare to disk transfer speeds usually measured in MB/s. An IOPS is just one discrete request to the disk which can request any amount of data so its apples to oranges when comparing to transfer speed which represents throughput.

These are actually two separate bottlenecks a disk has since it can only handle a limited number of requests per second and transfer a certain amount of data per second. An example of this is with sequential vs random access. Sequential access can have few IOPS but they represent a pull of a large amount of data so the bottleneck here is throughput. Random access can have many IOPS to gather scattered data which means many small requests, making IOPS the bottleneck instead.

An example of this is random read time vs sequential time for 1 MB. If one 4 KB random read took 150 microseconds it would take 37.5 milliseconds to read a megabyte randomly while it would take 1 millisecond to read a megabyte sequentially. The amount of data is the same but there are more IOPS and each IOPS has a flat overhead making the total time cost more. This also affects throughput since reading randomly is much slower per second even though the same amount of data moved.

## Why it Matters

So why does understanding this data movement between RAM and disk matter? Mainly because this movement plays a large part in how long programs take to run. Moving data from disk is orders of magnitude slower than RAM. This is captured well in Jeff Dean's latency numbers which I'll share below:

|Operation|Latency|Also expressed as|
|---|---|---|
|L1 cache reference|0.5 ns||
|Branch mispredict|5 ns||
|L2 cache reference|7 ns|14x L1 cache|
|Mutex lock/unlock|25 ns||
|Main memory reference|100 ns|200x L1 cache|
|Compress 1 KB with Zippy|3,000 ns|3 us|
|Send 1 KB over 1 Gbps network|10,000 ns|10 us|
|SSD random read (4 KB)|150,000 ns|150 us|
|Read 1 MB sequentially from memory|250,000 ns|250 us|
|Round trip within same datacenter|500,000 ns|0.5 ms|
|Read 1 MB sequentially from SSD|1,000,000 ns|1 ms|
|Disk seek|10,000,000 ns|10 ms|
|Read 1 MB sequentially from disk|20,000,000 ns|20 ms|
|Send packet CA to Netherlands to CA|150,000,000 ns|150 ms|

1 us = 1,000 ns / 1 ms = 1,000,000 ns

While the numbers aren't precise and have probably changed since he put this together they capture the order of magnitude difference between varying levels of operations. The CPU reading a megabyte from RAM vs SSD is 4 times slower and a disk seek is 10 times slower than that. Reading 1 MB from SSD vs disk is 20x faster and that's assuming the data on disk is organized sequentially. There's a world of difference here.

## Optimizing Disk I/O

So its in our best interest to reduce the amount of disk I/O whenever we build applications. It seems small but on some systems like databases this occurs millions of times per day. Since the drive is a completely separate device the data has to travel much further to reach the CPU and then eventually travel back to disk to be stored. RAM is the staging layer in between.

There are a lot of things we can do to optimize disk I/O:

**Batching** reduces the fixed overhead of each individual request by doing multiple reads or writes in a chunk. Similar to how Stripe charges a fixed amount on each transaction, you want to minimize how many times you pay that fixed cost. Inserting many rows into a database at once vs one at a time is a classic example.

**Buffering** builds up writes in memory before flushing to disk. Rather than writing every single character of a log file immediately, the runtime holds it in a buffer until there's enough to make one larger write worth doing. This happens mostly automatically underneath your code.

**Mmap** loads pages from files into memory and the OS treats that memory region as the file itself. Its lazy loaded meaning nothing moves from disk until you actually touch that memory address. The OS manages everything so if a part of the file isn't loaded yet it raises a page fault and handles fetching it. There's also only one copy since your program's memory is the OS's buffer rather than copying into a separate location.

**Caching** saves recently accessed data in RAM so you don't need to go back to disk. Similar to how Redis allows quicker access to hot data. Unlike mmap, your code is responsible for the cache logic so the developer manages what stays in memory and when it gets evicted.

**Sequential vs random access** matters because sequential reads are significantly faster, especially on spinning disks where the data is physically located next to each other and the read head doesn't have to jump around. SSDs have better firmware to predict sequential access patterns as well which saves time vs random jumps.

**Async I/O** lets you do other work while waiting for data to move into RAM from disk. I/O operations are mostly waiting so there's no reason the CPU needs to sit idle during that time.

**Avoiding disk access entirely** by keeping data in memory is the most direct optimization. The fastest disk I/O is the one you don't do.

## How Async I/O Actually Works

While many of these techniques seem similar they operate in a different enough way to earn their own name. Something that stood out to me here is the async I/O model and how that actually works under the hood, so lets explore that.

When grabbing a file from disk the program declares it to the OS and the OS delegates that movement to the hardware. The firmware controller handles the actual read process and notifies the CPU once the work is complete so it can resume.

This notification is a hardware interrupt that immediately pauses the CPU. It saves its current state and jumps to an interrupt handler which just marks the operation as complete and returns. The handler is designed to do as little as possible since other interrupts may be disabled while it runs. The actual work of resuming the program gets queued for the event loop to pick up on its next iteration. The event loop is a topic worth digging into separately when we explore CPUs more.

## Direct Memory Access (DMA)

This whole process of moving data from disk into memory without CPU involvement is called DMA or Direct Memory Access. It covers not just disk but also network cards and GPUs accessing memory directly. By freeing up the CPU during data transfer the system can do other compute work rather than waiting around, making everything faster and more efficient.

Historically the CPU was responsible for copying every single byte from a device controller register into RAM. If you wanted to read a large log file the CPU sat there in a loop copying bytes one at a time. This is called Programmed I/O and it was incredibly wasteful. DMA was invented specifically to take that job away from the CPU.

One thing worth knowing is that DMA can write into any part of RAM without the CPU checking, which creates security vulnerabilities. A malicious device plugged into a Thunderbolt or PCI slot could potentially read or write arbitrary memory. Modern systems address this with an IOMMU which restricts which regions of RAM each device is allowed to touch.

## Conclusion

So to wrap up: DMA is the process a device uses to move data into RAM without CPU involvement. IOPS is the number of I/O requests per second. Throughput is data transfer per second. And understanding the difference between the two helps explain why the same amount of data can take 37x longer to read depending on how its organized on disk.