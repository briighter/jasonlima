# briighter.github.io

Personal branding website — Next.js 14 static export, MDX content, GitHub Pages.

**Stack:** Next.js 14 · TypeScript · MDX (next-mdx-remote) · gray-matter · shiki · GitHub Actions  
**Aesthetic:** Refined Editorial — Fraunces + DM Sans, warm neutrals, generous whitespace

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To preview the static export exactly as GitHub Pages serves it:

```bash
npm run build   # writes to ./out
npx serve out   # install serve once: npm i -g serve
```

---

## Adding a Blog Post

1. Create a new file in `content/posts/`:

```
content/posts/my-new-post.mdx
```

2. Add frontmatter at the top:

```yaml
---
title: "Your Post Title"
date: "2026-03-15"
excerpt: "One or two sentences summarizing the post."
tags: ["engineering", "design"]
readTime: "5 min read"
featured: true        # true = shows on homepage featured strip
published: true       # false = draft, excluded from all lists
---
```

3. Write MDX below the frontmatter. Custom components available in every post:

```mdx
<Callout type="info" title="Heads up">
  Callout types: info · tip · warning · danger
</Callout>

<Callout type="warning" title="Watch out">
  Something to be careful about.
</Callout>
```

4. Commit and push to `main`. GitHub Actions builds and deploys automatically.

> **Slug** is derived from the filename: `my-new-post.mdx` → `/blog/my-new-post`  
> **Reading time** is calculated automatically from content length.  
> **No registration needed** — the loader discovers all `.mdx` files at build time.

---

## Adding a Project

1. Create a file in `content/projects/`:

```yaml
---
title: "Project Name"
year: 2026
description: "One-line summary shown on the card and in the overlay."
tags: ["TypeScript", "React", "PostgreSQL"]
url: "https://yourproject.dev"
github: "https://github.com/you/project"
featured: true
span: "normal"   # "wide" spans 2 columns in the bento grid
---
```

2. Optionally add a longer description body below the frontmatter.

3. Commit and push.

---

## Customization Guide

### Accent color

Change a single variable in `styles/globals.css` to re-brand the entire site:

```css
:root {
  --color-accent: #D4622A;  /* ← swap this */
}
[data-theme="dark"] {
  --color-accent: #E8784A;  /* slightly lighter for dark bg */
}
```

### Fonts

Fonts load at zero layout shift via `next/font` in `app/layout.tsx`:

```tsx
const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz', 'SOFT', 'WONK'],   // variable font axes
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})
```

To swap fonts, replace `Fraunces` / `DM_Sans` with any Google Font exported from `next/font/google`, update the `--font-display` / `--font-body` CSS variables in `globals.css`.

### Typography scale

All sizes are fluid clamps in `:root` — adjust the min/max values:

```css
--text-hero: clamp(3.5rem, 8vw, 7rem);   /* largest — hero headline */
--text-3xl:  clamp(2.5rem, 5vw, 4rem);
--text-2xl:  clamp(1.75rem, 3.5vw, 2.5rem);
/* … */
```

### Spacing & layout

```css
--space-section: clamp(80px, 12vw, 160px);  /* section vertical padding */
--space-gap:     clamp(24px, 4vw, 48px);    /* grid gap */
--max-w-wide:    1200px;                    /* page max-width */
--max-w-content: 72ch;                      /* prose max-width */
```

---

## GitHub Pages Setup

### username.github.io repo (this repo)

1. Go to **Settings → Pages** → Source: **GitHub Actions**
2. The workflow at `.github/workflows/deploy.yml` handles the rest on every push to `main`
3. `NEXT_PUBLIC_BASE_PATH` is left empty — the site lives at the root

### Project repo (e.g. `username.github.io/my-site`)

Update the workflow env:

```yaml
env:
  NEXT_PUBLIC_BASE_PATH: /my-site
```

And set the same in `next.config.js` for local testing:

```js
basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
```

### Required GitHub Settings

| Setting | Value |
|---|---|
| Pages → Source | GitHub Actions |
| Actions → Workflow permissions | Read and write |

---

## Newsletter Setup

### Option A — Formspree (zero backend, works with static export)

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a form, copy the form ID
3. Replace `YOUR_FORMSPREE_ID` in two places:
   - `components/NewsletterForm.tsx`
   - `components/ContactForm.tsx`

### Option B — Resend (generous free tier, requires API route)

Resend cannot be used directly with `output: 'export'` since it needs a server-side API route. Options:
- Deploy to Vercel instead of GitHub Pages (remove `output: 'export'`)
- Use a Cloudflare Worker as a proxy that calls the Resend API

### Option C — Buttondown (free up to 100 subscribers)

Replace the fetch in `components/NewsletterForm.tsx`:

```ts
const res = await fetch('https://api.buttondown.email/v1/subscribers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${process.env.NEXT_PUBLIC_BUTTONDOWN_KEY}`,
  },
  body: JSON.stringify({ email_address: email }),
})
```

---

## Personal Tokens — Replace These

| Placeholder | Location | Replace With |
|---|---|---|
| `jason@example.com` | ContactForm, Footer | your@email.com |
| `github.com/briighter` | ContactForm, Footer | your GitHub URL |
| `linkedin.com/in/jasonlima` | ContactForm, Footer | your LinkedIn URL |
| `twitter.com/briighter` | Footer | your Twitter/X handle |
| `YOUR_FORMSPREE_ID` | NewsletterForm, ContactForm | your Formspree form ID |
| `Jason Lima` | layout.tsx metadata, blog post author | your name |
| `briighter.github.io` | metadataBase in layout.tsx | your domain |

---

## Project Structure

```
app/
  layout.tsx        Root layout — fonts, dark mode script, Nav, Footer
  page.tsx          Home — hero, marquee, about, featured posts, newsletter
  blog/
    page.tsx        Blog index — chronological list with tag filter
    BlogClient.tsx  Client component for tag filtering + post rows
    [slug]/
      page.tsx      Dynamic post page — MDX renderer, related posts, newsletter
      ReadingProgress.tsx  Thin accent progress bar at top of viewport
  work/
    page.tsx        Work index — bento grid with tag filter
    WorkClient.tsx  Client component for tag filtering + bento grid
  contact/
    page.tsx        Server wrapper — exports metadata
components/
  Nav.tsx           Sticky nav, dark mode toggle, mobile hamburger
  Footer.tsx        Social links with slide-up icon animation
  PostCard.tsx      Card used on homepage featured posts
  ProjectCard.tsx   Bento card with hover overlay
  MDXContent.tsx    MDX renderer — Callout, CodeBlock (shiki), Image
  NewsletterForm.tsx  Email subscribe form
  ContactForm.tsx   Contact form (client) — floating labels, Formspree
  ScrollReveal.tsx  IntersectionObserver — adds .in-view to .reveal elements
content/
  posts/            One .mdx file per post
  projects/         One .mdx file per project
lib/
  posts.ts          getAllPosts · getPostBySlug · getFeaturedPosts · getAllSlugs
  projects.ts       getAllProjects · getFeaturedProjects
styles/
  globals.css       CSS design token system + all component classes
  animations.css    Keyframes, marquee, grain overlay, hero mesh, scroll reveal
.github/workflows/
  deploy.yml        Build + deploy to GitHub Pages on push to main
```

---

## Dark Mode

Dark mode is driven by a synchronous `<script>` injected before React hydrates (in `app/layout.tsx`). It reads `localStorage` and sets `data-theme` on `<html>`, preventing any flash of the wrong theme.

Toggle state is kept in sync by `Nav.tsx` which reads `localStorage` on mount and writes back on toggle.

CSS responds via:

```css
[data-theme="dark"] {
  --color-bg: #111110;
  --color-ink: #F5F3F0;
  /* … */
}
```
