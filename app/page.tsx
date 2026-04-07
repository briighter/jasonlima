import Link from 'next/link'
import type { Metadata } from 'next'
import PostCard from '@/components/PostCard'
import ProjectCard from '@/components/ProjectCard'
import NewsletterForm from '@/components/NewsletterForm'
import { getFeaturedPosts } from '@/lib/posts'
import { getFeaturedProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Jason Lima — Software Engineer',
  description:
    'Software engineer, builder, and occasional writer. Work at the intersection of thoughtful engineering and clean product design.',
}

const MARQUEE_ITEMS = [
  'TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL',
  'Go', 'Docker', 'AWS', 'System Design', 'API Architecture',
  'Open Source', 'CI/CD', 'Redis', 'REST', 'GraphQL', 'Accessibility',
]

const PILLARS = [
  { num: '01', label: 'Work',    href: '/work'    },
  { num: '02', label: 'Blog',    href: '/blog'    },
  { num: '03', label: 'About',   href: '/about'   },
  { num: '04', label: 'Contact', href: '/contact' },
]

export default async function HomePage() {
  const featuredPosts    = getFeaturedPosts(3)
  const featuredProjects = getFeaturedProjects(4)

  return (
    <>
      {/* ── HERO */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero__inner container">
          <p className="hero__kicker anim-fade-up anim-delay-0">
            Software Engineer
          </p>
          <h1 id="hero-heading" className="hero__headline anim-fade-up anim-delay-100">
            Jason <em>Lima.</em>
          </h1>
          <p className="hero__sub anim-fade-up anim-delay-200">
            I build software that&apos;s precise, performant, and actually pleasant to use &mdash;
            from distributed back-ends to polished product interfaces.
          </p>
          <div className="hero__ctas anim-fade-up anim-delay-300">
            <Link href="/work" className="btn btn-dk-primary">
              View my work
            </Link>
            <Link href="/contact" className="btn btn-dk-ghost">
              Get in touch
            </Link>
          </div>
          <span className="hero__scroll" aria-hidden="true">scroll</span>
        </div>
      </section>

      {/* ── MARQUEE STRIP */}
      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee">
          <div className="marquee__track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="marquee__item">
                {item}
                <span className="marquee__separator" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── NAVIGATION PILLARS */}
      <nav className="pillars" aria-label="Site sections">
        <div className="pillars__inner container">
          {PILLARS.map(({ num, label, href }) => (
            <Link key={href} href={href} className="pillar">
              <span className="pillar__num">{num}</span>
              <span className="pillar__label">{label}</span>
              <span className="pillar__arrow">&uarr;</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* ── SELECTED WORK */}
      <section className="section" id="work" aria-labelledby="work-heading">
        <div className="container">
          <div className="section-hd">
            <span className="eyebrow">{'// 01'} &mdash; selected work</span>
            <div className="section-hd__row">
              <h2 id="work-heading" className="section-title reveal">
                Selected Work
              </h2>
              <Link href="/work" className="section-link reveal" data-delay="100">
                View all &rarr;
              </Link>
            </div>
          </div>
          <div className="home-work-grid">
            {featuredProjects.map((project, i) => (
              <div key={project.slug} className="reveal" data-delay={String(i * 80)}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WRITING */}
      {featuredPosts.length > 0 && (
        <section className="section section--alt" id="writing" aria-labelledby="writing-heading">
          <div className="container">
            <div className="section-hd">
              <span className="eyebrow">{'// 02'} &mdash; writing</span>
              <div className="section-hd__row">
                <h2 id="writing-heading" className="section-title reveal">
                  From the Blog
                </h2>
                <Link href="/blog" className="section-link reveal" data-delay="100">
                  All posts &rarr;
                </Link>
              </div>
            </div>
            <div className="posts-list">
              {featuredPosts.map((post, i) => (
                <div key={post.slug} className="reveal" data-delay={String(i * 80)}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ABOUT TEASER */}
      <section className="section" id="about-teaser" aria-labelledby="about-teaser-heading">
        <div className="container">
          <div className="about-teaser reveal">
            <div className="about-teaser__body">
              <span className="eyebrow">{'// 03'} &mdash; about</span>
              <h2 id="about-teaser-heading" className="about-teaser__headline">
                Engineer by trade,{' '}
                <em style={{ color: 'var(--color-warm)' }}>builder by instinct.</em>
              </h2>
              <p className="about-teaser__bio">
                Background in CS and Business Information Systems. I ship things that
                work &mdash; APIs, platforms, product features &mdash; and care about the craft
                behind them: clean architecture, readable code, systems that don&apos;t
                fall apart under pressure.
              </p>
              <Link href="/about" className="btn btn-ghost">
                Read more &rarr;
              </Link>
            </div>
            <div className="about-teaser__stats reveal" data-delay="150">
              <div className="about-teaser__stat">
                <span className="about-teaser__stat-num">5+</span>
                <span className="about-teaser__stat-label">Years shipping</span>
              </div>
              <div className="about-teaser__stat">
                <span className="about-teaser__stat-num">20+</span>
                <span className="about-teaser__stat-label">Projects built</span>
              </div>
              <div className="about-teaser__stat">
                <span className="about-teaser__stat-num">&infin;</span>
                <span className="about-teaser__stat-label">Still learning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER */}
      <section className="section section--alt" id="newsletter">
        <div className="container container--narrow">
          <div className="reveal">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  )
}
