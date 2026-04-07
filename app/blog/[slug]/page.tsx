import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllSlugs, getPostBySlug, getAllPosts } from '@/lib/posts'
import MDXContent from '@/components/MDXContent'
import NewsletterForm from '@/components/NewsletterForm'
import PostCard from '@/components/PostCard'
import ReadingProgress from './ReadingProgress'

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  try {
    const post = getPostBySlug(params.slug)
    return {
      title:       `${post.title} — Jason Lima`,
      description: post.excerpt,
      openGraph: {
        type:          'article',
        title:         post.title,
        description:   post.excerpt,
        publishedTime: post.date,
        tags:          post.tags,
      },
    }
  } catch {
    return { title: 'Post not found' }
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  let post
  try {
    post = getPostBySlug(params.slug)
  } catch {
    notFound()
  }

  const all     = getAllPosts()
  const related = all
    .filter(p => p.slug !== post.slug && p.tags.some(t => post.tags.includes(t)))
    .slice(0, 2)

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <>
      <ReadingProgress />

      <article className="post-page">
        {/* ── Post header ── */}
        <header className="post-header section section--dark">
          <div className="container container--narrow">
            <Link href="/blog" className="post-header__back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Writing
            </Link>

            {post.tags.length > 0 && (
              <div className="post-header__tags">
                {post.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}

            <h1 className="post-header__title">{post.title}</h1>

            <div className="post-header__meta">
              <time dateTime={post.date}>{formattedDate}</time>
              {post.readTime && (
                <>
                  <span aria-hidden="true">&middot;</span>
                  <span>{post.readTime}</span>
                </>
              )}
            </div>
          </div>
        </header>

        {/* ── MDX body ── */}
        <div className="section">
          <div className="container container--narrow">
            <MDXContent source={post.content} />
          </div>

          {/* ── Author bio ── */}
          <div className="container container--narrow" style={{ marginTop: 'var(--sp-16)', paddingTop: 'var(--sp-8)', borderTop: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', gap: 'var(--sp-6)', alignItems: 'flex-start' }}>
              <div
                aria-hidden="true"
                style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--color-bg-alt)', border: '2px solid var(--color-border)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-lg)', color: 'var(--color-accent)' }}
              >
                JL
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-base)', color: 'var(--color-ink)', marginBottom: 'var(--sp-1)' }}>
                  Jason Lima
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--t-sm)', color: 'var(--color-muted)', lineHeight: 1.65 }}>
                  Software engineer. Writing about systems, craft, and real products.{' '}
                  <Link href="/contact" style={{ color: 'var(--color-accent)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                    Say hello &rarr;
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* ── Related posts ── */}
          {related.length > 0 && (
            <div className="post-related container" style={{ marginTop: 'var(--sp-16)' }}>
              <span className="eyebrow" style={{ marginBottom: 'var(--sp-6)', display: 'block' }}>Related reading</span>
              <div className="posts-grid">
                {related.map(p => <PostCard key={p.slug} post={p} />)}
              </div>
            </div>
          )}

          {/* ── Newsletter ── */}
          <div className="container container--narrow" style={{ marginTop: 'var(--sp-16)' }}>
            <NewsletterForm />
          </div>
        </div>
      </article>
    </>
  )
}
