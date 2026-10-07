import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — Jason Lima, Freelance Solutions Engineer',
  description:
    'Business + Computer Science background. I help small businesses save time and win customers with AI, automation, web apps, mobile apps, and websites. Direct, fixed-price, no agency markup.',
}

const EXPERIENCE = [
  {
    role: 'Freelance Solutions Engineer — Lima Labs',
    company: 'Helping small businesses with AI, automation & apps',
    period: '2024 – Present',
    description:
      'Diagnostic-first builds: AI chatbots, workflow automations, custom web apps, mobile apps, and high-converting websites. Fixed pricing, plain-English handoffs, owner owns everything.',
  },
  {
    role: 'Associate / Software Engineer',
    company: 'Product engineering teams',
    period: '2021 – 2024',
    description:
      'Full-stack product work — TypeScript, React/Next.js, Node, PostgreSQL. Shipped APIs, dashboards, and customer-facing features. Learned what actually holds up in production.',
  },
  {
    role: 'Business Information Systems + Computer Science',
    company: 'SNHU — dual background',
    period: 'Foundation',
    description:
      'Business first, then engineering. That combo is why I scope by ROI — time saved and customers won — not by lines of code.',
  },
]

const STACK = [
  { category: 'AI & Automation', items: ['AI chatbots (site + Messenger)', 'RAG over your docs', 'Zapier / Make / custom scripts', 'Lead follow-up flows', 'Review & scheduling flows'] },
  { category: 'Web & Mobile', items: ['Next.js / React / TypeScript', 'Node.js APIs', 'iOS + Android (cross-platform)', 'Booking & ordering flows', 'Customer portals'] },
  { category: 'Websites that sell', items: ['Local SEO setup', 'Fast mobile-first builds', 'Google Business + Maps', 'Call / booking conversion', 'Analytics that owners read'] },
  { category: 'Data & Integrations', items: ['PostgreSQL / SQLite', 'Stripe / QuickBooks / CRM sync', 'Dashboards owners use', 'CSV → system migrations', 'Backups & ownership docs'] },
]

const VALUES = [
  {
    title: 'Business outcome first',
    body: 'If it doesn’t save hours or win customers, I won’t sell it to you. I’ll tell you on the first call if software isn’t the answer.',
  },
  {
    title: 'Plain English, always',
    body: 'No ticket black holes. Weekly updates, short video walkthroughs, and docs you can actually use without calling me.',
  },
  {
    title: 'You own everything',
    body: 'Code, accounts, domains, docs — all in your name from day one. Fixed price in writing before I start.',
  },
]

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="container">
          <div className="about-hero__inner">
            <div className="about-hero__text">
              <p className="section-eyebrow">About — why owners hire me</p>
              <h1 className="about-hero__title">
                I translate business pain <em>into simple working software.</em>
              </h1>
              <p className="about-hero__bio">
                I&apos;m Jason Lima, freelance solutions engineer behind Lima Labs.
                Business degree + Computer Science degree means I don&apos;t just
                write code — I help you decide what&apos;s worth building, then
                build it fast: AI helpers, automations, web apps, mobile apps,
                and websites that bring customers.
              </p>
              <p className="about-hero__bio">
                Solo by design: you talk to the person doing the work. Email me at{' '}
                <a href="mailto:limalabsllc@gmail.com" style={{ textDecoration: 'underline' }}>
                  limalabsllc@gmail.com
                </a>{' '}
                or message{' '}
                <a
                  href="https://www.facebook.com/LimaLabsTech"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline' }}
                >
                  Lima Labs on Facebook
                </a>.
              </p>
              <div className="about-hero__cta">
                <Link href="/contact" className="btn btn-primary">
                  Get free fix assessment →
                </Link>
                <Link href="/work" className="btn btn-ghost">
                  See work
                </Link>
              </div>
            </div>

            <div className="about-hero__avatar-wrap">
              <div className="about-avatar" aria-hidden="true">
                <span className="about-avatar__initials">JL</span>
              </div>
              <div className="about-status-card">
                <span className="about-status-dot" aria-hidden="true" />
                <div>
                  <p className="about-status-card__label">Currently</p>
                  <p className="about-status-card__value">Taking new projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="reveal">
            <p className="section-eyebrow">Background</p>
            <h2 className="about-section__title">Experience that matters to you</h2>
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

      <section className="about-section about-section--alt">
        <div className="container">
          <div className="reveal">
            <p className="section-eyebrow">Toolbox</p>
            <h2 className="about-section__title">What I can build for your business</h2>
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

      <section className="about-section">
        <div className="container">
          <div className="reveal">
            <p className="section-eyebrow">How I work</p>
            <h2 className="about-section__title">What you can expect</h2>
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

      <section className="about-cta-section">
        <div className="container">
          <div className="reveal about-cta-card">
            <p className="section-eyebrow">Next step</p>
            <h2 className="about-cta-card__title">Tell me what&apos;s eating your week.</h2>
            <p className="about-cta-card__body">
              Free 20-min diagnostic. I&apos;ll map the simplest fix — yours to keep
              even if we never work together.
            </p>
            <div className="about-cta-card__actions">
              <Link href="/contact" className="btn btn-primary">
                Get my free assessment →
              </Link>
              <a
                href="https://www.facebook.com/LimaLabsTech"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Message on Facebook
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
