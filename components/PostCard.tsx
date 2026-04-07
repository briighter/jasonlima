import Link from 'next/link'
import type { Post } from '@/lib/posts'

interface Props {
  post: Post
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year:  'numeric',
    month: 'short',
    day:   'numeric',
  })
}

export default function PostCard({ post }: Props) {
  const { slug, title, excerpt, tags, date, readTime } = post

  return (
    <Link href={`/blog/${slug}`} className="post-card">
      <div className="post-card__eyebrow">
        <span className="post-card__date">{formatDate(date)}</span>
        <span className="post-card__reading">{readTime}</span>
      </div>

      {tags.length > 0 && (
        <div className="post-card__tags">
          {tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}

      <h3 className="post-card__title">{title}</h3>

      {excerpt && (
        <p className="post-card__excerpt">{excerpt}</p>
      )}

      <span className="post-card__cta">
        Read article
        <svg className="post-card__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </Link>
  )
}

