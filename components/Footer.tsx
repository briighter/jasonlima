import Link from 'next/link'
import StarMark from './StarMark'
import SocialIcon from './SocialIcon'
import { SOCIALS } from '@/lib/site'

const FOOTER_LINKS = [
  { href: '/#services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Writing' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link href="/" className="footer__logo" aria-label="Jason Lima — home">
            <StarMark size={30} />
            <span>Jason Lima</span>
          </Link>
          <p className="footer__blurb">
            Freelance software engineer and fractional CTO. I replace repetitive work
            with systems that pay for themselves.
          </p>
          <a href="mailto:jason@jasonlima.com" className="footer__email">
            jason@jasonlima.com
          </a>
        </div>

        <div className="footer__col">
          <span className="footer__label">Navigate</span>
          <nav className="footer__nav" aria-label="Footer navigation">
            {FOOTER_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className="footer__nav-link">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer__col">
          <span className="footer__label">Elsewhere</span>
          <div className="footer__socials">
            {SOCIALS.map(({ label, href, value, icon }) => (
              <a
                key={href}
                href={href}
                className="footer__social"
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <SocialIcon icon={icon} size={15} />
                <span>{label}</span>
                <span className="footer__social-value">{value}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span className="footer__copy">&copy; {year} Jason Lima. All rights reserved.</span>
        <span className="footer__copy footer__copy--dim">
          Designed and engineered from scratch. Built with Next.js.
        </span>
      </div>
    </footer>
  )
}
