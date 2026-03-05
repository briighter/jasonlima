import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllSlugs, getPostBySlug, getAllPosts } from '@/lib/posts'
import MDXContent from '@/components/MDXContent'
import NewsletterForm from '@/components/NewsletterForm'
import PostCard from '@/components/PostCard'
import ReadingProgress from './ReadingProgress'

/* ──────────────────────────────────────────────────
   STATIC PARAMS — generate one page per MDX slug
────────────────────────────────────────────────── */
export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map(slug => ({ slug }))
}

/* ──────────────────────────────────────────────────
   METADATA — per-post OG/title/description
────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug)
    return {
      title:       post.title,
      description: post.excerpt,
      openGraph: {
        type:        'article',
        title:       post.title,
        description: post.excerpt,
        publishedTime: post.date,
        tags:        post.tags,
      },
    }
  } catch {
    return { title: 'Post not found' }
  }
}

/* ──────────────────────────────────────────────────
   POST PAGE
────────────────────────────────────────────────── */
export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  let post
  try {
    post = await getPostBySlug(params.slug)
  } catch {
    notFound()
  }

  // Related posts: same tag, excluding current
  const all     = await getAllPosts()
  const related = all
    .filter(p => p.slug !== post.slug && p.tags.some(t => post.tags.includes(t)))
    .slice(0, 2)

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <>
      {/* Reading progress bar */}
      <ReadingProgress />

      <article style={{ paddingBlock: 'var(--space-section)' }}>
        {/* ── Post header ── */}
        <header style={{ marginBottom: 'var(--space-12)' }}>
          <div className="container--narrow">
            {/* Back link */}
            <Link
              href="/blog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 500,
                letterSpacing: 'var(--tracking-wide)',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
                textDecoration: 'none',
                marginBottom: 'var(--space-8)',
                transition: 'color var(--transition)',
              }}
              aria-label="Back to all posts"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Writing
            </Link>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: 'var(--space-4)' }}>
                {post.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 900,
                letterSpacing: 'var(--tracking-tight)',
                lineHeight: 'var(--leading-tight)',
                color: 'var(--color-ink)',
                marginBottom: 'var(--space-6)',
              }}
            >
              {post.title}
            </h1>

            {/* Meta: date + read time */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
                flexWrap: 'wrap',
              }}
            >
              <time
                dateTime={post.date}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-muted)',
                }}
              >
                {formattedDate}
              </time>
              {post.readTime && (
                <>
                  <span style={{ color: 'var(--color-border-med)' }} aria-hidden="true">·</span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted)' }}>
                    {post.readTime}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Full-width divider */}
          <div className="container" style={{ marginTop: 'var(--space-8)' }}>
            <hr />
          </div>
        </header>

        {/* ── MDX body ── */}
        <div className="container--narrow">
          <MDXContent source={post.content} />
        </div>

        {/* ── Author bio ── */}
        <div className="container--narrow" style={{ marginTop: 'var(--space-16)' }}>
          <hr />
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-6)',
              alignItems: 'flex-start',
              paddingTop: 'var(--space-8)',
            }}
          >
            {/* Avatar placeholder */}
            <div
              aria-hidden="true"
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'var(--color-surface)',
                border: '2px solid var(--color-border)',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'var(--text-lg)',
                color: 'var(--color-accent)',
              }}
            >
              JL
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-ink)',
                  marginBottom: 'var(--space-1)',
                }}
              >
                Jason Lima
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted)', lineHeight: 'var(--leading-base)' }}>
                Software engineer. I write about building systems, the craft of code,
                and lessons learned from shipping real products.{' '}
                <Link href="/contact" style={{ color: 'var(--color-accent)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  Say hello →
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* ── Related posts ── */}
        {related.length > 0 && (
          <div className="container" style={{ marginTop: 'var(--space-16)' }}>
            <hr />
            <div style={{ paddingTop: 'var(--space-12)' }}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 500,
                  letterSpacing: 'var(--tracking-ultra)',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                Related reading
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                  gap: 'var(--space-gap)',
                }}
              >
                {related.map(p => <PostCard key={p.slug} post={p} />)}
              </div>
            </div>
          </div>
        )}

        {/* ── Newsletter CTA ── */}
        <div className="container" style={{ marginTop: 'var(--space-16)' }}>
          <NewsletterForm />
        </div>
      </article>
    </>
  )
}
