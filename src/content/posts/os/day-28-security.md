---
title: Security is never an afterthought!
excerpt: 30 Days Of Operating Systems - Day 28
date: 2024-10-28
readTime: 3 min read
tags:
  - Operating-Systems
---
All too frequently I think security usually takes a backseat when building out projects. I've found security to requrie the deepest knowledge about the behaviors and interactions between systems because without that understanding it's difficult to accurately identify what is a risk and how it is a risk. Today we will be diving into security. Since it is such a deep and broad topic and I am only reserving a single post for it I will be timeboxing myself to 2 hours for research.

The topics that we will cover are:
- Process isolation - process cannot touch each others memory. kernel is in protected memory space
- privilege rings - four privilege rings but most OS only use ring 0 for kernel mode and 3 for user mode. ring determines what is executable
- System calls - gateway from user space to kernel so exploits in sys calls allow access to kernel
- Audit and logging - logging of security relevant events and attempts. detects intrusions after the fact.

Other areas which we will not cover are:
- secure boot - ensures chain during boot process to kernel loading has not been tampered with
- address space layout randomization - randomizes stack, heap and library locations in memory when a prgoram runs
- access control - definition of policies to define what interactions are allowed and who can access
- capabilities - principle of least privilege in practice with processes granted just what it needs
- Filesystem permissions - ACL's on read, write, execute 

## Process Isolation
## Privilege Rings
## System calls
## Audit and logging
## Conclusion
