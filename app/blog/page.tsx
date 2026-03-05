import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import BlogClient from './BlogClient'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Essays, notes, and thinking-out-loud on software engineering, system design, and the craft of building things.',
}

/* ──────────────────────────────────────────────────
   BLOG INDEX — Server Component
   Fetches posts at build time, passes to client for filtering
────────────────────────────────────────────────── */
export default async function BlogPage() {
  const posts   = await getAllPosts()
  const allTags = [...new Set(posts.flatMap(p => p.tags))].sort()

  return (
    <div style={{ paddingBlock: 'var(--space-section)' }}>
      <div className="container">
        {/* Page header */}
        <header style={{ marginBottom: 'var(--space-16)' }}>
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              letterSpacing: 'var(--tracking-ultra)',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Essays &amp; Notes
          </p>

          {/* Title — distinctive treatment */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 900,
              letterSpacing: 'var(--tracking-tight)',
              lineHeight: 'var(--leading-tight)',
              color: 'var(--color-ink)',
              marginBottom: 'var(--space-6)',
              maxWidth: '18ch',
            }}
          >
            Writing
            <span
              style={{
                display: 'block',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--color-muted)',
                fontSize: '0.65em',
              }}
            >
              things I&apos;ve figured out{' '}
              <em>and things I haven&apos;t yet.</em>
            </span>
          </h1>

          <p
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--color-muted)',
              maxWidth: '52ch',
              lineHeight: 'var(--leading-base)',
            }}
          >
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} on engineering, design,
            and building software that lasts.
          </p>
        </header>

        {/* Divider */}
        <hr />

        {/* Post list with client-side tag filter */}
        <div style={{ marginTop: 'var(--space-12)' }}>
          <BlogClient posts={posts} allTags={allTags} />
        </div>
      </div>
    </div>
  )
}
