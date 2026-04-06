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
      <div className="tag-filter" role="group" aria-label="Filter posts by tag">
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
        <div ref={listRef} className="post-list">
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
      className="reveal post-row"
      data-delay={String(Math.min(index * 60, 300))}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Read: ${post.title}`}
    >
      {/* Date */}
      <time
        dateTime={post.date}
        className="post-row__date"
      >
        {formattedDate}
      </time>

      {/* Title + excerpt */}
      <div>
        <h3 className={`post-row__title${hovered ? ' post-row__title--hovered' : ''}`}>
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="post-row__excerpt">{post.excerpt}</p>
        )}
      </div>

      {/* Read time + arrow */}
      <div className="post-row__meta">
        {post.readTime && (
          <span className="post-row__read-time">{post.readTime}</span>
        )}
        <span
          className={`post-row__arrow${hovered ? ' post-row__arrow--hovered' : ''}`}
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
