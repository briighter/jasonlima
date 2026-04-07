import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/projects'
import WorkClient from './WorkClient'

export const metadata: Metadata = {
  title: 'Work — Jason Lima',
  description: 'Apps, tools, and systems built with care.',
}

export default async function WorkPage() {
  const projects = await getAllProjects()
  const allTags  = [...new Set(projects.flatMap(p => p.tags))].sort()

  return (
    <div className="store-page">
      <div className="container">
        {/* Store header */}
        <header className="store-header">
          <div className="store-header__text">
            <p className="section-eyebrow">Made by Jason</p>
            <h1 className="store-header__title">
              Apps &amp; Tools.
            </h1>
            <p className="store-header__sub">
              {projects.length} project{projects.length !== 1 ? 's' : ''} — open source tools, web apps, and backend systems.
            </p>
          </div>
          <div className="store-header__badges" aria-hidden="true">
            {['violet', 'emerald', 'orange', 'rose', 'accent'].map((c, i) => (
              <div
                key={c}
                className="store-header__badge"
                style={{
                  '--badge-color': `var(--color-${c})`,
                  '--badge-delay': `${i * 0.1}s`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        </header>

        <WorkClient projects={projects} allTags={allTags} />
      </div>
    </div>
  )
}
