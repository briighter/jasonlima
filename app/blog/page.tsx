import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import BlogClient from './BlogClient'

export const metadata: Metadata = {
  title: 'Writing — Jason Lima',
  description:
    'Essays, notes, and thinking-out-loud on software engineering, system design, and the craft of building things.',
}

export default function BlogPage() {
  const posts   = getAllPosts()
  const allTags = [...new Set(posts.flatMap(p => p.tags))].sort()

  return (
    <div className="blog-page">
      <header className="blog-header section section--dark">
        <div className="container">
          <span className="eyebrow">{'// 02'} &mdash; writing</span>
          <h1 className="section-title" style={{ color: 'var(--color-dk-ink)', marginTop: 'var(--sp-3)' }}>
            Writing
          </h1>
          <p style={{ color: 'var(--color-dk-muted)', fontFamily: 'var(--font-body)', fontSize: 'var(--t-lg)', maxWidth: '540px', marginTop: 'var(--sp-4)', lineHeight: 1.6 }}>
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} on engineering, design,
            and building software that lasts.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <BlogClient posts={posts} allTags={allTags} />
        </div>
      </section>
    </div>
  )
}
