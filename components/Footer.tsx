import Link from 'next/link'

interface SocialLink {
  href: string
  label: string
  icon: React.ReactNode
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'mailto:limalabsllc@gmail.com',
    label: 'Email — limalabsllc@gmail.com',
    icon: <MailIcon />,
  },
  {
    href: 'https://www.facebook.com/LimaLabsTech',
    label: 'Facebook — Lima Labs',
    icon: <FacebookIcon />,
  },
  {
    href: 'https://github.com/briighter',
    label: 'GitHub',
    icon: <GitHubIcon />,
  },
  {
    href: 'https://www.linkedin.com/in/jaylima0/',
    label: 'LinkedIn',
    icon: <LinkedInIcon />,
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer footer--expanded" role="contentinfo">
      <div className="container">
        <div className="footer-cta">
          <div>
            <p className="section-eyebrow">Get started</p>
            <h2 className="footer-cta__title">
              Have a time-drain or a missed-sale problem? Let&apos;s fix it.
            </h2>
            <p className="footer-cta__sub">
              Free 20-min diagnostic call. You describe the pain, I tell you the
              simplest fix — even if you don&apos;t hire me.
            </p>
          </div>
          <div className="footer-cta__actions">
            <Link href="/contact" className="btn btn-primary">
              Get My Free Audit →
            </Link>
            <a href="mailto:limalabsllc@gmail.com" className="btn btn-outline">
              limalabsllc@gmail.com
            </a>
          </div>
        </div>

        <div className="footer__inner footer__inner--split">
          <p className="footer__brand">
            <Link href="/" className="link-animate" style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', color: 'var(--color-ink)' }}>
              Lima Labs
            </Link>
            {' '}· Jason Lima, Freelance Solutions Engineer
          </p>

          <ul className="footer__social" role="list" aria-label="Social links">
            {SOCIAL_LINKS.map(({ href, label, icon }) => (
              <li key={href}>
                <a
                  href={href}
                  className="footer__social-link"
                  aria-label={label}
                  title={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <span className="icon-wrap" aria-hidden="true">
                    {icon}
                    {icon}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className="footer__copy">
            &copy; {year} Lima Labs LLC. AI · Automation · Web · Mobile.
          </p>
        </div>
      </div>
    </footer>
  )
}
