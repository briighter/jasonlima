'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import ProjectCard from '@/components/ProjectCard'
import type { Project } from '@/lib/projects'

interface WorkClientProps {
  projects: Project[]
  allTags:  string[]
}

/* ──────────────────────────────────────────────────
   Work page — bento grid with tag filter
   Wide projects span 2 columns; normal span 1
────────────────────────────────────────────────── */
export default function WorkClient({ projects, allTags }: WorkClientProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(
    () => activeTag ? projects.filter(p => p.tags.includes(activeTag)) : projects,
    [projects, activeTag]
  )

  // Scroll reveal for bento cards
  useEffect(() => {
    if (!gridRef.current) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in-view')),
      { threshold: 0.08 }
    )
    gridRef.current.querySelectorAll('.bento-appear').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [filtered])

  return (
    <>
      {/* Tag filter */}
      <div
        style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-12)' }}
        role="group"
        aria-label="Filter projects by tag"
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

      {/* Bento grid */}
      {filtered.length === 0 ? (
        <p style={{ color: 'var(--color-muted)' }}>No projects matching &ldquo;{activeTag}&rdquo;.</p>
      ) : (
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: 'var(--space-gap)',
          }}
        >
          {filtered.map((project) => (
            <div
              key={project.slug}
              className="bento-appear"
              style={{
                gridColumn: project.span === 'wide' ? 'span 2' : 'span 1',
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}
