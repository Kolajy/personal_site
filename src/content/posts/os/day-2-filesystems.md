---
title: "30 Days Of Operating Systems - Day 2"
excerpt: "Breaking Down Filesystems"
date: "2024-10-02"
readTime: "3 min read"
tags:
  - Operating-Systems
---
So, Day 2 is all about filesystems. When I was looking at this in OSTEP, it struck me how much magic we take for granted when we call `fs.writeFile()` in Node or run a simple Unix pipe. 

Under the hood, a filesystem is just a logical data structure mapped onto raw disk blocks. I relearned what an Inode actually is: it's basically the metadata index of a file. It stores file size, permissions, owner, and pointers to the physical data blocks. The funny thing is, the inode doesn't even know the filename! The filename only exists in a directory file, which is just a simple map matching names to inode numbers.

This explains why renaming a file is practically instant. We aren't moving any raw sectors around on disk; we are just updating a string key in a directory map. Over the years I've spent hours debugging "disk full" issues only to find out the disk ran out of inodes instead of bytes. Now it completely makes sense why that happens.
