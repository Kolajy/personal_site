---
title: Breaking Down Filesystems
excerpt: 30 Days Of Operating Systems - Day 2
date: 2024-10-02
readTime: 7 min read
tags:
  - Operating-Systems
---
# Day 2: Filesystems

Today we're diving into filesystems. The term feels familiar, like something that should be intuitive, but when I try to define it I think back to the thousands of hours spent navigating the command line, moving folders on a desktop, partitioning disks, and back in the day, defragmenting hard drives. All of these things interact with the filesystem, but what actually is it?

Is it the `C:\` drive on Windows or the `/` root directory on Linux? Kind of, but it represents a lot more than that.

Here's a reasonable working definition:

> A filesystem is a set of rules and data structures that an operating system uses to control how data is stored, organized, and retrieved on a storage device. It translates raw digital storage into the familiar folders and files you interact with daily.

So there is both a physical representation of actual storage and a logical abstraction that encapsulates the rules and data structures the user interfaces with.

## The Three Layers

Digging deeper reveals a third layer called the Virtual Filesystem (VFS), which handles translation between the user-facing view and the hardware, as well as coordinating across potentially multiple filesystems. A single drive can actually have multiple different types of filesystems on it, which requires partitioning first so each filesystem has its own isolated space and they don't interfere with each other.

These partitions are defined at the start of the drive, giving the system metadata about how the drive is split up. The two main partitioning schemes are Master Boot Record (MBR) and GUID Partition Table (GPT).

## Why Are There So Many Filesystems?

There are a lot of different filesystems out there. OS vendors have built their own, Linux distributions have several, and there are plenty of cross-platform options too. You'd think there'd be one optimal version, but it turns out this is a case where one size really doesn't fit all.

Filesystems have different performance, reliability, scale, and hardware requirements. Some were designed for spinning disk hard drives, others for flash storage or even floppy disks. Different use cases also demand different tradeoffs: databases require frequent random reads and writes, while video editing works on large sequential chunks of data. These two workloads want almost opposite things from a filesystem.

On the reliability side, options like journaling and copy-on-write exist, each with different overhead. More real-time systems that have strict speed requirements might skip journaling entirely. APFS from Apple is interesting because it spans all their devices, from Apple Watch to desktop Mac. There's also `tmpfs`, which lives entirely in RAM and disappears on reboot, and `procfs`, which is less a real filesystem and more a window into kernel data structures.

A lot of older filesystems could theoretically be deprecated, but the machines using them are still out there and migrating them all at once is impractical. The owners have to make that call individually.

## What a Filesystem Exposes to Users

The filesystem gives users two core abstractions:

**Files** are groups of bytes representing a document, image, video, or any other data that can be read or written.

**Directories** are special files that hold mappings from human-readable names to the identifiers of the actual file metadata, called inodes.

Different filesystems implement this differently, but generally a directory entry points to an inode, which holds the file's metadata (size, permissions, ownership, timestamps) along with pointers to the actual data blocks where the file lives on disk. Since files can be large and variable in size, data gets split across blocks, typically starting at 4KB. The filesystem is divided into sectors, and blocks occupy one or more whole sectors. A sector can never be shared between two blocks since the sector is the atomic unit of disk I/O.

This inode model is primarily a Linux and Unix concept. Windows represents things somewhat differently through NTFS.

To recap: directory entries map names to inodes, inodes contain metadata and block pointers, and blocks point to the actual data scattered across the disk.

That scattering matters for performance. On a spinning hard drive, fragmented files are significantly slower to read because the physical read head has to seek to multiple locations. On an SSD there are no moving parts, but sequential access is still faster than random due to read-ahead prefetching, internal parallelism across NAND chips, and lower controller overhead when processing sequential commands.

## How It's Implemented

**The logical layer** lives in the OS kernel as a driver, typically written in C. It runs in kernel space with privileged hardware access and handles reading and writing inodes, traversing directories, allocating blocks, and managing journal writes. On Linux these are loadable kernel modules, which is why you can add support for new filesystems without recompiling the kernel.

**The physical layer** is split across two places. On the kernel side, block device drivers translate block requests from the filesystem driver into sector-level reads and writes, then send those as commands to the hardware through the appropriate protocol (NVMe, SATA, USB). On the drive side, firmware running on a dedicated controller chip handles things like wear leveling, error correction, and bad block management. This firmware is completely invisible to the OS.

The clean separation here is the important part. The filesystem driver doesn't know if it's talking to an SSD or an HDD. The drive firmware doesn't know what filesystem is above it. Each layer hides its complexity behind a well-defined interface.

## The Virtual Filesystem

The VFS sits above the filesystem drivers and provides a single unified interface to user space. When your program calls `open("file.txt")` it doesn't know or care whether the underlying filesystem is ext4, NTFS, or FAT32. The VFS routes that call to the right driver.

To do this efficiently, the VFS maintains several in-memory structures:

- **File table** — tracks which files each process has open and the current read/write position
- **Dentry cache** — caches previously resolved paths so directory traversal doesn't repeat itself
- **Inode cache** — caches recently accessed inodes so the filesystem driver doesn't get hit repeatedly
- **Page cache** — caches recently read data blocks in RAM
- **Superblock** — stores metadata about mounted filesystems and which driver to use for each

Almost all of this lives in RAM. The only part that comes from disk is the superblock, which is read once at mount time. The rest gets built up lazily as the system runs, which is why a freshly booted machine often feels slower at first and faster after it's been running for a while.

On Linux, you can mount completely different filesystems at different paths and it all just works:

```
/           → ext4
/boot/efi   → FAT32
/mnt/usb    → exFAT
/mnt/win    → NTFS
```

The same syscalls work across all of them. The VFS handles the routing transparently.

## Goals of a Filesystem

From a systems perspective, the goals of a filesystem are:

- **Correctness** — data should survive power loss and crashes without corruption; journaling and copy-on-write exist for this reason
- **Performance** — minimize random disk seeks, fast directory lookups, efficient block allocation to keep related data close
- **Space efficiency** — low metadata overhead, compression support, minimizing wasted space from small files in large blocks
- **Scalability** — handle files from a few bytes to terabytes, and directories from a handful of entries to millions
- **Security** — permissions, ownership, encryption at rest
- **Recoverability** — repair tools like `fsck`, snapshots, and in some cases built-in redundancy
- **Compatibility** — long-term stability of the on-disk format so old data stays readable

These goals conflict with each other constantly. Copy-on-write improves correctness but can hurt performance and increase fragmentation. Larger block sizes improve throughput but waste space on small files. Every filesystem makes different tradeoffs, which is another reason so many of them exist.

## What Users Actually Want

From the user's perspective the goals are much simpler: store data, get it back, organize it, find it, share it, and trust it won't disappear. The syscalls the VFS exposes map directly to these:

|Goal|Syscalls|
|---|---|
|Store data|`open()`, `creat()`, `write()`, `close()`|
|Retrieve data|`read()`, `lseek()`, `mmap()`|
|Organize|`mkdir()`, `rmdir()`, `chdir()`|
|Find|`stat()`, `readdir()`, `getcwd()`|
|Share|`chmod()`, `chown()`|
|Durability|`fsync()`, `sync()`|

Worth noting: most shell commands are thin wrappers around these same syscalls. `ls` calls `opendir()` and `readdir()`. `rm` calls `unlink()`. `mv` calls `rename()`. The shell is just another abstraction layer on top of syscalls, the same way the VFS is an abstraction on top of filesystem drivers.

## Wrapping Up

Under the hood, a filesystem is a logical data structure mapped onto raw disk blocks. An inode is the metadata index of a file: it stores size, permissions, owner, timestamps, and pointers to wherever the data actually lives. Interestingly, the inode has no idea what the file is named. The filename only exists in a directory, which is just a map matching names to inode numbers. This is similar to how DNS maps domain names to IP addresses, neither side needs to know about the other's internal details.

This design is why renaming a file is nearly instant. Nothing moves on disk. The data blocks stay exactly where they are. All that changes is a string key in a directory map.