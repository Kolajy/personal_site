---
title: Schedulers are everywhere
excerpt: 30 Days Of Operating Systems - Day 27
date: 2024-10-27
readTime: 3 min read
tags:
  - Operating-Systems
---
It wouldn't be surprisnig for most folks familiar with operating systems to be aware of the scheduler but I think what really surprises me after going through the past few weeks is how abundant schedulers are throughout the system. Resource contention is everywhere and every resource in the system needs to have that contention managed managed. The type of scheduler differs even depending on the type of component for instance an optimal scheduelr for a hard drive may be terrible for a ssd!

When categorizing schedulers at a high level they typically follow into three different buckets:
- Long term
- Medium term
- short term

There are many algorithms such as:
- round robin
- first come first serve
- shortest time first 
- shortest job first 
- priority scheduling 
- multilevel queue
- multilevel feedback queue
- Completely fair scheduler (linux uses)

There are schedulers for:
- CPU
- IO
- Memory
- Network
- Threads
- Timer
- CPU Power