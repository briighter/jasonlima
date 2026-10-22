import type { Metadata } from 'next'
import StarMark from '@/components/StarMark'
import { getAllPosts } from '@/lib/posts'
import BlogClient from './BlogClient'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Essays and notes on software engineering, system design, automation, and the craft of building things that last.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  const allTags = [...new Set(posts.flatMap(p => p.tags))].sort()

  return (
    <div className="blog-page">
      <header className="page-header">
        <div className="container">
          <div className="page-header__inner">
            <span className="eyebrow">
              <StarMark size={11} />
              Writing
            </span>
            <h1 className="page-header__title">
              Notes on systems and{' '}
              <span className="text-accent">craft.</span>
            </h1>
            <p className="page-header__lead">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} on engineering,
              architecture, and building software that survives contact with reality.
            </p>
          </div>
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
