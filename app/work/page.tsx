import type { Metadata } from 'next'
import StarMark from '@/components/StarMark'
import { getAllProjects } from '@/lib/projects'
import WorkClient from './WorkClient'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Products, platforms, and internal systems designed and built end to end by Jason Lima — web apps, mobile apps, AI tools, and automation.',
}

export default function WorkPage() {
  const projects = getAllProjects()
  const allTags = [...new Set(projects.flatMap(p => p.tags))].sort()

  return (
    <div className="work-page">
      <header className="page-header">
        <div className="container">
          <div className="page-header__inner">
            <span className="eyebrow">
              <StarMark size={11} />
              Selected work
            </span>
            <h1 className="page-header__title">
              Products, platforms, and{' '}
              <span className="text-accent">systems.</span>
            </h1>
            <p className="page-header__lead">
              {projects.length} projects — mobile apps, AI platforms, internal tools, and
              the occasional experiment. Every one designed, built, and shipped end to end.
            </p>
            <div className="page-header__meta">
              <span className="page-header__meta-item">Web</span>
              <span className="page-header__meta-item">Mobile</span>
              <span className="page-header__meta-item">AI / SaaS</span>
              <span className="page-header__meta-item">Internal tools</span>
            </div>
          </div>
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
