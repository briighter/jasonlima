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
   Aesthetic direction: Refined Editorial (Fraunces + DM Sans)
   All styles use CSS classes from globals.css /
   animations.css — no inline styles.
   Sections: Hero → Marquee → About → Featured Posts → Newsletter
────────────────────────────────────────────────── */
export default async function HomePage() {
  const featuredPosts = await getFeaturedPosts(3)

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="hero hero-mesh grain-overlay" aria-labelledby="hero-heading">
        <div className="hero__inner">
          {/* Eyebrow */}
          <p className="hero__eyebrow anim-fade-up anim-delay-0">
            Software Engineer
          </p>

          {/* Headline — name in heavy Fraunces, descriptor light italic */}
          <h1 id="hero-heading" className="hero__headline anim-fade-up anim-delay-100">
            Jason <em>Lima.</em>
          </h1>

          {/* Value proposition */}
          <p className="hero__description anim-fade-up anim-delay-200">
            I build software that&apos;s precise, performant, and actually pleasant to use.
            Currently focused on full-stack web engineering, distributed systems, and
            writing about things I&apos;ve learned the hard way.
          </p>

          {/* CTAs */}
          <div className="hero__ctas anim-fade-up anim-delay-300">
            <Link href="/work" className="btn btn-primary">
              View My Work
              <ArrowRightIcon />
            </Link>
            <Link href="/blog" className="btn btn-outline">
              Read the Blog
            </Link>
          </div>

          {/* Decorative initials — the grid-breaking moment for the hero */}
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

      {/* ── ABOUT ─────────────────────────────────────────────────── */}
      <section className="section" id="about" aria-labelledby="about-heading">
        <div className="container">
          <div className="about-grid">
            {/* Left col — bio text, 3fr */}
            <div className="reveal">
              <p className="section-eyebrow">About</p>

              <h2 id="about-heading" className="about__headline">
                Engineer by trade,{' '}
                <em>builder by instinct.</em>
              </h2>

              <div className="about__bio">
                <p>
                  I&apos;m a software engineer with roots in computer science from Eastern Connecticut
                  State University and Southern New Hampshire University. I&apos;ve spent my career
                  building systems that scale — from API infrastructure to product-facing features
                  that real people use every day.
                </p>
                <p>
                  I care about the craft: clean code, thoughtful architecture, and the rare
                  satisfaction of shipping something that genuinely works well. Outside the editor,
                  I write about engineering, document my learning, and occasionally build things
                  just to see if I can.
                </p>
              </div>

              <div className="about__actions">
                <Link href="/work" className="btn btn-outline">
                  View projects
                </Link>
                <a href="mailto:jason@example.com" className="btn btn-ghost">
                  Say hello →
                </a>
              </div>
            </div>

            {/* Right col — stats card with decorative numeral, 2fr */}
            <div className="about__stats-wrap reveal" data-delay="200">
              <div className="about__stats-card">
                {/* Large numeral behind content — grid-breaking decoration */}
                <span className="about__stats-deco" aria-hidden="true">01</span>

                <div className="about__stats-inner">
                  {STATS.map(({ num, label }) => (
                    <div key={label} className="about__stat">
                      <span className="about__stat-num">{num}</span>
                      <span className="about__stat-label">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating accent circle breaks out of the card boundary */}
              <div className="about__circle-deco" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED POSTS ────────────────────────────────────────── */}
      {featuredPosts.length > 0 && (
        <section
          className="section section--surface"
          id="writing"
          aria-labelledby="posts-heading"
        >
          <div className="container">
            <div className="posts-section-header">
              <div>
                <p className="section-eyebrow">Writing</p>
                <h2 id="posts-heading" className="posts-section-title reveal">
                  Recent essays &amp; notes
                </h2>
              </div>
              <Link href="/blog" className="btn btn-ghost reveal" data-delay="100">
                All posts →
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

      {/* ── NEWSLETTER CTA ────────────────────────────────────────── */}
      <section className="section" id="newsletter" aria-labelledby="newsletter-heading">
        <div className="container">
          <div className="reveal">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  )
}

/* ── Static data ──────────────────────────────────────────────── */
const MARQUEE_ITEMS = [
  'TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL',
  'Go', 'Docker', 'AWS', 'System Design', 'API Architecture',
  'Performance', 'Accessibility', 'Open Source',
]

const STATS: { num: string; label: string }[] = [
  { num: '5+',  label: 'Years of experience'  },
  { num: '20+', label: 'Projects shipped'      },
  { num: '∞',   label: 'Things still to learn' },
]

/* ── Inline icon — no external dep ───────────────────────────── */
function ArrowRightIcon() {
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
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}
