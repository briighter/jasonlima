'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import PostCard from '@/components/PostCard'
import type { Post } from '@/lib/posts'

interface BlogClientProps {
  posts: Post[]
  allTags: string[]
}

export default function BlogClient({ posts, allTags }: BlogClientProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = useMemo(
    () => activeTag ? posts.filter(p => p.tags.includes(activeTag)) : posts,
    [posts, activeTag]
  )

  const listRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!listRef.current) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in-view')),
      { threshold: 0.08 }
    )
    listRef.current.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [filtered])

  return (
    <>
      <div className="blog-filter" role="group" aria-label="Filter posts by tag">
        <button
          className={'work-filter__btn' + (!activeTag ? ' work-filter__btn--active' : '')}
          onClick={() => setActiveTag(null)}
        >
          All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            className={'work-filter__btn' + (activeTag === tag ? ' work-filter__btn--active' : '')}
            onClick={() => setActiveTag(prev => prev === tag ? null : tag)}
            aria-pressed={activeTag === tag}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="work-empty">No posts matching &ldquo;{activeTag}&rdquo;.</p>
      ) : (
        <div ref={listRef} className="posts-list">
          {filtered.map((post, i) => (
            <div key={post.slug} className="reveal" data-delay={String(Math.min(i * 60, 300))}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}
