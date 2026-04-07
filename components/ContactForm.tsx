'use client'

import { useState, type FormEvent } from 'react'

const SOCIAL_LINKS = [
  { label: 'Email directly', href: 'mailto:jason@jasonlima.com', value: 'jason@jasonlima.com'        },
  { label: 'GitHub',         href: 'https://github.com/briighter', value: 'github.com/briighter'      },
  { label: 'LinkedIn',       href: 'https://linkedin.com/in/jasonlima', value: 'linkedin.com/in/jasonlima' },
]

export default function ContactForm() {
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [message, setMessage] = useState('')
  const [status,  setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (res.ok) {
        setStatus('success')
        setName(''); setEmail(''); setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="contact-page">
      {/* Dark header */}
      <header className="section section--dark">
        <div className="container">
          <span className="eyebrow">{'// 04'} &mdash; contact</span>
          <h1 className="section-title" style={{ color: 'var(--color-dk-ink)', marginTop: 'var(--sp-3)', maxWidth: '18ch' }}>
            Let&apos;s talk about <em style={{ color: 'var(--color-accent)' }}>something real.</em>
          </h1>
          <p style={{ color: 'var(--color-dk-muted)', fontFamily: 'var(--font-body)', fontSize: 'var(--t-lg)', maxWidth: '520px', marginTop: 'var(--sp-4)', lineHeight: 1.65 }}>
            Open to interesting conversations &mdash; engineering challenges,
            collaboration, or just trading notes. No pitch decks.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Left — links */}
            <div className="contact-info">
              <p className="eyebrow" style={{ marginBottom: 'var(--sp-6)' }}>Reach me at</p>
              <div className="contact-links">
                {SOCIAL_LINKS.map(({ label, href, value }) => (
                  <a
                    key={href}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="contact-link"
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-muted)' }}>{label}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--t-sm)', color: 'var(--color-ink)', marginTop: 'var(--sp-1)' }}>{value}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div>
              {status === 'success' ? (
                <div style={{ padding: 'var(--sp-10)', background: 'var(--color-bg-alt)', borderRadius: 'var(--r-md)', border: '1px solid var(--color-border)' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--t-2xl)', fontWeight: 700, color: 'var(--color-ink)', marginBottom: 'var(--sp-3)' }}>Message sent.</p>
                  <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}>
                    I&apos;ll get back to you within a couple of days.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Contact form"
                  style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}
                >
                  <div className="field">
                    <label className="field__label" htmlFor="name">Your name</label>
                    <input
                      id="name" name="name" type="text"
                      className="field__input" required
                      value={name} onChange={e => setName(e.target.value)}
                      autoComplete="name"
                    />
                  </div>
                  <div className="field">
                    <label className="field__label" htmlFor="email">Email address</label>
                    <input
                      id="email" name="email" type="email"
                      className="field__input" required
                      value={email} onChange={e => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                  <div className="field">
                    <label className="field__label" htmlFor="message">Your message</label>
                    <textarea
                      id="message" name="message"
                      className="field__textarea" required rows={5}
                      value={message} onChange={e => setMessage(e.target.value)}
                    />
                  </div>

                  {status === 'error' && (
                    <p role="alert" style={{ color: '#c0392b', fontFamily: 'var(--font-body)', fontSize: 'var(--t-sm)' }}>
                      Something went wrong. Try emailing directly instead.
                    </p>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={status === 'loading'}
                    style={{ alignSelf: 'flex-start' }}
                  >
                    {status === 'loading' ? 'Sending\u2026' : 'Send message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
