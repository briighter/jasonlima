import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — Jason Lima',
  description:
    'Software engineer with 5+ years building products that people actually use. Background in full-stack development, system design, and the craft of clean code.',
}

const EXPERIENCE = [
  {
    role: 'Senior Software Engineer',
    company: 'Stealth Startup',
    period: '2023 – Present',
    description:
      'Building the core platform from zero to production. Architecting the backend API, data layer, and realtime event system. TypeScript, Node.js, PostgreSQL, Redis.',
  },
  {
    role: 'Software Engineer',
    company: 'Previous Company',
    period: '2021 – 2023',
    description:
      'Led frontend architecture migration from legacy stack to Next.js. Reduced page load by 60%. Mentored two junior members. Shipped 3 major product features end-to-end.',
  },
  {
    role: 'Full-Stack Developer',
    company: 'Freelance',
    period: '2019 – 2021',
    description:
      'Designed and built web applications for clients across fintech, health, and e-commerce. Grew comfortable owning the full delivery lifecycle.',
  },
]

const STACK = [
  { category: 'Languages',      items: ['TypeScript', 'JavaScript', 'Go', 'Python', 'SQL'] },
  { category: 'Frontend',       items: ['React', 'Next.js', 'CSS (real CSS)', 'Web APIs', 'Accessibility'] },
  { category: 'Backend',        items: ['Node.js', 'REST & GraphQL', 'WebSockets', 'Auth patterns', 'Queues'] },
  { category: 'Data',           items: ['PostgreSQL', 'Redis', 'SQLite', 'Prisma ORM', 'Query optimisation'] },
  { category: 'Infrastructure', items: ['Docker', 'AWS (ECS, S3, CF)', 'GitHub Actions', 'Vercel', 'Monitoring'] },
]

const VALUES = [
  {
    title: 'Clarity over cleverness',
    body:
      'The best code is the code your 3am future-self can read without coffee. I optimise for readability and explicit intent before anything else.',
  },
  {
    title: 'Shipped beats perfect',
    body:
      'I have strong opinions about quality, but I know the difference between a worthwhile standard and a self-indulgent one. Real products require real trade-offs.',
  },
  {
    title: 'Learn in public',
    body:
      'Writing about what I\'m building or figuring out makes me a sharper thinker and occasionally helps someone else. That\'s the blog.',
  },
]

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero__inner">
            <div className="about-hero__text">
              <p className="section-eyebrow">About me</p>
              <h1 className="about-hero__title">
                I build software — and care about <em>how</em> it&apos;s built.
              </h1>
              <p className="about-hero__bio">
                I&apos;m Jason Lima, a software engineer focused on full-stack product work.
                I care about clean architecture, clear communication, and shipping things that
                actually matter to people. I&apos;ve worked across the stack — from
                hand-tuned SQL to pixel-level UI — and learned that the best engineers
                understand the whole system.
              </p>
              <p className="about-hero__bio">
                When I&apos;m not writing code, I&apos;m thinking about the architecture
                decisions that led to it, reading, or writing about what I&apos;m learning
                on this blog.
              </p>
              <div className="about-hero__cta">
                <Link href="/contact" className="btn btn-primary">
                  Get in touch
                </Link>
                <Link href="/work" className="btn btn-ghost">
                  See my work
                </Link>
              </div>
            </div>

            {/* Avatar / identity block */}
            <div className="about-hero__avatar-wrap">
              <div className="about-avatar" aria-hidden="true">
                <span className="about-avatar__initials">JL</span>
              </div>
              <div className="about-status-card">
                <span className="about-status-dot" aria-hidden="true" />
                <div>
                  <p className="about-status-card__label">Currently</p>
                  <p className="about-status-card__value">Building in stealth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="about-section">
        <div className="container">
          <div className="reveal">
            <p className="section-eyebrow">Experience</p>
            <h2 className="about-section__title">Where I&apos;ve worked</h2>
          </div>

          <div className="about-timeline">
            {EXPERIENCE.map((item, i) => (
              <div key={i} className="reveal about-timeline__item" data-delay={String(i * 100)}>
                <div className="about-timeline__marker" aria-hidden="true" />
                <div className="about-timeline__content">
                  <div className="about-timeline__header">
                    <div>
                      <h3 className="about-timeline__role">{item.role}</h3>
                      <p className="about-timeline__company">{item.company}</p>
                    </div>
                    <time className="about-timeline__period">{item.period}</time>
                  </div>
                  <p className="about-timeline__desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stack ── */}
      <section className="about-section about-section--alt">
        <div className="container">
          <div className="reveal">
            <p className="section-eyebrow">Stack</p>
            <h2 className="about-section__title">Tools &amp; technologies</h2>
          </div>

          <div className="about-stack-grid">
            {STACK.map(({ category, items }, i) => (
              <div key={category} className="reveal about-stack-group" data-delay={String(i * 80)}>
                <h3 className="about-stack-group__label">{category}</h3>
                <ul className="about-stack-group__list">
                  {items.map(item => (
                    <li key={item} className="about-stack-group__item">
                      <span className="about-stack-group__dot" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="about-section">
        <div className="container">
          <div className="reveal">
            <p className="section-eyebrow">How I work</p>
            <h2 className="about-section__title">Things I believe</h2>
          </div>

          <div className="about-values-grid">
            {VALUES.map(({ title, body }, i) => (
              <div key={title} className="reveal about-value-card" data-delay={String(i * 100)}>
                <span className="about-value-card__num">0{i + 1}</span>
                <h3 className="about-value-card__title">{title}</h3>
                <p className="about-value-card__body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Colophon / CTA ── */}
      <section className="about-cta-section">
        <div className="container">
          <div className="reveal about-cta-card">
            <p className="section-eyebrow">Resume</p>
            <h2 className="about-cta-card__title">Want the formal version?</h2>
            <p className="about-cta-card__body">
              Here&apos;s the condensed, printable summary of my experience and skills.
              Or just reach out — I&apos;m happy to talk through my background directly.
            </p>
            <div className="about-cta-card__actions">
              <a
                href="/assets/docs/jason-lima-resume.pdf"
                download
                className="btn btn-primary"
                aria-label="Download resume PDF"
              >
                Download CV
                <DownloadIcon />
              </a>
              <Link href="/contact" className="btn btn-ghost">
                Let&apos;s talk
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function DownloadIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}
