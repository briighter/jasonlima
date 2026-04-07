import Link from 'next/link'
import type { Metadata } from 'next'
import PostCard from '@/components/PostCard'
import ProjectCard from '@/components/ProjectCard'
import NewsletterForm from '@/components/NewsletterForm'
import { getFeaturedPosts } from '@/lib/posts'
import { getFeaturedProjects } from '@/lib/projects'
import type { Project } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Jason Lima — Software Engineer',
  description:
    'Software engineer, builder, and occasional writer. Work at the intersection of thoughtful engineering and clean product design.',
}

export default async function HomePage() {
  const featuredPosts    = await getFeaturedPosts(3)
  const featuredProjects = await getFeaturedProjects(5)
  const [heroProject, ...restProjects] = featuredProjects

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="hero hero-mesh grain-overlay" aria-labelledby="hero-heading">
        <div className="hero__inner">
          <p className="hero__eyebrow anim-fade-up anim-delay-0">
            Software Engineer
          </p>
          <h1 id="hero-heading" className="hero__headline anim-fade-up anim-delay-100">
            Jason <em>Lima.</em>
          </h1>
          <p className="hero__description anim-fade-up anim-delay-200">
            I build software that&apos;s precise, performant, and actually pleasant to use —
            from distributed backends to polished product UIs.
          </p>
          <div className="hero__ctas anim-fade-up anim-delay-300">
            <Link href="/work" className="btn btn-primary">
              Browse My Apps
              <ArrowRightIcon />
            </Link>
            <Link href="/blog" className="btn btn-outline">
              Read the Blog
            </Link>
          </div>
          <span className="hero__monogram" aria-hidden="true">JL</span>
        </div>
      </section>

      {/* ── MARQUEE STRIP ─────────────────────────────────────────── */}
      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee">
          <div className="marquee__track">
            {MARQUEE_ITEMS.concat(MARQUEE_ITEMS).map((item, i) => (
              <span key={i} className="marquee__item">
                {item}
                <span className="marquee__separator" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURED APP (App of the Day) ─────────────────────────── */}
      {heroProject && (
        <section className="section" aria-labelledby="featured-app-heading">
          <div className="container">
            <p className="section-eyebrow">Featured Project</p>
            <FeaturedAppBanner project={heroProject} />
          </div>
        </section>
      )}

      {/* ── APP GRID ──────────────────────────────────────────────── */}
      {restProjects.length > 0 && (
        <section className="section section--surface" aria-labelledby="apps-heading">
          <div className="container">
            <div className="store-section-header">
              <div>
                <p className="section-eyebrow">My Projects</p>
                <h2 id="apps-heading" className="store-section-title reveal">
                  All apps &amp; tools
                </h2>
              </div>
              <Link href="/work" className="btn btn-ghost reveal" data-delay="100">
                See all →
              </Link>
            </div>
            <div className="app-grid">
              {restProjects.map((project, i) => (
                <div key={project.slug} className="reveal" data-delay={String(i * 80)}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ABOUT (compact) ───────────────────────────────────────── */}
      <section className="section" id="about" aria-labelledby="about-heading">
        <div className="container">
          <div className="about-strip reveal">
            <div className="about-strip__text">
              <p className="section-eyebrow">About</p>
              <h2 id="about-heading" className="about-strip__headline">
                Engineer by trade,{' '}<em>builder by instinct.</em>
              </h2>
              <p className="about-strip__bio">
                I&apos;m a software engineer with a background in CS and Business
                Information Systems. I build things that work — APIs, platforms,
                product features — and care about the craft behind them: clean
                architecture, readable code, and systems that don&apos;t fall apart at 3am.
              </p>
              <div className="about-strip__actions">
                <Link href="/about" className="btn btn-outline">Read more →</Link>
              </div>
            </div>
            <div className="about-strip__stats reveal" data-delay="150">
              {STATS.map(({ num, label }) => (
                <div key={label} className="about-strip__stat">
                  <span className="about-strip__stat-num">{num}</span>
                  <span className="about-strip__stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WRITING (editorial cards) ─────────────────────────────── */}
      {featuredPosts.length > 0 && (
        <section className="section section--surface" id="writing" aria-labelledby="posts-heading">
          <div className="container">
            <div className="store-section-header">
              <div>
                <p className="section-eyebrow">Writing</p>
                <h2 id="posts-heading" className="store-section-title reveal">
                  Latest from the blog
                </h2>
              </div>
              <Link href="/blog" className="btn btn-ghost reveal" data-delay="100">
                All posts →
              </Link>
            </div>
            <div className="editorial-grid">
              {featuredPosts.map((post, i) => (
                <div key={post.slug} className="reveal" data-delay={String(i * 80)}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── NEWSLETTER ────────────────────────────────────────────── */}
      <section className="section" id="newsletter">
        <div className="container">
          <div className="reveal">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  )
}

/* ──────────────────────────────────────────────────
   FeaturedAppBanner — "App of the Day" editorial card
────────────────────────────────────────────────── */
function FeaturedAppBanner({ project }: { project: Project }) {
  const color = project.color || 'accent'
  const cssVars = {
    '--app-color':      `var(--color-${color})`,
    '--app-color-dim':  `var(--color-${color}-dim)`,
    '--app-color-glow': `var(--color-${color}-glow)`,
  } as React.CSSProperties

  return (
    <div className="featured-banner reveal" style={cssVars} id="featured-app-heading">
      <div className="featured-banner__body">
        <div className="featured-banner__icon-row">
          <div className="featured-banner__icon" aria-hidden="true">
            <span>{project.title[0]}</span>
          </div>
          <div>
            <h2 className="featured-banner__title">{project.title}</h2>
            <p className="featured-banner__sub">{project.category} · {project.year}</p>
          </div>
        </div>
        <p className="featured-banner__desc">{project.description}</p>
        <div className="featured-banner__tags">
          {project.tags.map(tag => (
            <span key={tag} className="featured-banner__tag">{tag}</span>
          ))}
        </div>
        <div className="featured-banner__actions">
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Open App ↗
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              GitHub
            </a>
          )}
        </div>
      </div>
      <div className="featured-banner__deco" aria-hidden="true">
        <div className="featured-banner__deco-icon">
          {project.title[0]}
        </div>
      </div>
    </div>
  )
}

/* ── Static data ──────────────────────────────────────────────── */
const MARQUEE_ITEMS = [
  'TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL',
  'Go', 'Docker', 'AWS', 'System Design', 'API Architecture',
  'Accessibility', 'Performance', 'Open Source', 'CI/CD',
  'Redis', 'Figma', 'REST', 'GraphQL',
]

const STATS: { num: string; label: string }[] = [
  { num: '5+',  label: 'Years shipping' },
  { num: '20+', label: 'Projects built'  },
  { num: '∞',   label: 'Still learning'  },
]

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

