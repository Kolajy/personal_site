---
title: "OS Relearning: Day 23 - Hard Links vs Soft Links"
excerpt: "Understanding the underlying inode links that configure file references."
date: "2024-10-23"
readTime: "3 min read"
tags: ["Operating Systems","File System"]
---

Since Unix directory entries map names to inode numbers, we can have multiple directory entries pointing to the exact same inode. This brings us to links:

- **Hard Link**: A directory entry pointing directly to an inode. If you delete the original file name, the inode is still accessible via the hard link. The OS only deletes the file content when the inode's "link count" reaches zero.
- **Soft Link (Symbolic Link / Symlink)**: A special file containing a text path pointing to another file name. If you delete the target file, the symlink breaks ("dangling link").

Hard links cannot span different hard drives because inode numbers are only unique to their specific filesystem, whereas symlinks can point anywhere.
