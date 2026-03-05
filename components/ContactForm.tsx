'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'

/* ──────────────────────────────────────────────────
   Floating label field — input or textarea
   CSS class .float-label handles the label animation
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

const SOCIAL_LINKS = [
  { label: 'Email directly', href: 'mailto:jason@example.com', value: 'jason@example.com'        },
  { label: 'GitHub',         href: 'https://github.com/briighter', value: 'github.com/briighter'  },
  { label: 'LinkedIn',       href: 'https://linkedin.com/in/jasonlima', value: 'linkedin.com/in/jasonlima' },
]

/* ──────────────────────────────────────────────────
   ContactForm — client component
   Extracted from page.tsx so the page can remain a
   server component and export metadata.
────────────────────────────────────────────────── */
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
      <div className="container">
        <div className="contact-grid">
          {/* Left — copy + social links */}
          <div>
            <p className="section-eyebrow">Get in touch</p>

            <h1 className="contact-headline">
              Let&apos;s talk <em>about something real.</em>
            </h1>

            <p className="contact-blurb">
              I&apos;m open to interesting conversations — about engineering challenges,
              collaboration opportunities, or just trading notes on things we&apos;re both
              figuring out. No pitch decks, please.
            </p>

            <div className="contact-social-links">
              {SOCIAL_LINKS.map(({ label, href, value }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="contact-social-link link-animate"
                >
                  <span className="contact-social-link__label">{label}</span>
                  <span className="contact-social-link__value">{value}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            {status === 'success' ? (
              <div className="contact-success">
                <p className="contact-success__title">Message sent.</p>
                <p className="contact-success__sub">
                  I&apos;ll get back to you within a couple of days.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
                className="contact-form"
              >
                <FloatField id="name"    label="Your name"     value={name}    onChange={setName}    required />
                <FloatField id="email"   label="Email address" type="email" value={email}   onChange={setEmail}   required />
                <FloatField id="message" label="Your message"  multiline value={message} onChange={setMessage} required />

                {status === 'error' && (
                  <p role="alert" className="contact-form__error">
                    Something went wrong. Try emailing directly instead.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary contact-form__submit"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending…' : 'Send message'}
                  {status !== 'loading' && <SendIcon />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function SendIcon() {
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
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}
