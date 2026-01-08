---
title: "Website v3.0: TinaCMS, Swiss Precision, and the Joy of a Complete Workflow"
description: "How I finally closed the loop on my personal site by adding a real CMS, overhauling the layout with a blueprint-style grid, and perfecting the GitHub Pages workflow."
pubDate: "2026-01-08"
heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop&q=60"
---

# Website v3.0: TinaCMS, Swiss Precision, and the Joy of a Complete Workflow

There's a particular kind of satisfaction that comes from finishing something you've let sit too long. For me, it was the gap between "having a static site" and "having a *real* content management workflow." My website ran beautifully on Astro and GitHub Pages. It looked clean. It loaded fast. But every time I wanted to write a new post, I'd open my editor, dig through `src/content/blog/`, write some markdown, commit, and push. It worked. But it didn't *flow*.

With v3.0, that finally changes.

## The Missing Piece: TinaCMS

Static sites are incredible for performance, but they traditionally trade away the convenience of a CMS. You either get the lightning-fast, secure, dead-simple hosting of static files—or you get a nice admin panel where you can write posts like a normal person. Not both.

[TinaCMS](https://tina.io) changes that equation. It's a Git-backed, headless CMS that gives you a visual editing experience while keeping all your content in Markdown files, right in your repo. No database. No separate backend. Just Git.

Here's what sold me:
- **Visual Editing**: I can see my changes live on the page as I type.
- **Git-Native**: Every edit is a commit. My content history is my version control history.
- **Self-Hosted Friendly**: The admin panel runs locally or via Tina Cloud, but my content never leaves my repo.

Setting it up with Astro required a bit of configuration, but the integration is elegant. TinaCMS generates a typed GraphQL client from my content schema, which means I get full TypeScript autocompletion when querying posts—a nice upgrade from hoping my frontmatter keys are spelled correctly.

```typescript
// tina/config.ts
export default defineConfig({
  branch: process.env.GITHUB_BRANCH || 'main',
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  token: process.env.TINA_CONTENT_TOKEN,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  schema: {
    collections: [
      {
        name: 'blog',
        label: 'Blog Posts',
        path: 'src/content/blog',
        format: 'md',
        fields: [
          { type: 'string', name: 'title', label: 'Title', required: true },
          { type: 'string', name: 'description', label: 'Description' },
          { type: 'datetime', name: 'pubDate', label: 'Publication Date' },
          { type: 'image', name: 'heroImage', label: 'Hero Image' },
          { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
        ],
      },
    ],
  },
});
```

The result? I can now navigate to `/admin`, log in, and write posts in a beautiful WYSIWYG editor. When I save, TinaCMS commits directly to my repo, and GitHub Actions rebuilds the site. The whole loop—from idea to published post—is seamless.

## The Visual Overhaul: Swiss Precision

While I was in there rewiring the content layer, I couldn't resist touching the design. My v2.0 layout was clean and minimal, but it felt... flat. It was "minimal" in the sense of "not much going on." I wanted something that felt *intentionally* minimal—like an engineering spec sheet or a piece of Swiss typography.

So I rebuilt the layout around a new philosophy I'm calling "Swiss Precision":

### The Blueprint Grid
Every page now uses a two-column CSS Grid. On the left: a narrow sidebar for metadata and labels. On the right: the main content. A single vertical hairline runs through the entire page, anchoring everything to a common visual axis. It sounds subtle, but it completely changes the feel—from "website" to "document."

```css
.content-container {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 2rem;
  position: relative;
}

/* The Swiss Anchor Line */
.content-container::after {
  content: "";
  position: absolute;
  left: calc(140px + 1rem);
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(0, 0, 0, 0.08);
}
```

### Micro-Type Labels
Section headers are no longer big and bold. They're tiny, capitalized, monospaced labels: `ARCHIVE`, `DATE`, `INFO`. Paired with large, impactful content headings, the contrast creates a sense of precision and hierarchy.

### Indexed Lists
Every post in the archive now has an index number—`01`, `02`, `03`. It's a small touch, but it makes the list feel curated, like a table of contents in a well-designed book.

### Tactile Grain
To remove the sterile "digital white" feel, I added an almost-invisible noise overlay to the background. At 3.5% opacity, you barely notice it consciously, but it gives the page a tactile, high-quality texture—like premium paper.

```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,..."); /* SVG noise pattern */
  opacity: 0.035;
  z-index: 9999;
}
```

## Completing the Workflow

The real win with v3.0 isn't any single feature—it's the complete loop.

1. **Write**: Open `/admin`, create a new post, write in the visual editor.
2. **Save**: TinaCMS commits to GitHub.
3. **Build**: GitHub Actions runs `astro build`.
4. **Deploy**: GitHub Pages serves the static files.

No local environment required. No manual commits. No deployment scripts. Just write and publish.

For a developer, this might seem like overkill—"Why not just edit markdown locally?" And sure, I still can. But the visual editor unlocks something important: *reducing friction*. When publishing is easy, you write more. When you can see your words on the page as you type, you edit more carefully. The workflow shapes the output.

## What's Next

v3.0 feels complete in a way my site never has before. But I've already got ideas for v4:

- **RSS and Newsletters**: Integrating with an email service to push new posts to subscribers.
- **Search**: A fast, client-side search powered by Pagefind or Fuse.js.
- **Reading Progress**: A subtle indicator showing how far you've scrolled through a post.

For now, though, I'm going to enjoy the satisfaction of a finished system. The content flows from my brain to TinaCMS to GitHub to the world, with no friction in between.

If you're running a static site and haven't looked at TinaCMS, give it a try. And if your layout feels "fine but forgettable," consider what a single vertical line and some tiny labels might do for you. Sometimes the smallest changes create the biggest impact.

---

Thanks for reading. If you want to see the code behind this site, it's all open source on [GitHub](https://github.com/adnandossaji/adnandossaji.github.io). Questions? Reach out anytime.
