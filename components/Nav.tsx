'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/* ──────────────────────────────────────────────────
   Icons — inline SVGs, no external dependency
────────────────────────────────────────────────── */
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

/* ──────────────────────────────────────────────────
   Nav links config
────────────────────────────────────────────────── */
const NAV_LINKS = [
  { href: '/about',   label: 'About'   },
  { href: '/blog',    label: 'Blog'    },
  { href: '/work',    label: 'Work'    },
  { href: '/contact', label: 'Contact' },
] as const

/* ──────────────────────────────────────────────────
   Nav component
────────────────────────────────────────────────── */
export default function Nav() {
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [isDark,       setIsDark]       = useState(false)
  const [mounted,      setMounted]      = useState(false)
  const pathname = usePathname()
  const menuRef  = useRef<HTMLDivElement>(null)

  /* Read initial theme preference once mounted client-side */
  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('color-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(stored ? stored === 'dark' : prefersDark)
  }, [])

  /* Scroll listener — adds blur/shadow class */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close mobile menu on route change */
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  /* Close mobile menu on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  /* Prevent body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* Toggle dark/light theme */
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
          {/* Logo */}
          <Link href="/" className="nav__logo" aria-label="Jason Lima — home">
            Jason<span>.</span>
          </Link>

          {/* Desktop links */}
          <ul className="nav__links" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`nav__link${pathname.startsWith(href) ? ' active' : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}

            {/* Theme toggle */}
            {mounted && (
              <li>
                <button
                  className="theme-toggle"
                  onClick={toggleTheme}
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDark ? <SunIcon /> : <MoonIcon />}
                </button>
              </li>
            )}
          </ul>

          {/* Mobile controls */}
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

      {/* Mobile menu */}
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
            className={`nav__mobile-link${pathname.startsWith(href) ? ' active' : ''}`}
          >
            {label}
          </Link>
        ))}

        {/* Theme toggle inside mobile menu */}
        {mounted && (
          <button
            className="btn btn-ghost"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{ justifyContent: 'flex-start', paddingLeft: 0, marginTop: '8px' }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted)' }}>
              {isDark ? 'Light mode' : 'Dark mode'}
            </span>
          </button>
        )}
      </div>

      {/* Spacer so content starts below fixed nav */}
      <div style={{ height: 'var(--nav-height)' }} aria-hidden="true" />
    </>
  )
}
