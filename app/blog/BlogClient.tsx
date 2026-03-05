'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import PostCard from '@/components/PostCard'
import type { Post } from '@/lib/posts'

interface BlogClientProps {
  posts: Post[]
  allTags: string[]
}

/* ──────────────────────────────────────────────────
   Blog index — client component for tag filtering
   Server-fetched posts passed in as props
────────────────────────────────────────────────── */
export default function BlogClient({ posts, allTags }: BlogClientProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = useMemo(
    () =>
      activeTag ? posts.filter(p => p.tags.includes(activeTag)) : posts,
    [posts, activeTag]
  )

  // Scroll reveal for post rows
  const listRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!listRef.current) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in-view')),
      { threshold: 0.1 }
    )
    listRef.current.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [filtered])

  return (
    <>
      {/* Tag filter bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-12)',
        }}
        role="group"
        aria-label="Filter posts by tag"
      >
        <button
          className={`tag${!activeTag ? ' active' : ''}`}
          onClick={() => setActiveTag(null)}
        >
          All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            className={`tag${activeTag === tag ? ' active' : ''}`}
            onClick={() => setActiveTag(prev => prev === tag ? null : tag)}
            aria-pressed={activeTag === tag}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Post list */}
      {filtered.length === 0 ? (
        <p style={{ color: 'var(--color-muted)', fontSize: 'var(--text-base)' }}>
          No posts matching &ldquo;{activeTag}&rdquo;.
        </p>
      ) : (
        <div
          ref={listRef}
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}
        >
          {filtered.map((post, i) => (
            <PostRow key={post.slug} post={post} index={i} />
          ))}
        </div>
      )}
    </>
  )
}

/* ──────────────────────────────────────────────────
   Post row — list layout for blog index
   Date left / title+excerpt right / read-time badge
   Hover reveals animated arrow
────────────────────────────────────────────────── */
function PostRow({ post, index }: { post: Post; index: number }) {
  const [hovered, setHovered] = useState(false)

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    year:  'numeric',
  }).toUpperCase()

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="reveal"
      data-delay={String(Math.min(index * 60, 300))}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '120px 1fr auto',
        gap: 'var(--space-8)',
        alignItems: 'center',
        padding: 'var(--space-6) 0',
        borderBottom: '1px solid var(--color-border)',
        textDecoration: 'none',
        transition: 'border-color var(--transition)',
      }}
      aria-label={`Read: ${post.title}`}
    >
      {/* Date */}
      <time
        dateTime={post.date}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          fontWeight: 500,
          letterSpacing: 'var(--tracking-ultra)',
          textTransform: 'uppercase',
          color: 'var(--color-muted-light)',
          whiteSpace: 'nowrap',
          fontVariantCaps: 'small-caps',
        }}
      >
        {formattedDate}
      </time>

      {/* Title + excerpt */}
      <div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 700,
            letterSpacing: 'var(--tracking-tight)',
            color: hovered ? 'var(--color-accent)' : 'var(--color-ink)',
            transition: 'color var(--transition)',
            marginBottom: 'var(--space-1)',
          }}
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--color-muted)',
              lineHeight: 'var(--leading-snug)',
              maxWidth: '60ch',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden',
            }}
          >
            {post.excerpt}
          </p>
        )}
      </div>

      {/* Read time + arrow */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-4)',
          flexShrink: 0,
        }}
      >
        {post.readTime && (
          <span
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-muted-light)',
              whiteSpace: 'nowrap',
            }}
          >
            {post.readTime}
          </span>
        )}
        <span
          style={{
            color: hovered ? 'var(--color-accent)' : 'var(--color-muted)',
            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
            transition: 'transform var(--transition), color var(--transition)',
            display: 'flex',
          }}
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </span>
      </div>
    </Link>
  )
}
