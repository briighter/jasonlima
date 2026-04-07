import Link from 'next/link'
import type { Post } from '@/lib/posts'

interface PostCardProps {
  post: Post
}

/* Derive a stable accent color from the first tag */
const TAG_COLOR_MAP: Record<string, string> = {
  engineering:  'accent',
  architecture: 'violet',
  performance:  'orange',
  database:     'emerald',
  api:          'accent',
  design:       'rose',
  systems:      'violet',
  typescript:   'accent',
}

function colorForPost(post: Post): string {
  const first = (post.tags[0] ?? '').toLowerCase()
  return TAG_COLOR_MAP[first] ?? 'accent'
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

/* ──────────────────────────────────────────────────
   PostCard — editorial "Today" tab style card
   Color accent driven by post's first tag
────────────────────────────────────────────────── */
export default function PostCard({ post }: PostCardProps) {
  const color = colorForPost(post)
  const cssVars = {
    '--post-color':     `var(--color-${color})`,
    '--post-color-dim': `var(--color-${color}-dim)`,
  } as React.CSSProperties

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="editorial-card"
      style={cssVars}
      aria-label={`Read: ${post.title}`}
    >
      {/* Category strip */}
      <div className="editorial-card__top">
        {post.tags.length > 0 && (
          <span className="editorial-card__cat">{post.tags[0]}</span>
        )}
        {post.readTime && (
          <span className="editorial-card__time">{post.readTime}</span>
        )}
      </div>

      {/* Title */}
      <h3 className="editorial-card__title">{post.title}</h3>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="editorial-card__excerpt">{post.excerpt}</p>
      )}

      {/* Footer */}
      <div className="editorial-card__footer">
        <time dateTime={post.date} className="editorial-card__date">
          {formatDate(post.date)}
        </time>
        <span className="editorial-card__cta" aria-hidden="true">
          Read →
        </span>
      </div>
    </Link>
  )
}

