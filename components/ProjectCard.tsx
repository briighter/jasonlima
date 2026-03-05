import type { Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
}

/* ──────────────────────────────────────────────────
   ProjectCard — bento grid card
   Hover overlay reveals full description + links.
   CSS classes in globals.css — no inline styles.
────────────────────────────────────────────────── */
export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card hover-lift">
      {/* Hover overlay — revealed via CSS .project-card:hover .project-card__overlay */}
      <div className="project-card__overlay" aria-hidden="true">
        <p className="project-card__overlay-desc">{project.description}</p>
        <div className="project-card__overlay-links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn project-card__btn-ghost"
            >
              GitHub
            </a>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn project-card__btn-accent"
            >
              Live ↗
            </a>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="project-card__header">
        <h3 className="project-card__title">{project.title}</h3>
        <span className="project-card__year">{project.year}</span>
      </div>

      <p className="project-card__desc">{project.description}</p>

      {project.tags.length > 0 && (
        <div className="project-card__tags">
          {project.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </article>
  )
}
