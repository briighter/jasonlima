'use client'

import { useState, type FormEvent } from 'react'

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

const CONTACT_EMAIL = 'limalabsllc@gmail.com'
const FACEBOOK_URL = 'https://www.facebook.com/LimaLabsTech'

const SERVICE_OPTIONS = [
  'AI chatbot / customer support',
  'Workflow automation (save hours weekly)',
  'Custom web app / internal tool',
  'Mobile app (iOS + Android)',
  'New / fix business website',
  'Something else — I’ll explain below',
]

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [service, setService] = useState(SERVICE_OPTIONS[0])
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, service, message }),
      })
      if (res.ok) {
        setStatus('success')
        setName(''); setEmail(''); setMessage('')
      } else {
        // Backend unavailable — fall back to mailto so the lead is never lost
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
          `Project inquiry — ${service} — ${name}`
        )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nNeed: ${service}\n\n${message}`)}`
        setStatus('success')
      }
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        `Project inquiry — ${service}`
      )}&body=${encodeURIComponent(message)}`
      setStatus('success')
    }
  }

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-grid">
          <div>
            <p className="section-eyebrow">Free fix assessment</p>

            <h1 className="contact-headline">
              Tell me what&apos;s <em>eating your week.</em>
            </h1>

            <p className="contact-blurb">
              20 minutes. You describe the manual work, missed follow-ups, or
              messy spreadsheets. I tell you the simplest fix — with a fixed
              price if you want me to build it. No jargon, no pressure.
            </p>

            <ul className="contact-steps" aria-label="What happens next">
              <li><strong>1.</strong> You send this 60-sec form</li>
              <li><strong>2.</strong> I reply within 1 business day</li>
              <li><strong>3.</strong> Free diagnostic call + plain-English plan</li>
            </ul>

            <div className="contact-social-links">
              <a href={`mailto:${CONTACT_EMAIL}`} className="contact-social-link link-animate">
                <span className="contact-social-link__label">Prefer email directly?</span>
                <span className="contact-social-link__value">{CONTACT_EMAIL}</span>
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="contact-social-link link-animate">
                <span className="contact-social-link__label">Message on Facebook</span>
                <span className="contact-social-link__value">facebook.com/LimaLabsTech</span>
              </a>
            </div>
          </div>

          <div>
            {status === 'success' ? (
              <div className="contact-success">
                <p className="contact-success__title">Got it. I&apos;ll reply fast.</p>
                <p className="contact-success__sub">
                  I respond within 1 business day. Need me sooner? Email{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} style={{ textDecoration: 'underline' }}>{CONTACT_EMAIL}</a>{' '}
                  or message{' '}
                  <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                    Lima Labs on Facebook
                  </a>.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Free fix assessment form"
                className="contact-form"
              >
                <FloatField id="name" label="Your name" value={name} onChange={setName} required />
                <FloatField id="email" label="Work email" type="email" value={email} onChange={setEmail} required />

                <div className="float-label float-label--select">
                  <label htmlFor="service" style={{ position: 'static', transform: 'none', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: 'var(--color-muted)' }}>
                    What do you need fixed?
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={service}
                    onChange={e => setService(e.target.value)}
                    className="contact-select"
                    aria-label="What do you need fixed?"
                  >
                    {SERVICE_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <FloatField
                  id="message"
                  label="What is costing you time or customers right now? (2-3 sentences is perfect)"
                  multiline
                  value={message}
                  onChange={setMessage}
                  required
                />

                {status === 'error' && (
                  <p role="alert" className="contact-form__error">
                    Something went wrong. Email me directly at {CONTACT_EMAIL} instead.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary contact-form__submit"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending…' : 'Get My Free Assessment →'}
                </button>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-light)' }}>
                  No spam. No newsletter signup. Just a reply from me.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
