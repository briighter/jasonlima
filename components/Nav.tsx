'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import StarMark from './StarMark'

const NAV_LINKS = [
  { href: '/#services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Writing' },
  { href: '/contact', label: 'Contact' },
] as const

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    if (menuOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (href: string) => {
    if (href === '/#services') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <>
      <nav
        className={`nav${scrolled ? ' nav--scrolled' : ''}${menuOpen ? ' nav--open' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="nav__inner">
          <Link href="/" className="nav__logo" aria-label="Jason Lima — home">
            <StarMark size={26} className="nav__logo-star" />
            <span className="nav__logo-text">
              <span className="nav__logo-name">Jason Lima</span>
              <span className="nav__logo-role">Freelance Engineer</span>
            </span>
          </Link>

          <ul className="nav__links" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`nav__link${isActive(href) ? ' active' : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav__controls" ref={menuRef}>
            <Link href="/contact" className="btn btn-primary nav__cta">
              Start a project
            </Link>

            <button
              className={`nav__hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(p => !p)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`nav-drawer${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="nav-drawer__inner">
          {NAV_LINKS.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              className="nav-drawer__link anim-fade-up"
              style={{ animationDelay: `${i * 50}ms` } as React.CSSProperties}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span>{label}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn btn-primary nav-drawer__cta anim-fade-up"
            style={{ animationDelay: '300ms' } as React.CSSProperties}
            tabIndex={menuOpen ? 0 : -1}
          >
            Start a project
          </Link>
          <p className="nav-drawer__meta">jason@jasonlima.com</p>
        </div>
      </div>
    </>
  )
}
