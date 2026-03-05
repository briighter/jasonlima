'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'

/* ──────────────────────────────────────────────────
   Contact page — floating label form + social links
────────────────────────────────────────────────── */

function FloatField({
  id,
  label,
  type = 'text',
  multiline = false,
  required = false,
  value,
  onChange,
}: {
  id: string
  label: string
  type?: string
  multiline?: boolean
  required?: boolean
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="float-label">
      {multiline ? (
        <textarea
          id={id}
          name={id}
          placeholder=" "
          required={required}
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={5}
          aria-label={label}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder=" "
          required={required}
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-label={label}
          autoComplete={id === 'email' ? 'email' : id === 'name' ? 'name' : 'off'}
        />
      )}
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default function ContactPage() {
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
    <div style={{ paddingBlock: 'var(--space-section)' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
            gap: 'clamp(48px, 8vw, 120px)',
            alignItems: 'start',
          }}
        >
          {/* Left — copy + social */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 500,
                letterSpacing: 'var(--tracking-ultra)',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Get in touch
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 900,
                letterSpacing: 'var(--tracking-tight)',
                lineHeight: 'var(--leading-tight)',
                color: 'var(--color-ink)',
                marginBottom: 'var(--space-6)',
                maxWidth: '14ch',
              }}
            >
              Let&apos;s talk{' '}
              <span style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--color-muted)' }}>
                about something real.
              </span>
            </h1>
            <p
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--color-muted)',
                lineHeight: 'var(--leading-loose)',
                maxWidth: '40ch',
                marginBottom: 'var(--space-12)',
              }}
            >
              I&apos;m open to interesting conversations — about engineering challenges,
              collaboration opportunities, or just trading notes on things we&apos;re both
              figuring out. No pitch decks, please.
            </p>

            {/* Social alternative links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {[
                {
                  label: 'Email directly',
                  href:  'mailto:jason@example.com',
                  value: 'jason@example.com',
                },
                {
                  label: 'GitHub',
                  href:  'https://github.com/briighter',
                  value: 'github.com/briighter',
                },
                {
                  label: 'LinkedIn',
                  href:  'https://linkedin.com/in/jasonlima',
                  value: 'linkedin.com/in/jasonlima',
                },
              ].map(({ label, href, value }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{ textDecoration: 'none' }}
                  className="link-animate"
                >
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-light)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', marginBottom: '2px' }}>
                    {label}
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink)', fontFamily: 'var(--font-display)', fontWeight: 500 }}>
                    {value}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            {status === 'success' ? (
              <div
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-12)',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontStyle: 'italic',
                    color: 'var(--color-accent)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  Message sent.
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted)' }}>
                  I&apos;ll get back to you within a couple of days.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
                style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
              >
                <FloatField id="name"    label="Your name"    value={name}    onChange={setName}    required />
                <FloatField id="email"   label="Email address" type="email" value={email}   onChange={setEmail}   required />
                <FloatField id="message" label="Your message" multiline value={message} onChange={setMessage} required />

                {status === 'error' && (
                  <p role="alert" style={{ fontSize: 'var(--text-sm)', color: '#ef4444' }}>
                    Something went wrong. Try emailing directly instead.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === 'loading'}
                  style={{ alignSelf: 'flex-start', marginTop: 'var(--space-2)' }}
                >
                  {status === 'loading' ? 'Sending…' : 'Send message'}
                  {status !== 'loading' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
