import Link from 'next/link'
import type { Metadata } from 'next'
import StarMark from '@/components/StarMark'
import RoiCalculator from '@/components/RoiCalculator'
import ProjectCard from '@/components/ProjectCard'
import PostCard from '@/components/PostCard'
import SocialIcon from '@/components/SocialIcon'
import { getFeaturedPosts } from '@/lib/posts'
import { getFeaturedProjects } from '@/lib/projects'
import { PROCESS, SERVICES, SITE, SOCIALS, STATS } from '@/lib/site'

export const metadata: Metadata = {
  description: SITE.description,
}

const MARQUEE_ITEMS = [
  'Workflow automation',
  'Internal tools',
  'Full-stack web',
  'React Native',
  'Systems analysis',
  'AI integration',
  'Dashboards',
  'Fractional CTO',
  'API architecture',
  'Process redesign',
]

interface SectionHeadProps {
  eyebrow: string
  title: React.ReactNode
  text?: string
  link?: { href: string; label: string }
  split?: boolean
}

function SectionHead({ eyebrow, title, text, link, split }: SectionHeadProps) {
  return (
    <div className={`section-head${split ? ' section-head--split' : ''}`}>
      <span className="eyebrow">
        <StarMark size={11} />
        {eyebrow}
      </span>
      <div className="section-head__row">
        <h2 className="display">{title}</h2>
        {text && <p className="section-head__text">{text}</p>}
        {link && (
          <Link href={link.href} className="section-link">
            {link.label} <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </div>
  )
}

export default function HomePage() {
  const featuredProjects = getFeaturedProjects(3)
  const featuredPosts = getFeaturedPosts(3)

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero__grid-bg" aria-hidden="true" />
        <div className="hero__inner container">
          <div className="hero__copy">
            <span className="status-pill anim-fade-up">
              <span className="status-pill__dot" aria-hidden="true" />
              <span>{SITE.availability}</span>
              <span className="status-pill__sep" aria-hidden="true" />
              <span className="status-pill__remote">Remote worldwide</span>
            </span>

            <h1 id="hero-heading" className="hero__headline anim-fade-up anim-delay-75">
              I automate the work you{' '}
              <span className="hero__headline-accent">shouldn&apos;t be doing.</span>
            </h1>

            <p className="hero__sub anim-fade-up anim-delay-150">
              I&apos;m Jason — a freelance software engineer and fractional CTO. I build
              the automations, internal tools, apps, and systems that erase repetitive
              work and pay for themselves.
            </p>

            <div className="hero__ctas anim-fade-up anim-delay-225">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Get a free automation audit
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="#roi" className="btn btn-ghost btn-lg">
                See the math
              </Link>
            </div>

            <ul className="hero__proof anim-fade-up anim-delay-300" role="list">
              <li>Fixed scope</li>
              <li>Fixed price</li>
              <li>You own everything</li>
            </ul>
          </div>

          <div className="hero__visual anim-fade-in anim-delay-150" aria-hidden="true">
            <div className="orbit orbit--1" />
            <div className="orbit orbit--2" />
            <div className="orbit orbit--3">
              <span className="orbit__dot" />
            </div>
            <div className="hero__star-wrap">
              <StarMark size={300} className="hero__star" />
            </div>

            <div className="hero__chip hero__chip--before">
              <span className="hero__chip-label">Before</span>
              <span className="hero__chip-value">14 hrs / week</span>
              <span className="hero__chip-bar"><span style={{ width: '88%' }} /></span>
            </div>

            <div className="hero__chip hero__chip--after">
              <span className="hero__chip-label">After</span>
              <span className="hero__chip-value">0.2 hrs / week</span>
              <span className="hero__chip-bar hero__chip-bar--short"><span style={{ width: '6%' }} /></span>
            </div>

            <div className="hero__chip hero__chip--roi">
              <span className="hero__chip-label">Payback</span>
              <span className="hero__chip-value hero__chip-value--accent">2.2 weeks</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITY MARQUEE ───────────────────────────────── */}
      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee">
          <div className="marquee__track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="marquee__item">
                {item}
                <span className="marquee__separator">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── ROI ──────────────────────────────────────────────── */}
      <section className="section roi-section" id="roi" aria-labelledby="roi-heading">
        <div className="container">
          <SectionHead
            eyebrow="The math"
            title={
              <>
                If it doesn&apos;t pay for itself,
                <br />
                <span className="text-accent">don&apos;t build it.</span>
              </>
            }
            text="Most small teams lose 10–30 hours a week to work a script could do. Move the sliders. That number is the annual cost of leaving it manual."
          />
          <RoiCalculator />
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section className="section section--tint" id="services" aria-labelledby="services-heading">
        <div className="container">
          <SectionHead
            eyebrow="Productized services"
            title={
              <>
                Pick a starting point.
                <br />
                <span className="text-accent">I&apos;ll tell you if it&apos;s wrong.</span>
              </>
            }
            text="Fixed-scope products, not open-ended hourly work. Every engagement starts with a number: what it costs, what it replaces, and when it ships."
          />

          <div className="services">
            {SERVICES.map(service => (
              <article key={service.num} className={`service service--${service.accent}`}>
                <div className="service__top">
                  <span className="service__num">{service.num}</span>
                  <span className="service__price">{service.price}</span>
                </div>

                <h3 className="service__title">{service.title}</h3>
                <p className="service__tagline">{service.tagline}</p>
                <p className="service__desc">{service.description}</p>

                <ul className="service__list" role="list">
                  {service.bullets.map(bullet => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>

                <div className="service__foot">
                  <span className="service__timeline">{service.timeline}</span>
                  <Link href="/contact" className="service__link">
                    Scope this <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="cto-band">
            <StarMark size={280} className="cto-band__star" />
            <div className="cto-band__copy">
              <span className="mono-label mono-label--light">Fractional CTO</span>
              <h3>Technical leadership without the full-time hire.</h3>
              <p>
                Architecture, hiring, vendor decisions, roadmap, and delivery oversight.
                A few days a month, exactly when the decisions matter — not a permanent
                salary.
              </p>
            </div>
            <div className="cto-band__side">
              <span className="cto-band__price">
                $3,500<span>/mo</span>
              </span>
              <Link href="/contact" className="btn btn-light">
                Talk about your roadmap
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <p className="services__note">
            AI integration — document extraction, triage, drafting, search — can be built
            into any of the above. <Link href="/contact">Tell me what&apos;s manual</Link> and
            I&apos;ll tell you what&apos;s possible.
          </p>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────── */}
      <section className="section" id="process" aria-labelledby="process-heading">
        <div className="container">
          <SectionHead
            eyebrow="How it works"
            title={
              <>
                From &ldquo;this takes forever&rdquo;
                <br />
                <span className="text-accent">to shipped.</span>
              </>
            }
            text="No discovery theater. No 40-page deck. A clear path from the first conversation to software your team actually uses."
            split
          />

          <ol className="process" role="list">
            {PROCESS.map(step => (
              <li key={step.num} className="process__step">
                <span className="process__num">{step.num}</span>
                <h3 className="process__title">{step.title}</h3>
                <p className="process__body">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── SELECTED WORK ────────────────────────────────────── */}
      {featuredProjects.length > 0 && (
        <section className="section section--tint" id="work" aria-labelledby="work-heading">
          <div className="container">
            <SectionHead
              eyebrow="Selected work"
              title={
                <>
                  Proof, not promises.
                </>
              }
              link={{ href: '/work', label: 'See all work' }}
              split
              text="Products I've designed, built, and shipped end to end — from mobile apps to AI platforms."
            />

            <div className="home-work-grid">
              {featuredProjects.map((project, i) => (
                <div key={project.slug} className="reveal" data-delay={String(i * 80)}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── WHY ME ───────────────────────────────────────────── */}
      <section className="section" id="about-teaser" aria-labelledby="why-heading">
        <div className="container">
          <div className="about-teaser">
            <div className="about-teaser__copy reveal">
              <span className="eyebrow">
                <StarMark size={11} />
                Why me
              </span>
              <h2 className="display">
                Enterprise engineering.
                <br />
                <span className="text-accent">Freelance speed.</span>
              </h2>
              <p className="about-teaser__bio">
                Six years building software inside a Fortune 100 financial company taught
                me how systems fail at scale. Building my own products taught me how to
                ship without a committee. You get both: senior engineering discipline and
                the pace of someone who owns the outcome.
              </p>
              <ul className="why-list" role="list">
                <li>
                  <span aria-hidden="true">01</span>
                  <p><strong>I speak business and code.</strong> A CS and Business Information Systems background means I map the process before I write the software.</p>
                </li>
                <li>
                  <span aria-hidden="true">02</span>
                  <p><strong>You own everything.</strong> Code, infrastructure, accounts, documentation. No proprietary lock-in, no hostage situation.</p>
                </li>
                <li>
                  <span aria-hidden="true">03</span>
                  <p><strong>Fixed price, not hourly.</strong> You approve a scope and a number. The risk of overruns is mine, not yours.</p>
                </li>
              </ul>
              <Link href="/about" className="btn btn-ghost">
                More about me
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="about-teaser__panel reveal" data-delay="120">
              <div className="stat-grid">
                {STATS.map(stat => (
                  <div key={stat.label} className="stat">
                    <span className="stat__value">{stat.value}</span>
                    <span className="stat__label">{stat.label}</span>
                  </div>
                ))}
              </div>
              <div className="about-teaser__quote">
                <StarMark size={22} />
                <p>
                  The best automation is the one nobody notices. The work just stops
                  taking all day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WRITING ──────────────────────────────────────────── */}
      {featuredPosts.length > 0 && (
        <section className="section section--tint" id="writing" aria-labelledby="writing-heading">
          <div className="container">
            <SectionHead
              eyebrow="Notes"
              title={<>Thinking in public.</>}
              text="Occasional writing on systems, architecture, and the craft of building software that lasts."
              link={{ href: '/blog', label: 'All posts' }}
              split
            />
            <div className="posts-list">
              {featuredPosts.map((post, i) => (
                <div key={post.slug} className="reveal" data-delay={String(i * 70)}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="cta" aria-labelledby="cta-heading">
        <div className="container">
          <div className="cta__inner">
            <StarMark size={360} className="cta__star" />
            <div className="cta__copy reveal">
              <span className="status-pill status-pill--dark">
                <span className="status-pill__dot" aria-hidden="true" />
                {SITE.availability}
              </span>
              <h2 id="cta-heading">Let&apos;s delete some work.</h2>
              <p>
                Tell me what&apos;s taking too long. I&apos;ll tell you whether it can be
                automated, what it would take, and what it&apos;s worth — before you spend
                a dollar.
              </p>
              <div className="cta__actions">
                <Link href="/contact" className="btn btn-light btn-lg">
                  Start a project
                  <span aria-hidden="true">→</span>
                </Link>
                <a href={`mailto:${SITE.email}`} className="cta__email">
                  {SITE.email}
                </a>
              </div>
            </div>

            <div className="cta__socials">
              {SOCIALS.map(({ label, href, value, icon }) => (
                <a
                  key={href}
                  href={href}
                  className="cta__social"
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <span className="cta__social-icon"><SocialIcon icon={icon} size={17} /></span>
                  <span className="cta__social-label">{label}</span>
                  <span className="cta__social-value">{value}</span>
                  <span className="cta__social-arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
