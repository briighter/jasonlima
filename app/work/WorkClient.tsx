'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import ProjectCard from '@/components/ProjectCard'
import type { Project } from '@/lib/projects'

interface WorkClientProps {
  projects: Project[]
  allTags:  string[]
}

export default function WorkClient({ projects, allTags }: WorkClientProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(
    () => activeTag ? projects.filter(p => p.tags.includes(activeTag)) : projects,
    [projects, activeTag]
  )

  useEffect(() => {
    if (!gridRef.current) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in-view')),
      { threshold: 0.06 }
    )
    gridRef.current.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [filtered])

  return (
    <>
      <div className="work-filter" role="group" aria-label="Filter by tag">
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
        <p className="work-empty">No projects matching &ldquo;{activeTag}&rdquo;.</p>
      ) : (
        <div ref={gridRef} className="work-grid">
          {filtered.map((project, i) => (
            <div
              key={project.slug}
              className="reveal"
              data-delay={String(Math.min(i * 60, 240))}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}
