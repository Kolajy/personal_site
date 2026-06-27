---
title: "Digging into Filesystem Journaling"
excerpt: "30 Days Of Operating Systems - Day 4"
date: 2024-10-04
readTime: 3 min read
tags:
  - Operating-Systems
---
If your computer loses power in the middle of writing a file, how does the system recover without corrupting everything? That is what journaling (ext4) and Write-Ahead Logging (WAL in databases) are built to solve.

I spent today researching how journaling works. When a filesystem wants to write a block, it does it in three phases:
1. Write the metadata update to a dedicated journal block on disk.
2. Commit the journal write.
3. Write the actual data blocks to the filesystem.

If the power dies halfway through step 3, the OS boots up, looks at the journal, sees an uncommitted transaction, and safely rolls it back. If it dies after step 2, the OS can replay it.

It's cool to see how database engines like Postgres copy this exact OS-level journaling concept for their WAL. It is all about writing logs sequentially first, because sequential disk writes are always faster and safer than random writes.
