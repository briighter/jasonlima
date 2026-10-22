import type { Metadata } from 'next'
import Link from 'next/link'
import StarMark from '@/components/StarMark'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Jason Lima is a freelance software engineer and fractional CTO with six years of enterprise experience and a background in Computer Science and Business Information Systems.',
}

const EXPERIENCE = [
  {
    role: 'Software Engineer',
    company: 'Fidelity Investments',
    period: 'Jun 2021 — Present',
    description:
      'Full-stack engineering on large-scale financial systems serving millions of users. Designing software infrastructure, leading feature delivery end to end, and contributing across the stack at one of the largest asset managers in the world.',
  },
  {
    role: 'Associate Software Engineer',
    company: 'Fidelity Investments',
    period: 'Jan 2021 — Jun 2021',
    description:
      'Promoted from intern to full-time engineer within six months. Ramped quickly on production codebases and began contributing to core platform work.',
  },
  {
    role: 'Software Engineer Intern',
    company: 'Fidelity Investments',
    period: 'Jun 2020 — Dec 2020',
    description:
      'Six-month internship building internal tooling and gaining hands-on experience with enterprise-scale software development practices.',
  },
  {
    role: 'Lead Quality Manager',
    company: 'CVS Health',
    period: 'Jan 2020 — May 2020',
    description:
      'Led quality and process operations at a major pharmacy retail location. Saw firsthand how much operational time disappears into manual tracking.',
  },
  {
    role: 'Quality and Process Manager',
    company: 'CVS Health',
    period: 'Aug 2018 — Jan 2020',
    description:
      'Managed store quality, compliance, and operational processes. Built systems for tracking and improving team performance — the first automation work.',
  },
]

const STACK = [
  { category: 'Languages', items: ['TypeScript', 'JavaScript', 'Go', 'Python', 'SQL'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'React Native', 'Expo', 'Accessibility'] },
  { category: 'Backend', items: ['Node.js', 'REST & GraphQL', 'WebSockets', 'Auth', 'Queues'] },
  { category: 'Data & AI', items: ['PostgreSQL', 'Redis', 'Prisma', 'LLM APIs', 'Vector search'] },
  { category: 'Infrastructure', items: ['Docker', 'AWS', 'GitHub Actions', 'Vercel', 'Monitoring'] },
]

const PRINCIPLES = [
  {
    num: '01',
    title: 'ROI before architecture',
    body: 'The first question is never "what stack?" It is "what does this cost today, and what will it save?" If the math does not work, the project does not start.',
  },
  {
    num: '02',
    title: 'Small scope, shipped',
    body: 'I would rather ship the one workflow that saves ten hours a week than spend six months on a platform nobody uses. Value compounds after launch, not after planning.',
  },
  {
    num: '03',
    title: 'You own the outcome',
    body: 'Code, infrastructure, documentation, and accounts stay yours. I am a temporary accelerator, not a permanent dependency.',
  },
]

export default function AboutPage() {
  return (
    <div className="about-page">
      <header className="page-header">
        <div className="container">
          <div className="page-header__inner">
            <span className="eyebrow">
              <StarMark size={11} />
              About
            </span>
            <h1 className="page-header__title">
              Engineer, operator, and your{' '}
              <span className="text-accent">technical co-pilot.</span>
            </h1>
            <p className="page-header__lead">
              I&apos;m Jason Lima — a freelance software engineer and fractional CTO. I
              help small teams replace manual work with software that pays for itself.
            </p>
            <div className="page-header__meta">
              <span className="page-header__meta-item">{SITE.location}</span>
              <span className="page-header__meta-item">6+ years in enterprise software</span>
              <span className="page-header__meta-item">Available for new projects</span>
            </div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-bio">
              <span className="mono-label">The short version</span>
              <p>
                For six years I&apos;ve built software inside a Fortune 100 financial
                company — systems used by millions of people, under the kind of
                compliance and reliability constraints that make you careful. I&apos;ve
                also designed, built, and shipped my own products end to end, which
                teaches a different skill: deciding what not to build.
              </p>
              <p>
                Freelancing lets me bring both to smaller teams. The engineering
                discipline of an enterprise, the speed and ownership of a founder, and a
                bias toward measurable outcomes instead of billable hours.
              </p>
              <p>
                My background is Computer Science and Business Information Systems. That
                combination is the whole job: understand how the business actually makes
                money, then remove the friction between the people doing the work and the
                systems supporting them.
              </p>
              <div className="about-bio__actions">
                <Link href="/contact" className="btn btn-primary">
                  Start a project
                  <span aria-hidden="true">→</span>
                </Link>
                <Link href="/work" className="btn btn-ghost">
                  See my work
                </Link>
              </div>
            </div>

            <div className="about-aside">
              <div className="about-stat-block">
                <span className="about-stat-block__num">6+</span>
                <span className="about-stat-block__label">Years shipping software</span>
              </div>
              <div className="about-stat-block">
                <span className="about-stat-block__num">20+</span>
                <span className="about-stat-block__label">Products and tools built</span>
              </div>
              <div className="about-stat-block">
                <span className="about-stat-block__num">100%</span>
                <span className="about-stat-block__label">Fixed-scope engagements</span>
              </div>
              <div className="about-stat-block">
                <span className="about-stat-block__num">∞</span>
                <span className="about-stat-block__label">Still learning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">
              <StarMark size={11} />
              Experience
            </span>
            <div className="section-head__row">
              <h2 className="display">Where I&apos;ve worked</h2>
            </div>
          </div>

          <div className="about-timeline">
            {EXPERIENCE.map((item, i) => (
              <div key={i} className="reveal about-timeline__item" data-delay={String(i * 70)}>
                <div className="about-timeline__header">
                  <div>
                    <h3 className="about-timeline__role">{item.role}</h3>
                    <p className="about-timeline__company">{item.company}</p>
                  </div>
                  <time className="about-timeline__period">{item.period}</time>
                </div>
                <p className="about-timeline__desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">
              <StarMark size={11} />
              Capabilities
            </span>
            <div className="section-head__row">
              <h2 className="display">Tools I reach for</h2>
              <p className="section-head__text">
                Chosen for the problem, not the résumé. These are the defaults I know
                deeply — not the only things I can use.
              </p>
            </div>
          </div>

          <div className="about-skills-grid">
            {STACK.map(({ category, items }, i) => (
              <div key={category} className="reveal skill-group" data-delay={String(i * 60)}>
                <h3 className="skill-group__label">{category}</h3>
                <ul className="skill-group__list" role="list">
                  {items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">
              <StarMark size={11} />
              How I work
            </span>
            <div className="section-head__row">
              <h2 className="display">Three rules I don&apos;t break</h2>
            </div>
          </div>

          <div className="principle-grid">
            {PRINCIPLES.map(({ num, title, body }, i) => (
              <article key={num} className="principle reveal" data-delay={String(i * 80)}>
                <span className="principle__num">{num}</span>
                <h3 className="principle__title">{title}</h3>
                <p className="principle__body">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="inline-cta">
            <div>
              <h2>Have a process that eats your week?</h2>
              <p>Tell me about it. The first conversation is free, and you&apos;ll leave with a straight answer.</p>
            </div>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Get a free automation audit
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
