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
      {/* ── Header ── */}
      <header className="about-header section section--dark">
        <div className="container">
          <span className="eyebrow">{'// 03'} &mdash; about</span>
          <h1 className="section-title" style={{ color: 'var(--color-dk-ink)', marginTop: 'var(--sp-3)', maxWidth: '18ch' }}>
            I build software &mdash; and care about <em style={{ color: 'var(--color-accent)' }}>how</em> it&apos;s built.
          </h1>
          <p style={{ color: 'var(--color-dk-muted)', fontFamily: 'var(--font-body)', fontSize: 'var(--t-lg)', maxWidth: '560px', marginTop: 'var(--sp-5)', lineHeight: 1.65 }}>
            Jason Lima. Full-stack engineer focused on clean architecture,
            clear communication, and shipping software that actually matters.
          </p>
          <div style={{ display: 'flex', gap: 'var(--sp-3)', marginTop: 'var(--sp-8)', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-dk-primary">Get in touch</Link>
            <Link href="/work" className="btn btn-dk-ghost">See my work</Link>
          </div>
        </div>
      </header>

      {/* ── Bio ── */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-bio">
              <span className="eyebrow" style={{ marginBottom: 'var(--sp-5)' }}>Background</span>
              <p>
                I&apos;m a software engineer with a background in CS and Business Information Systems.
                I&apos;ve worked across the stack — from hand-tuned SQL to pixel-level UI — and
                learned that the best engineers understand the whole system.
              </p>
              <p>
                When I&apos;m not writing code, I&apos;m thinking about the architecture decisions
                that led to it, reading, or writing about what I&apos;m learning on this blog.
              </p>
              <div style={{ display: 'flex', gap: 'var(--sp-3)', marginTop: 'var(--sp-8)', flexWrap: 'wrap' }}>
                <a href="/assets/docs/jason-lima-resume.pdf" download className="btn btn-ghost">
                  Download CV
                </a>
              </div>
            </div>

            <div className="about-aside">
              <div className="about-stat-block">
                <span className="about-stat-block__num">5+</span>
                <span className="about-stat-block__label">Years shipping</span>
              </div>
              <div className="about-stat-block">
                <span className="about-stat-block__num">20+</span>
                <span className="about-stat-block__label">Projects built</span>
              </div>
              <div className="about-stat-block">
                <span className="about-stat-block__num">∞</span>
                <span className="about-stat-block__label">Still learning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-hd">
            <span className="eyebrow">Experience</span>
            <div className="section-hd__row">
              <h2 className="section-title reveal">Where I&apos;ve worked</h2>
            </div>
          </div>

          <div className="about-timeline">
            {EXPERIENCE.map((item, i) => (
              <div key={i} className="reveal about-timeline__item" data-delay={String(i * 100)}>
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
      <section className="section">
        <div className="container">
          <div className="section-hd">
            <span className="eyebrow">Stack</span>
            <div className="section-hd__row">
              <h2 className="section-title reveal">Tools &amp; technologies</h2>
            </div>
          </div>

          <div className="about-skills-grid">
            {STACK.map(({ category, items }, i) => (
              <div key={category} className="reveal" data-delay={String(i * 80)}>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent)', marginBottom: 'var(--sp-3)' }}>
                  {category}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
                  {items.map(item => (
                    <li key={item} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--t-sm)', color: 'var(--color-ink-mid)' }}>
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
      <section className="section section--alt">
        <div className="container">
          <div className="section-hd">
            <span className="eyebrow">How I work</span>
            <div className="section-hd__row">
              <h2 className="section-title reveal">Things I believe</h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--sp-6)', marginTop: 'var(--sp-10)' }}>
            {VALUES.map(({ title, body }, i) => (
              <div key={title} className="reveal pcard" data-delay={String(i * 100)}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: 'var(--color-accent)', letterSpacing: '0.08em' }}>
                  0{i + 1}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--t-xl)', fontWeight: 700, marginTop: 'var(--sp-3)', marginBottom: 'var(--sp-3)', color: 'var(--color-ink)' }}>
                  {title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--t-sm)', color: 'var(--color-muted)', lineHeight: 1.65 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
