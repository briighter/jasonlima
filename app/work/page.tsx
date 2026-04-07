import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/projects'
import WorkClient from './WorkClient'

export const metadata: Metadata = {
  title: 'Work — Jason Lima',
  description: 'Apps, tools, and systems built with care.',
}

export default function WorkPage() {
  const projects = getAllProjects()
  const allTags  = [...new Set(projects.flatMap(p => p.tags))].sort()

  return (
    <div className="work-page">
      <header className="work-header section section--dark">
        <div className="container">
          <span className="eyebrow">{'// 01'} &mdash; work</span>
          <h1 className="section-title" style={{ color: 'var(--color-dk-ink)', marginTop: 'var(--sp-3)' }}>
            Selected Work
          </h1>
          <p style={{ color: 'var(--color-dk-muted)', fontFamily: 'var(--font-body)', fontSize: 'var(--t-lg)', maxWidth: '540px', marginTop: 'var(--sp-4)', lineHeight: 1.6 }}>
            {projects.length} project{projects.length !== 1 ? 's' : ''} &mdash; open source tools, web apps, and backend systems.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <WorkClient projects={projects} allTags={allTags} />
        </div>
      </section>
    </div>
  )
}
