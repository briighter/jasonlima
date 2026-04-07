import type { Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
}

/* ──────────────────────────────────────────────────
   AppCard — iOS App Store-style project card
   Coloured icon + name + category + description + CTA
   Color driven by project.color → CSS var --app-color
────────────────────────────────────────────────── */
export default function ProjectCard({ project }: ProjectCardProps) {
  const color = project.color || 'accent'

  const cssVars = {
    '--app-color':     `var(--color-${color})`,
    '--app-color-dim': `var(--color-${color}-dim)`,
  } as React.CSSProperties

  const primaryCta = project.url
    ? { href: project.url, label: 'Open ↗' }
    : project.github
    ? { href: project.github, label: 'View' }
    : null

  return (
    <article className="app-card" style={cssVars}>
      {/* Top accent line (visible on hover) */}
      <div className="app-card__accent" aria-hidden="true" />

      {/* Icon + name row */}
      <div className="app-card__header">
        <div className="app-card__icon" aria-hidden="true">
          <span className="app-card__icon-letter">{project.title[0]}</span>
        </div>
        <div className="app-card__meta">
          <h3 className="app-card__title">{project.title}</h3>
          <p className="app-card__category">{project.category} · {project.year}</p>
        </div>
        {primaryCta && (
          <a
            href={primaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="app-card__get"
            aria-label={`${primaryCta.label} ${project.title}`}
          >
            {primaryCta.label}
          </a>
        )}
      </div>

      {/* Description */}
      <p className="app-card__desc">{project.description}</p>

      {/* Footer: tags + github ghost link */}
      <div className="app-card__footer">
        <div className="app-card__tags">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="app-card__tag">{tag}</span>
          ))}
        </div>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="app-card__github"
            aria-label={`GitHub source for ${project.title}`}
          >
            <GitHubIcon />
          </a>
        )}
      </div>
    </article>
  )
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}

