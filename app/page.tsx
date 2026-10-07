import Link from 'next/link'
import type { Metadata } from 'next'
import PostCard from '@/components/PostCard'
import ProjectCard from '@/components/ProjectCard'
import NewsletterForm from '@/components/NewsletterForm'
import { getFeaturedPosts } from '@/lib/posts'
import { getFeaturedProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Freelance Solutions Engineer — AI, Automation, Web & Mobile Apps for Small Business',
  description:
    'I help small businesses stop losing time and customers. AI chatbots that answer instantly, automations that kill busywork, web & mobile apps, and websites that rank and convert. Free 20-min fix assessment.',
}

/* ──────────────────────────────────────────────────
   HOME — inbound freelance landing
   Hero → Pains → Free value → Services → Process →
   Work → About → FAQ → Guides → Lead magnet → CTA
────────────────────────────────────────────────── */
export default async function HomePage() {
  const featuredPosts = await getFeaturedPosts(3)
  const featuredProjects = await getFeaturedProjects(4)

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero__inner">
          <p className="hero__eyebrow anim-fade-up anim-delay-0">
            ● Available for new projects — replies in 1 business day
          </p>

          <h1 id="hero-heading" className="hero__headline anim-fade-up anim-delay-100">
            I fix expensive business problems <em>with simple tech + AI.</em>
          </h1>

          <p className="hero__description anim-fade-up anim-delay-200">
            I&apos;m Jason Lima, freelance solutions engineer. I help small
            businesses stop drowning in manual work and missed leads — with
            AI chatbots, automations, custom web &amp; mobile apps, and
            websites that actually bring customers.
          </p>

          <div className="hero__ctas anim-fade-up anim-delay-300">
            <Link href="/contact" className="btn btn-primary">
              Get My Free Fix Assessment →
            </Link>
            <a href="#services" className="btn btn-outline">
              See what I can fix
            </a>
          </div>

          <div className="hero__trust anim-fade-up anim-delay-300">
            <span>✓ No jargon</span>
            <span>✓ Fixed pricing up front</span>
            <span>✓ You own everything I build</span>
          </div>

          <div className="hero__contact-row anim-fade-up anim-delay-300">
            <span>Prefer to just reach out?</span>
            <a href="mailto:limalabsllc@gmail.com" className="link-animate">limalabsllc@gmail.com</a>
            <span aria-hidden="true">·</span>
            <a href="https://www.facebook.com/LimaLabsTech" target="_blank" rel="noopener noreferrer" className="link-animate">Facebook: Lima Labs</a>
          </div>
        </div>
      </section>

      {/* ── PAINS — SEO + resonance ── */}
      <section className="section section--surface" aria-labelledby="pains-heading">
        <div className="container">
          <p className="section-eyebrow">Does this sound familiar?</p>
          <h2 id="pains-heading" className="posts-section-title reveal" style={{ marginBottom: 'var(--space-4)' }}>
            You didn&apos;t start a business to do busywork.
          </h2>
          <p className="section-sub reveal">
            If any of these cost you time or sales every week, that&apos;s exactly what I fix.
          </p>
          <div className="pains-grid">
            {PAINS.map((pain, i) => (
              <div key={pain.title} className="reveal pain-card" data-delay={String(i * 80)}>
                <span className="pain-card__icon" aria-hidden="true">{pain.icon}</span>
                <h3 className="pain-card__title">{pain.title}</h3>
                <p className="pain-card__body">{pain.body}</p>
                <p className="pain-card__fix">→ Fix: {pain.fix}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FREE VALUE — jab jab jab ── */}
      <section className="section" aria-labelledby="free-heading">
        <div className="container">
          <p className="section-eyebrow">Value up front — free</p>
          <h2 id="free-heading" className="posts-section-title reveal">
            Get something useful before you pay me anything.
          </h2>
          <p className="section-sub reveal">
            No discovery-call trap. Real help first. If it earns your trust, we talk about a project.
          </p>
          <div className="value-grid">
            {FREEBIES.map((f, i) => (
              <div key={f.title} className="reveal value-card" data-delay={String(i * 80)}>
                <p className="value-card__tag">{f.tag}</p>
                <h3 className="value-card__title">{f.title}</h3>
                <p className="value-card__body">{f.body}</p>
                <Link href={f.href} className="btn btn-outline value-card__cta">
                  {f.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section section--surface" id="services" aria-labelledby="services-heading">
        <div className="container">
          <p className="section-eyebrow">What I build for you</p>
          <h2 id="services-heading" className="posts-section-title reveal">
            Practical solutions, priced to pay for themselves.
          </h2>
          <p className="section-sub reveal">
            Every project starts with one question: will this save you time or win you customers?
            If the answer isn&apos;t yes, I won&apos;t build it.
          </p>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <article key={s.title} className="reveal service-card" data-delay={String(i * 60)}>
                <span className="service-card__icon" aria-hidden="true">{s.icon}</span>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__body">{s.body}</p>
                <p className="service-card__example"><strong>Example:</strong> {s.example}</p>
                <Link href="/contact" className="service-card__link link-animate">
                  Ask if this fits you →
                </Link>
              </article>
            ))}
          </div>
          <div className="reveal" style={{ marginTop: 'var(--space-8)', textAlign: 'center' }}>
            <Link href="/contact" className="btn btn-primary">
              Not sure which one you need? Get a free diagnosis →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="section" id="process" aria-labelledby="process-heading">
        <div className="container">
          <p className="section-eyebrow">How it works</p>
          <h2 id="process-heading" className="posts-section-title reveal">
            Simple, fixed, no surprises.
          </h2>
          <div className="process-grid">
            {PROCESS.map((p, i) => (
              <div key={p.title} className="reveal process-card" data-delay={String(i * 100)}>
                <span className="process-card__num" aria-hidden="true">0{i + 1}</span>
                <h3 className="process-card__title">{p.title}</h3>
                <p className="process-card__body">{p.body}</p>
                <p className="process-card__time">{p.time}</p>
              </div>
            ))}
          </div>
          <div className="guarantee-bar reveal">
            <strong>My guarantee:</strong> fixed price in writing before I start.
            You own all code, logins, and docs. If I can&apos;t help, I&apos;ll say so on the first call.
          </div>
        </div>
      </section>

      {/* ── WORK ── */}
      {featuredProjects.length > 0 && (
        <section className="section section--surface" id="work" aria-labelledby="work-heading">
          <div className="container">
            <div className="posts-section-header">
              <div>
                <p className="section-eyebrow">Proof</p>
                <h2 id="work-heading" className="posts-section-title reveal">
                  Selected work
                </h2>
              </div>
              <Link href="/work" className="btn btn-ghost reveal" data-delay="100">
                All projects →
              </Link>
            </div>
            <div className="bento-grid">
              {featuredProjects.map((project, i) => (
                <div
                  key={project.slug}
                  className={`bento-appear${project.span === 'wide' ? ' bento-wide' : ''}`}
                  data-delay={String(i * 80)}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ABOUT TEASER ── */}
      <section className="section" aria-labelledby="about-heading">
        <div className="container">
          <div className="about-grid">
            <div className="reveal">
              <p className="section-eyebrow">Why me</p>
              <h2 id="about-heading" className="about__headline">
                Business degree + engineering degree. <em>That combo matters.</em>
              </h2>
              <div className="about__bio">
                <p>
                  Most developers speak code. Most business owners speak revenue.
                  I speak both. I started in Business Information Systems, then
                  went deep on software engineering — so I don&apos;t just build
                  what you ask for, I help you figure out what&apos;s actually
                  worth building.
                </p>
                <p>
                  I work solo, which means you talk to the person doing the work.
                  No agency markup, no hand-offs, no disappearing contractors.
                </p>
              </div>
              <div className="about__actions">
                <Link href="/about" className="btn btn-outline">
                  More about me
                </Link>
                <a href="mailto:limalabsllc@gmail.com" className="btn btn-ghost">
                  Say hello →
                </a>
              </div>
            </div>

            <div className="about__stats-wrap reveal" data-delay="200">
              <div className="about__stats-card">
                <div className="about__stats-inner">
                  {STATS.map(({ num, label }) => (
                    <div key={label} className="about__stat">
                      <span className="about__stat-num">{num}</span>
                      <span className="about__stat-label">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ — SEO ── */}
      <section className="section section--surface" aria-labelledby="faq-heading">
        <div className="container container--narrow-x">
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>Questions owners ask me</p>
          <h2 id="faq-heading" className="posts-section-title reveal" style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            Straight answers.
          </h2>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <details key={f.q} className="reveal faq-item" data-delay={String(i * 60)}>
                <summary className="faq-item__q">{f.q}</summary>
                <p className="faq-item__a">{f.a}</p>
              </details>
            ))}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: FAQS.map(f => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              }),
            }}
          />
        </div>
      </section>

      {/* ── GUIDES / BLOG ── */}
      {featuredPosts.length > 0 && (
        <section className="section" id="guides" aria-labelledby="posts-heading">
          <div className="container">
            <div className="posts-section-header">
              <div>
                <p className="section-eyebrow">Free guides</p>
                <h2 id="posts-heading" className="posts-section-title reveal">
                  Learn something useful, free.
                </h2>
              </div>
              <Link href="/blog" className="btn btn-ghost reveal" data-delay="100">
                All guides →
              </Link>
            </div>

            <div className="posts-grid">
              {featuredPosts.map((post, i) => (
                <div key={post.slug} className="reveal" data-delay={String(i * 100)}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── LEAD MAGNET ── */}
      <section className="section section--surface" id="playbook" aria-labelledby="newsletter-heading">
        <div className="container">
          <div className="reveal">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="section" aria-labelledby="cta-heading">
        <div className="container">
          <div className="reveal final-cta">
            <p className="section-eyebrow" style={{ textAlign: 'center' }}>Start here</p>
            <h2 id="cta-heading" className="final-cta__title">
              What&apos;s the one task you wish would just <em>handle itself?</em>
            </h2>
            <p className="final-cta__sub">
              Tell me in 2–3 sentences. I&apos;ll reply within 1 business day with
              the simplest fix — free.
            </p>
            <div className="final-cta__actions">
              <Link href="/contact" className="btn btn-primary">
                Get My Free Fix Assessment →
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
            <p className="final-cta__alt">
              Or email directly: <a href="mailto:limalabsllc@gmail.com" className="link-animate">limalabsllc@gmail.com</a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

/* ── Data ─────────────────────────────────── */

const PAINS = [
  {
    icon: '01',
    title: 'Hours lost to copy-paste work',
    body: 'Re-typing orders, invoices, schedules, or follow-ups across spreadsheets and apps.',
    fix: 'one-click automation that does it for you.',
  },
  {
    icon: '02',
    title: 'Leads slip through the cracks',
    body: 'Missed calls, slow replies, no follow-up — customers go to whoever answers first.',
    fix: 'AI chatbot + instant follow-up that never sleeps.',
  },
  {
    icon: '03',
    title: 'Website that doesn’t bring business',
    body: 'Outdated, slow, or invisible on Google. Looks fine, does nothing.',
    fix: 'fast site built to rank and convert visitors into calls.',
  },
  {
    icon: '04',
    title: 'Messy data, no clear picture',
    body: 'Sales, inventory, or bookings scattered everywhere. Decisions by gut feeling.',
    fix: 'simple dashboard + internal tool in one place.',
  },
  {
    icon: '05',
    title: 'Customers expect an app',
    body: 'Repeat customers want booking, ordering, or updates from their phone.',
    fix: 'lightweight mobile app without enterprise cost.',
  },
  {
    icon: '06',
    title: 'Tools that don’t talk to each other',
    body: 'Stripe, QuickBooks, Gmail, CRM — disconnected, so you do the glue work.',
    fix: 'clean integrations that sync everything.',
  },
]

const FREEBIES = [
  {
    tag: 'Free call — 20 min',
    title: 'Free Fix Assessment',
    body: 'Show me your biggest time-drain. I map the simplest fix and what it would cost — yours to keep even if we never work together.',
    cta: 'Claim my free call →',
    href: '/contact',
  },
  {
    tag: 'Free download',
    title: '5 Automations Playbook',
    body: 'The exact automations saving owners 10+ hrs/week: lead follow-up, invoicing, review requests, scheduling, FAQs.',
    cta: 'Get the playbook →',
    href: '#playbook',
  },
  {
    tag: 'Free reading',
    title: 'Practical guides for owners',
    body: 'Short, jargon-free posts: when is AI worth it? How much should a website cost? What to automate first?',
    cta: 'Read free guides →',
    href: '/blog',
  },
]

const SERVICES = [
  {
    icon: '01',
    title: 'AI Chatbots & Support',
    body: 'Answer common questions instantly on your site or Facebook page. Capture leads after hours. Cut repetitive support tickets in half.',
    example: 'a dentist books appointments 24/7 without extra staff.',
  },
  {
    icon: '02',
    title: 'Workflow Automation',
    body: 'Invoices, follow-ups, scheduling, data entry — wired together so work flows without you touching it.',
    example: 'a contractor saves 8 hrs/week on quotes + invoicing.',
  },
  {
    icon: '03',
    title: 'Custom Web Apps',
    body: 'Booking systems, customer portals, quote calculators, internal dashboards — built around how you actually work.',
    example: 'a shop replaces 4 spreadsheets with one portal.',
  },
  {
    icon: '04',
    title: 'Mobile Apps for Business',
    body: 'Ordering, loyalty, booking, or field updates — one app for iOS + Android your customers actually use.',
    example: 'a café takes repeat orders without phone tag.',
  },
  {
    icon: '05',
    title: 'Websites That Sell',
    body: 'Fast, mobile-first sites that rank on Google and turn visitors into calls, bookings, and sales — not just brochures.',
    example: 'a local service doubles quote requests in 90 days.',
  },
  {
    icon: '06',
    title: 'Integrations & Dashboards',
    body: 'Stripe, QuickBooks, CRMs, email — connected so numbers stay correct and you see the whole business at a glance.',
    example: 'an owner checks sales + schedule in one screen.',
  },
]

const PROCESS = [
  {
    title: 'Free diagnostic call',
    body: 'You show me the pain. I tell you the simplest fix, honest cost, and whether I’m even the right person. You keep the plan either way.',
    time: '20 min · free · no pitch',
  },
  {
    title: 'Fixed-scope build',
    body: 'Small first win, fixed price in writing. You see progress weekly and give feedback early — no big-bang surprises.',
    time: 'Typical first win: 1–3 weeks',
  },
  {
    title: 'Launch + handoff',
    body: 'I launch it, train you in plain English, and hand over everything — code, logins, docs. Optional support plan after.',
    time: 'You own 100% of it',
  },
]

const STATS = [
  { num: 'Biz + CS', label: 'Degrees — I speak revenue and code' },
  { num: '1:1', label: 'You work directly with me, no hand-offs' },
  { num: '24h', label: 'Response time on new inquiries' },
]

const FAQS = [
  {
    q: 'How much does a small project cost?',
    a: 'Most first wins land between $500–$3,000 depending on scope: a landing site or simple automation is on the low end, a custom web or mobile app on the higher end. You always get a fixed price in writing before I start — no hourly meter running.',
  },
  {
    q: 'I’m not technical. Will I understand what you’re doing?',
    a: 'Yes — that’s the point. I explain everything in business terms: what it saves, what it earns, what it costs. You get a short video walkthrough and simple docs, not a code dump.',
  },
  {
    q: 'Do I own what you build?',
    a: '100%. Code, accounts, domains, docs — all in your name. I set everything up so you could hand it to anyone else if you wanted to.',
  },
  {
    q: 'How fast can we start?',
    a: 'Diagnostic calls usually happen within a few days. Small builds start within 1–2 weeks and first versions often ship in 1–3 weeks.',
  },
  {
    q: 'What if AI / automation isn’t right for my business?',
    a: 'I’ll tell you on the first call. If a spreadsheet or a simpler process beats custom software, I’ll say so. I’d rather earn trust than sell you something you don’t need.',
  },
  {
    q: 'How do we communicate?',
    a: 'Email at limalabsllc@gmail.com or Facebook Messenger at Lima Labs — whichever you prefer. Weekly progress updates, plain English, no ticket black holes.',
  },
]
