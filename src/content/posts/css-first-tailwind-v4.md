---
title: "Embracing CSS-First Configuration with Tailwind CSS v4"
excerpt: "A look into Tailwind v4's new architecture, how it simplifies configuration using pure CSS, and its massive performance improvements."
date: "2026-05-28"
readTime: "4 min read"
---

Tailwind CSS v4 introduces a complete rewrite of the compiler, focusing on speed and a new configuration style that moves away from JS config files (`tailwind.config.js`) and embraces CSS-first configuration.

### What is CSS-First Configuration?

In Tailwind v3, adding custom colors, fonts, or themes required modifying a JS configuration file. In Tailwind v4, everything is configured directly in your main CSS file using the `@theme` directive:

```css
@import "tailwindcss";

@theme {
  --color-brand-500: #8b5cf6;
  --color-brand-600: #7c3aed;
  
  --font-display: "Outfit", sans-serif;
}
```

The compiler automatically detects these CSS variables and maps them to Tailwind utility classes, like `bg-brand-500` or `font-display`.

### Key Benefits

1. **Lightning-fast builds**: The Rust-based compiler parses stylesheet definitions directly, making compilation up to 10x faster.
2. **Simplified tooling**: No more configuration clutter in root project folders.
3. **Native CSS Variables**: All theme values are output as standard CSS variables, making dynamic runtime updates extremely straightforward.
