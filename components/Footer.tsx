import Link from 'next/link'

const FOOTER_LINKS = [
  { href: '/work',    label: 'Work'    },
  { href: '/blog',    label: 'Blog'    },
  { href: '/about',   label: 'About'   },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__top">
        <p className="footer__cta-kicker">Available for work</p>

        <p className="footer__cta-name">
          Jason<span>.</span>
        </p>

        <p className="footer__cta-sub">
          Building precise, performant software. Open to interesting problems,
          technical collaborations, and the occasional challenging project.
        </p>

        <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
          <Link href="/contact" className="btn btn-dk-primary">
            Get in touch
          </Link>
          <a
            href="https://github.com/briighter"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dk-ghost"
          >
            GitHub ↗
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <nav className="footer__nav" aria-label="Footer navigation">
          {FOOTER_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="footer__nav-link">
              {label}
            </Link>
          ))}
        </nav>

        <span className="footer__copy">
          &copy; {year} Jason Lima
        </span>
      </div>
    </footer>
  )
}
