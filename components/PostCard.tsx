import Link from 'next/link'
import type { Post } from '@/lib/posts'

interface PostCardProps {
  post: Post
}

/* ──────────────────────────────────────────────────
   Formats date as "MAR 2024" (small-caps treatment)
   instead of raw ISO string
────────────────────────────────────────────────── */
function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="post-card" aria-label={`Read: ${post.title}`}>
      {/* Date — MAR 2024 style */}
      <time
        className="post-card__date"
        dateTime={post.date}
        style={{ fontVariantCaps: 'small-caps' }}
      >
        {formatDate(post.date)}
      </time>

      {/* Title */}
      <h3 className="post-card__title">{post.title}</h3>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="post-card__excerpt">{post.excerpt}</p>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {post.tags.slice(0, 3).map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}

      {/* Meta footer: read time + arrow */}
      <div className="post-card__meta">
        {post.readTime && (
          <span className="post-card__read-time">{post.readTime}</span>
        )}
        <span className="post-card__arrow" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </span>
      </div>
    </Link>
  )
}
