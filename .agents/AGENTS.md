# Personal Site - Agent Rules & Project Guidelines

Welcome! This workspace is set up to allow autonomous AI agents to build, modify, and manage the personal website.

## Project Structure
- `src/App.jsx`: Main single-page application with page routing (Home, Projects, Blog) and layout.
- `src/data/projects.js`: Contains structured project showcase items.
- `src/data/posts.js`: Contains structured blog post content.
- `src/index.css`: Tailwind CSS v4 source and custom styling variables.

## Guidelines for Adding Content

### 1. Adding a New Project
To add or update a project, edit `src/data/projects.js`.
Ensure every project conforms to this schema:
```javascript
{
  id: "project-id",
  title: "Project Title",
  description: "A short, engaging description of what the project does.",
  tags: ["React", "Tailwind", "Vite"],
  links: {
    github: "https://github.com/...", // optional
    live: "https://..." // optional
  },
  featured: true // boolean to show on home page
}
```

### 2. Adding a New Blog Post
To add a new blog post, edit `src/data/posts.js`.
Use standard Markdown format inside the template literal for the `content` property.
Ensure every post conforms to this schema:
```javascript
{
  id: "blog-post-title-slug",
  title: "Blog Post Title",
  excerpt: "A brief summary shown on the blog list page.",
  date: "YYYY-MM-DD",
  readTime: "5 min read",
  content: `
    ## Markdown Subheading
    Write post content using basic markdown. The Markdown parser in App.jsx will render it correctly.
  `
}
```

## Styling & Design System
- This project uses **Tailwind CSS v4** with CSS-first configuration in `src/index.css`.
- Keep the design clean, responsive, and accessible (WCAG compliant).
- Use interactive transitions, hover effects, and modern palettes (e.g., violet/emerald accents on dark charcoal backgrounds).
