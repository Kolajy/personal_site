---
title: Computer Lifecycle Stuff
excerpt: 30 Days Of Operating Systems - Day 29
date: 2024-10-29
readTime: 8 min read
tags:
  - Operating-Systems
---
# The Boot Process

"Tell me what happens after you power a computer on" is one of the classical interview questions. It's something I've learned and reviewed multiple times only to keep a general memory and forget all the nuanced details. Each time I review it, a little bit more sticks. For this penultimate post I figured I should go through it again and this time have something to refer back to when I forget.

We'll first go over the boot process at a high level and then jump into the details for each step. Most of this leans more towards Unix / macOS but I should probably review Windows one day.

## The Boot Process

1. POST: Hardware checks before BIOS / UEFI. Makes sure things like RAM and GPU are seated and working. Definitely recall wrangling with this when I couldn't load into the BIOS menu on an older machine.
2. BIOS / UEFI: POST is the beginning of UEFI which finds the boot device and bootloader.
3. Bootloader: Loads the kernel and initramfs into memory.
4. Kernel Loading: Kernel decompresses, initializes drivers, and mounts initramfs as a temporary root.
5. Initramfs: Temporary userspace that mounts the real root filesystem.
6. Init Process: systemd / launchd takes over and starts services, spinning up all necessary processes.
7. Login: Spins up the display, shell, and login screen.

The above is a rough overview. I'll dive into each step in more detail below.

## POST

This is the part I've banged my head against the most when trying to fix an old computer, but also the space I have the least context around outside of following tutorials and how-to guides.

POST begins as soon as the first instruction is loaded. But how does the computer know how to grab the first instruction? When a machine is powered off, the prefetch unit inside the CPU is hardwired to point at the reset vector, which contains the first instruction the CPU must run. This information is located on the SPI flash chip, which is integrated into the motherboard itself and holds the UEFI firmware image.

The CPU grabs this instruction and the first thing that actually runs is the POST process, which is a checklist to verify the hardware needed to boot is functional. The things it checks are:

- CPU: Checks if the processor is working and loads CPU microcode updates, which are copied from firmware into the CPU since the CPU can't store them permanently.
- RAM: Confirms read/write to cells work, and determines how much RAM is present and where.
- Chipset: Verifies the PCH (Platform Controller Hub) / FCH (Fusion Controller Hub) is working. This is the router and controller for southbridge peripherals like storage, USB, networking, and audio.
- Graphics: Initializes the GPU to a minimal working state to confirm it can display something.
- Storage Controllers: Checks that SATA and NVMe controllers are functional so it can find a bootable device.
- Bus Init: Ensures PCIe lanes are up and devices are enumerable.

It doesn't deeply check everything though. It's more of a smoke test to see if things run at all rather than a fine grained health check of each device. If there are issues at this point it will start beeping in patterns or cycling through debug LED numbers on the motherboard.

Something extra I learned was related to the PCH / FCH. The CPU has its own express lanes and then there are chipset lanes. System RAM, primary graphics, and NVMe SSDs need low latency and maximum bandwidth since that's where programs run and calculations happen. Chipset lanes share the bandwidth of a single interconnect lane. This is a physical constraint since you can't connect everything directly to the CPU, and some devices are lower speed and don't have those requirements so dedicating CPU lanes to them would be wasteful. The PCH / FCH is like a middle management layer, sorting out minor tasks locally and sending important aggregated data up to the CPU.

## UEFI

The reason you hear both BIOS and UEFI is that historically it was called BIOS, but most modern systems use UEFI. POST is the beginning of UEFI and spinning up the bootloader is the end, so what happens in the middle?

- Security Initialization: Ensures the bootloader is signed by a trusted key by checking against an internal database.
- Driver Loading: Loads drivers like storage controllers, USB, networking, and graphics at the firmware level.
- ACPI Tables: Data structures built in RAM that describe hardware to the OS, things like CPU topology, power management capabilities, thermal sensors, and hardware interrupt routing. The OS reads these rather than probing hardware directly.
- SMBIOS Tables: Also built in RAM to describe the system to software. This is where tools like CPU-Z or your OS system info panel get data like motherboard model, RAM speed, and BIOS version.
- Option ROMs: Peripherals like GPUs and network cards can have their own firmware. UEFI finds and executes these so devices are fully initialized before the OS loads.
- Boot Manager UI: The UI that runs in the UEFI environment before the OS loads.
- Runtime Services: A small chunk of UEFI that stays resident in RAM permanently for the OS to call into for reading and writing NVRAM variables.

UEFI drivers and OS drivers are different in that UEFI drivers do the bare minimum to get the system up and running, and eventually the OS picks up ownership during runtime to perform more advanced functionality and maximize hardware performance. Once the OS boots its own drivers, the UEFI drivers are discarded from memory.

So really UEFI sets up all the device information and structures for later stages to build on. From there the last step is to hand off execution to the bootloader.

## Bootloader

Getting closer to the OS now. The bootloader's job is to bridge the gap between UEFI and the OS kernel actually running. The kernel has specific requirements about the environment it expects to start in.

What the bootloader receives from UEFI:

- A memory map describing all of RAM
- Access to all UEFI boot services and drivers still running
- 64 bit mode execution

The bootloader's job is to:

1. Find the kernel: Read the boot partition filesystem to locate the kernel image.
2. Load the kernel into RAM: Decompress the kernel and place it at the address it expects.
3. Load the initial ramdisk: A temporary filesystem loaded into RAM with enough drivers and tools to mount the real root filesystem.
4. Build the boot parameters: Assemble a structure in RAM that the kernel knows how to read, telling it where the memory map is, where initramfs is, and what boot flags or options were passed.
5. Call ExitBootServices: Tears down the UEFI environment and hands over the memory map.
6. Jump to the kernel entry point: Passes control to the kernel.

The bootloader lives on the system drive in a dedicated partition called the EFI System Partition.

## Kernel Initialization / InitramFS

Once the bootloader has loaded the kernel into memory and jumped to the entry point, the real kernel starts running via the `start_kernel()` function.

It starts off in a primitive state. The first code that runs is actually assembly since the environment isn't safe for C yet. It makes it safe by:

- Validating it landed in the right place
- Establishing a basic stack
- Clearing the BSS segment
- Setting up early CPU state

The kernel then configures the CPU by defining:

- Global Descriptor Table: Defines memory segments used by the CPU. Mostly legacy at this point since in 64 bit mode the CPU forces all segment bases to 0 and ignores limits, so every segment covers the full address space. Still used to identify what mode the CPU is running in, for privilege levels, and for the Task State Segment which tells the CPU which stack to switch to when an interrupt fires in user mode.
- Interrupt Descriptor Table: The CPU's jump table for interrupts and exceptions, including hardware interrupts like keyboard and NIC input, CPU exceptions like divide by zero and page faults, and invalid opcodes.
- Page Tables: The MMU sits between code and physical RAM, translating virtual addresses used in code to physical addresses on the RAM chip. This is stored in a radix tree that gets walked for each access unless it's cached in the Translation Lookaside Buffer. Page tables also govern what memory is accessible at a given privilege level.

At this point the kernel also wakes up the secondary CPU cores that have been idle since power on. By setting up the initial page tables it creates the separation between kernel space and user space. The ACPI tables built by UEFI earlier are read here so the kernel knows what hardware it's working with.

OS drivers then begin to initialize, taking over full functionality of devices from the minimal UEFI drivers. The PCI bus is scanned and devices are matched to their drivers.

The initramfs loaded by the bootloader is mounted and the kernel uses those tools to mount the real root filesystem on disk, after which the initramfs is discarded.

## Init Process

Almost done. The final thing the kernel does in its initialization is launch PID 1, the first userspace process. On Linux this is systemd. Up until this point every process has been in kernel space. Launching PID 1 causes a cascade of service and daemon starts that eventually brings up the login and desktop environment.

The init process is where the OS transitions from a single kernel thread to a fully running system with all its services. PID 1 gets handed some information to bootstrap it:

- Kernel command line parameters
- Environment variables
- File descriptors for stdin / stdout / stderr connected to the console

On Linux, PID 1 runs systemd, which on start:

- Sets up its own internal state
- Mounts virtual filesystems the kernel exposes but doesn't mount itself:
    - /proc: Kernel and process information
    - /sys: Hardware and driver information
    - /dev: Device nodes for hardware access
    - /run: Temporary runtime data

These are kernel interfaces that look like filesystems and are used by tools to find processes, talk to hardware, and write temporary files.

Systemd builds a dependency graph of all tasks and figures out what can start in parallel and what is optional vs required. Systemd is honestly a whole separate topic I've spent a fair amount of time wrangling with so I'll skip going deep on it here. In general it makes sure all services for the system's functionality are up beyond what the kernel provides on its own.

At the end systemd starts the processes that allow user login and an interactive desktop to appear. Once you log in you're set up in userspace under your own session.

## Conclusion

This last post of substance has been a long one. I think learning all the core concepts over the past 28 days has really helped reinforce my understanding of these areas and puts things in context. The boot process touches every part of the system and it's incredible to see how different layers build on top of each other to get a functional interactive user experience running. It really is a lot and I remember the first time learning this being quite daunted just by the high level overview. This time around I had to actively restrain myself from digging deeper into every little detail.