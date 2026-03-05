import Link from 'next/link'
import type { Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className="hover-lift"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-6)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        minHeight: '220px',
      }}
    >
      {/* Hover overlay */}
      <div
        className="project-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--color-ink)',
          opacity: 0,
          transition: 'opacity var(--transition)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'var(--space-6)',
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-base)',
            color: 'rgba(245,243,240,0.8)',
            lineHeight: 'var(--leading-base)',
            marginBottom: 'var(--space-4)',
          }}
        >
          {project.description}
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                background: 'transparent',
                border: '1px solid rgba(245,243,240,0.2)',
                color: 'var(--color-bg)',
                fontSize: 'var(--text-xs)',
                padding: '8px 16px',
              }}
            >
              GitHub
            </a>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                background: 'var(--color-accent)',
                border: 'none',
                color: '#fff',
                fontSize: 'var(--text-xs)',
                padding: '8px 16px',
              }}
            >
              Live ↗
            </a>
          )}
        </div>
      </div>

      {/* Default card content */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 700,
            letterSpacing: 'var(--tracking-tight)',
            color: 'var(--color-ink)',
          }}
        >
          {project.title}
        </h3>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-muted)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {project.year}
        </span>
      </div>

      <p
        style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--color-muted)',
          lineHeight: 'var(--leading-snug)',
          flex: 1,
        }}
      >
        {project.description}
      </p>

      {project.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
          {project.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </article>
  )
}
