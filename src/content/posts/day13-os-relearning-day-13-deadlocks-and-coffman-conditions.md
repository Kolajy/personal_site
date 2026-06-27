---
title: "OS Relearning: Day 13 - Deadlocks and Coffman Conditions"
excerpt: "The four ingredients required for a system to lock up completely."
date: "2024-10-13"
readTime: "3 min read"
tags: ["Operating Systems","Deadlock"]
---

A **Deadlock** occurs when a set of processes are blocked because each process holds a resource and waits for another resource held by someone else in the set.

For a deadlock to happen, the four **Coffman Conditions** must hold simultaneously:
1. **Mutual Exclusion**: At least one resource must be held in non-shareable mode.
2. **Hold and Wait**: A process holding resources can request new resources without releasing what it already has.
3. **No Preemption**: Resources cannot be forcibly taken from a process.
4. **Circular Wait**: Process A waits for B, B waits for C, and C waits for A.

If you can break even *one* of these conditions, you can prevent deadlocks entirely. For example, ordering locks globally breaks the Circular Wait condition.
