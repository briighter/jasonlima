'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

const NAV_LINKS = [
  { href: '/#services', label: 'Services' },
  { href: '/#process',  label: 'Process'  },
  { href: '/work',      label: 'Work'     },
  { href: '/blog',      label: 'Free Guides' },
  { href: '/about',     label: 'About'    },
] as const

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('color-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(stored ? stored === 'dark' : prefersDark)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark'
    setIsDark(!isDark)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('color-theme', next)
  }

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="nav__inner">
          <Link href="/" className="nav__logo" aria-label="Jason Lima — home">
            Lima Labs<span>.</span>
          </Link>

          <ul className="nav__links" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`nav__link${pathname === href ? ' active' : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}

            <li>
              <Link href="/contact" className="btn btn-primary" style={{ padding: '10px 18px' }}>
                Get Free Audit
              </Link>
            </li>
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {mounted && (
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                style={{ display: 'flex' }}
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
              </button>
            )}

            <button
              className={`nav__hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(prev => !prev)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`nav__mobile-menu${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="nav__mobile-link"
          >
            {label}
          </Link>
        ))}
        <Link href="/contact" className="btn btn-primary" style={{ marginTop: '12px', justifyContent: 'center' }}>
          Get Free Audit
        </Link>
      </div>

      <div style={{ height: 'var(--nav-height)' }} aria-hidden="true" />
    </>
  )
}
