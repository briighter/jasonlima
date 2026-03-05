import Link from 'next/link'
import type { Metadata } from 'next'
import PostCard from '@/components/PostCard'
import NewsletterForm from '@/components/NewsletterForm'
import { getFeaturedPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Jason Lima — Software Engineer',
  description:
    'Software engineer, builder, and occasional writer. Work at the intersection of thoughtful engineering and clean product design.',
}

/* ──────────────────────────────────────────────────
   HOME PAGE — Refined Editorial
   Sections: Hero → Marquee → About → Posts → Newsletter
────────────────────────────────────────────────── */
export default async function HomePage() {
  const featuredPosts = await getFeaturedPosts(3)

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section
        className="hero-mesh grain-overlay"
        style={{
          minHeight: 'calc(100vh - var(--nav-height))',
          display: 'flex',
          alignItems: 'center',
          padding: 'var(--space-section) clamp(20px, 5vw, 60px)',
          position: 'relative',
        }}
        aria-labelledby="hero-heading"
      >
        <div style={{ maxWidth: 'var(--max-w-wide)', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          {/* Eyebrow */}
          <p
            className="anim-fade-up anim-delay-0"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--weight-medium)',
              letterSpacing: 'var(--tracking-ultra)',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Software Engineer
          </p>

          {/* Headline — display name in Fraunces, descriptor lighter */}
          <h1
            id="hero-heading"
            className="anim-fade-up anim-delay-100"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-hero)',
              fontWeight: 'var(--weight-black)',
              letterSpacing: 'var(--tracking-tight)',
              lineHeight: '1.0',
              color: 'var(--color-ink)',
              marginBottom: 'var(--space-6)',
              maxWidth: '16ch',
            }}
          >
            Jason{' '}
            <span style={{ fontWeight: 'var(--weight-light)', fontStyle: 'italic', color: 'var(--color-muted)' }}>
              Lima.
            </span>
          </h1>

          {/* Value proposition */}
          <p
            className="anim-fade-up anim-delay-200"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              color: 'var(--color-muted)',
              maxWidth: '48ch',
              lineHeight: 'var(--leading-base)',
              marginBottom: 'var(--space-8)',
            }}
          >
            I build software that&apos;s precise, performant, and actually pleasant to use.
            Currently focused on full-stack web engineering, distributed systems, and
            writing about things I&apos;ve learned the hard way.
          </p>

          {/* CTAs */}
          <div
            className="anim-fade-up anim-delay-300"
            style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}
          >
            <Link href="/work" className="btn btn-primary">
              View My Work
              <ArrowRightIcon />
            </Link>
            <Link href="/blog" className="btn btn-outline">
              Read the Blog
            </Link>
          </div>

          {/* Decorative large number — grid-breaking moment */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(200px, 28vw, 400px)',
              fontWeight: 'var(--weight-black)',
              color: 'var(--color-border)',
              lineHeight: 1,
              pointerEvents: 'none',
              userSelect: 'none',
              letterSpacing: '-0.06em',
              zIndex: 0,
            }}
          >
            JL
          </span>
        </div>
      </section>

      {/* ── MARQUEE STRIP ────────────────────────────── */}
      <div
        style={{
          borderBlock: '1px solid var(--color-border)',
          padding: 'var(--space-4) 0',
          overflow: 'hidden',
          background: 'var(--color-surface)',
        }}
        aria-hidden="true"
      >
        <div className="marquee">
          <div className="marquee__track">
            {[
              'TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL',
              'Go', 'Docker', 'AWS', 'System Design', 'API Architecture',
              'Performance', 'Accessibility', 'Open Source',
              'TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL',
              'Go', 'Docker', 'AWS', 'System Design', 'API Architecture',
              'Performance', 'Accessibility', 'Open Source',
            ].map((item, i) => (
              <span key={i} className="marquee__item">
                {item}
                <span className="marquee__separator" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── ABOUT ────────────────────────────────────── */}
      <section
        className="section"
        id="about"
        aria-labelledby="about-heading"
        style={{ background: 'var(--color-bg)' }}
      >
        <div className="container">
          {/* Asymmetric 2-column: 3fr text / 2fr visual */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)',
              gap: 'clamp(48px, 8vw, 120px)',
              alignItems: 'start',
            }}
          >
            {/* Left — bio text */}
            <div className="reveal">
              {/* Section label */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--weight-medium)',
                  letterSpacing: 'var(--tracking-ultra)',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                About
              </p>

              <h2
                id="about-heading"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 'var(--weight-bold)',
                  letterSpacing: 'var(--tracking-tight)',
                  lineHeight: 'var(--leading-tight)',
                  color: 'var(--color-ink)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                Engineer by trade,{' '}
                <em style={{ fontWeight: 'var(--weight-light)' }}>builder by instinct.</em>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-muted)', lineHeight: 'var(--leading-loose)' }}>
                  I&apos;m a software engineer with roots in computer science from Eastern Connecticut
                  State University and Southern New Hampshire University. I&apos;ve spent my career
                  building systems that scale — from API infrastructure to product-facing features
                  that real people use every day.
                </p>
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-muted)', lineHeight: 'var(--leading-loose)' }}>
                  I care about the craft: clean code, thoughtful architecture, and the rare
                  satisfaction of shipping something that genuinely works well. Outside the editor,
                  I write about engineering, document my learning, and occasionally build things
                  just to see if I can.
                </p>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-8)', flexWrap: 'wrap' }}>
                <Link href="/work" className="btn btn-outline" style={{ fontSize: 'var(--text-xs)' }}>
                  View projects
                </Link>
                <a
                  href="mailto:jason@example.com"
                  className="btn btn-ghost"
                  style={{ fontSize: 'var(--text-xs)' }}
                >
                  Say hello →
                </a>
              </div>
            </div>

            {/* Right — decorative / abstract shape */}
            <div
              className="reveal"
              data-delay="200"
              style={{ position: 'relative' }}
            >
              {/* Grid-breaking numeric decoration */}
              <div
                style={{
                  position: 'relative',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-8)',
                  overflow: 'hidden',
                }}
              >
                {/* Large decorative numeral behind content */}
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '-16px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '180px',
                    fontWeight: 'var(--weight-black)',
                    color: 'var(--color-border)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  01
                </span>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Stats */}
                  {[
                    { num: '5+',  label: 'Years of experience' },
                    { num: '20+', label: 'Projects shipped'    },
                    { num: '∞',   label: 'Things still to learn' },
                  ].map(({ num, label }) => (
                    <div
                      key={label}
                      style={{
                        padding: 'var(--space-4) 0',
                        borderBottom: '1px solid var(--color-border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        gap: 'var(--space-4)',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-2xl)',
                          fontWeight: 'var(--weight-bold)',
                          color: 'var(--color-accent)',
                          letterSpacing: 'var(--tracking-tight)',
                        }}
                      >
                        {num}
                      </span>
                      <span
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--color-muted)',
                          textAlign: 'right',
                        }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating accent dot — grid-breaking decoration */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: '-24px',
                  right: '-24px',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'var(--color-accent-dim)',
                  border: '1px solid var(--color-accent)',
                  opacity: 0.6,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED POSTS ───────────────────────────── */}
      {featuredPosts.length > 0 && (
        <section
          className="section"
          id="writing"
          aria-labelledby="posts-heading"
          style={{ background: 'var(--color-surface)' }}
        >
          <div className="container">
            {/* Section header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginBottom: 'var(--space-12)',
                gap: 'var(--space-4)',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--weight-medium)',
                    letterSpacing: 'var(--tracking-ultra)',
                    textTransform: 'uppercase',
                    color: 'var(--color-accent)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  Writing
                </p>
                <h2
                  id="posts-heading"
                  className="reveal"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--weight-bold)',
                    letterSpacing: 'var(--tracking-tight)',
                    color: 'var(--color-ink)',
                  }}
                >
                  Recent essays &amp; notes
                </h2>
              </div>
              <Link
                href="/blog"
                className="btn btn-ghost reveal"
                data-delay="100"
                style={{ fontSize: 'var(--text-xs)', flexShrink: 0 }}
              >
                All posts →
              </Link>
            </div>

            {/* Post grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
                gap: 'var(--space-gap)',
              }}
            >
              {featuredPosts.map((post, i) => (
                <div key={post.slug} className="reveal" data-delay={String(i * 100)}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── NEWSLETTER CTA ───────────────────────────── */}
      <section
        className="section"
        id="newsletter"
        aria-labelledby="newsletter-heading"
      >
        <div className="container">
          <div className="reveal">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  )
}

/* ── Inline icon ──────────────────────────────────── */
function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}
