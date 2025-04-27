---
title: "Building My Website v2.0 with Astro, GitHub Pages, and Cursor"
description: "How I rebuilt my personal website using modern tools and frameworks for better performance, accessibility, and developer experience"
pubDate: "2025-04-24"
heroImage: "https://images.unsplash.com/photo-1484931575886-a5f4df44d5b7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
---

# Building My Website v2.0 with Astro, GitHub Pages, and Cursor

When I decided to rebuild my personal website, I had a clear vision: create a blazing-fast, easy-to-maintain site with top-notch SEO and accessibility. I wanted the simplicity of static site generators like Jekyll but with modern JavaScript frameworks like React. After exploring different options, I landed on a powerful trio: [Astro](https://astro.build), [GitHub Pages](https://pages.github.com), and [Cursor](https://cursor.sh) as my editor of choice.

## Finding the Perfect Fit: Jekyll Alternative with React Powers

I initially considered building my own Jekyll-like static site generator that would work with React components and YAML frontmatter. I wanted the simplicity of Markdown files for content with the flexibility of React for interactive components.

But then I discovered Astro, and it was exactly what I was looking for:

- File-based routing similar to Jekyll
- Markdown support with frontmatter
- Component islands architecture allowing React/Vue/Svelte components 
- Zero JavaScript by default for blazing fast performance
- Built-in image optimization and code splitting

Astro gave me the perfect balance of simplicity and power without having to reinvent the wheel.

## Setting Up the Development Environment

The setup process was surprisingly straightforward. Here's how I got started:

```bash
# Create a new Astro project
npm create astro@latest adnandossaji.github.io

# Navigate to the project
cd adnandossaji.github.io

# Start the development server
npm run dev
```

I chose Cursor as my editor, which is built on VS Code but enhanced with AI capabilities. This combination proved incredibly productive, especially when working with a new framework like Astro.

## Challenges and Solutions

While the journey was relatively smooth, I did encounter a few challenges:

### 1. Designing a Scalable Content Structure

I needed a structure that would accommodate blog posts, projects, and other content types. Astro's content collections solved this beautifully:

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog };
```

This type-safe approach ensured consistency across all content while maintaining flexibility.

### 2. Creating a Responsive, Accessible Layout

Accessibility was a priority from day one. I implemented:

- High-contrast color schemes that meet WCAG guidelines
- Semantic HTML structure
- Proper focus management for keyboard navigation
- Responsive design using CSS variables and a consistent spacing system

The solution was to create a comprehensive design system with proper CSS organization:

```css
/* Design system with consistent tokens */
:root {
  /* Primary Brand Colors - More accessible high contrast versions */
  --primary: #0066cc;
  --primary-dark: #004e9f;
  
  /* Spacing System - Based on 4px grid */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  /* ...other variables */
}
```

### 3. Deploying to GitHub Pages

Deploying to GitHub Pages required some configuration, but Astro made it straightforward with their GitHub Actions workflow:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
    
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v1
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
    steps:
      - uses: actions/deploy-pages@v1
```

## Key Features Implemented

Throughout the rebuild, I focused on several key features:

1. **Blog with Advanced Features**
   - Category and tag filtering
   - Sorting options
   - Sidebar with recent posts and categories
   - Responsive design for all screen sizes

2. **Performance Optimization**
   - Near-perfect Lighthouse scores
   - Minimal JavaScript
   - Optimized image loading
   - Fast page transitions

3. **Modular Component System**
   - Reusable components for consistent UI
   - Separate CSS files for better organization
   - Responsive utility classes

## Tutorial: Create Your Own Site with Astro and GitHub Pages

Want to create your own site using this stack? Here's a quick tutorial to get you started:

### Step 1: Set Up Your Astro Project

```bash
# Create a new Astro project
npm create astro@latest my-website

# Select the blog template when prompted
# Use TypeScript when asked
```

### Step 2: Customize Your Site Structure

Astro uses a file-based routing system located in the `src/pages` directory. Here's a recommended structure:

```
src/
├── components/     # Reusable UI components
├── content/        # Markdown content (blog posts, etc.)
├── layouts/        # Page layouts and templates
├── pages/          # Routes for your site
│   ├── blog/       # Blog-related pages
│   ├── index.astro # Home page
│   └── about.astro # About page
└── styles/         # CSS files
```

### Step 3: Create a Content Collection

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

export const collections = {
  blog: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
      updatedDate: z.date().optional(),
      heroImage: z.string().optional(),
    }),
  }),
};
```

### Step 4: Implement a Blog Layout

```astro
<!-- src/layouts/BlogLayout.astro -->
---
import BaseHead from '../components/BaseHead.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Sidebar from '../components/blog/Sidebar.astro';
import '../styles/components/blog-layout.css';

interface Props {
  title: string;
  description: string;
  activeCategory?: string;
}

const { title, description, activeCategory = '' } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <BaseHead title={title} description={description} />
  </head>
  <body>
    <Header />
    <div class="blog-container">
      <main class="blog-main">
        <slot />
      </main>
      <aside class="blog-sidebar">
        <Sidebar activeCategory={activeCategory} />
      </aside>
    </div>
    <Footer />
  </body>
</html>
```

### Step 5: Deploy to GitHub Pages

1. Create a GitHub repository (ideally named `yourusername.github.io`)
2. Push your code to the repository
3. Set up GitHub Pages in the repository settings
4. Configure your deployment workflow:

```bash
# Add the GitHub pages integration
npx astro add github
```

This will set up all the necessary configuration files for deployment.

## Conclusion

Building my website with Astro, GitHub Pages, and Cursor has been a rewarding experience. I've achieved my goals of creating a fast, accessible site that's easy to maintain and update. The component-based architecture and content collections make it a joy to work with, while the static generation ensures excellent performance and SEO.

If you're considering rebuilding your personal site, I highly recommend this tech stack. It offers the perfect balance of simplicity and power, giving you a modern development experience without sacrificing performance or user experience.

Astro truly delivers on its promise of "build faster websites," and paired with GitHub Pages for hosting and Cursor for development, it's a winning combination for developers who value both productivity and performance.

Have you used Astro for your projects? I'd love to hear about your experience in the comments below! 