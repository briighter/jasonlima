import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/projects'
import WorkClient from './WorkClient'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected projects — tools, systems, and experiments built with care.',
}

export default async function WorkPage() {
  const projects = await getAllProjects()
  const allTags  = [...new Set(projects.flatMap(p => p.tags))].sort()

  return (
    <div style={{ paddingBlock: 'var(--space-section)' }}>
      <div className="container">
        {/* Page header */}
        <header style={{ marginBottom: 'var(--space-16)' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              letterSpacing: 'var(--tracking-ultra)',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Selected Work
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 900,
              letterSpacing: 'var(--tracking-tight)',
              lineHeight: 'var(--leading-tight)',
              color: 'var(--color-ink)',
              maxWidth: '14ch',
            }}
          >
            Things I&apos;ve{' '}
            <span
              style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--color-muted)' }}
            >
              built.
            </span>
          </h1>
        </header>

        <hr style={{ marginBottom: 'var(--space-12)' }} />

        <WorkClient projects={projects} allTags={allTags} />
      </div>
    </div>
  )
}
