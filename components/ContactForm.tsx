'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { SERVICES, SITE } from '@/lib/site'

const BUDGETS = [
  'Under $5,000',
  '$5,000 – $15,000',
  '$15,000 – $30,000',
  '$30,000+',
  'Not sure yet',
]

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [service, setService] = useState('')
  const [budget, setBudget] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle')
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current)
    }
  }, [])

  const getBrief = (withPlaceholders = false) => {
    const line = (label: string, value: string, fallback: string) => {
      const resolved = value || (withPlaceholders ? fallback : '')
      return resolved ? `${label}: ${resolved}` : null
    }

    return [
      line('Name', name, '[your name]'),
      line('Email', email, '[your email]'),
      line('Company', company, '[optional]'),
      line('Interested in', service, '[choose a service]'),
      line('Budget', budget, '[choose a budget range]'),
      '',
      "What's slowing me down:",
      message ||
        (withPlaceholders
          ? '[describe the repetitive work, how often it happens, and who does it]'
          : ''),
    ]
      .filter(item => item !== null)
      .join('\n')
  }

  const handleCopy = async () => {
    const brief = getBrief(true)

    try {
      await navigator.clipboard.writeText(brief)
      setCopyStatus('copied')
    } catch {
      // Fallback for browsers without the Clipboard API or without permission.
      const area = document.createElement('textarea')
      area.value = brief
      area.setAttribute('readonly', '')
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()

      try {
        const copied = document.execCommand('copy')
        setCopyStatus(copied ? 'copied' : 'error')
      } catch {
        setCopyStatus('error')
      } finally {
        area.remove()
      }
    }

    if (copyTimer.current) clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopyStatus('idle'), 2600)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const subject = encodeURIComponent(`Project inquiry — ${name || 'New project'}`)
    const body = encodeURIComponent(getBrief())

    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`
    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className="contact-success">
        <span className="contact-success__mark" aria-hidden="true">✦</span>
        <h2 className="contact-success__title">Almost there.</h2>
        <p className="contact-success__text">
          Your email app should be open with the project details filled in. Press send
          and it lands in my inbox.
        </p>
        <p className="contact-success__text">
          Nothing happened? Email me directly at{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
        <button type="button" className="btn btn-ghost" onClick={() => setStatus('idle')}>
          Back to the form
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} aria-label="Project inquiry form">
      <div className="contact-form__row">
        <div className="field">
          <label className="field__label" htmlFor="name">Your name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="field__input"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="name"
            placeholder="Alex Morgan"
          />
        </div>
        <div className="field">
          <label className="field__label" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="field__input"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="alex@company.com"
          />
        </div>
      </div>

      <div className="contact-form__row">
        <div className="field">
          <label className="field__label" htmlFor="company">Company <span>(optional)</span></label>
          <input
            id="company"
            name="company"
            type="text"
            className="field__input"
            value={company}
            onChange={e => setCompany(e.target.value)}
            autoComplete="organization"
            placeholder="Company name"
          />
        </div>
        <div className="field">
          <label className="field__label" htmlFor="budget">Budget range</label>
          <select
            id="budget"
            name="budget"
            className="field__input field__select"
            value={budget}
            onChange={e => setBudget(e.target.value)}
          >
            <option value="">Select a range</option>
            {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="service">What do you need?</label>
        <select
          id="service"
          name="service"
          className="field__input field__select"
          value={service}
          onChange={e => setService(e.target.value)}
        >
          <option value="">Select a starting point</option>
          {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
          <option value="Fractional CTO">Fractional CTO</option>
          <option value="Something else">Something else</option>
        </select>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="message">What&apos;s slowing you down?</label>
        <textarea
          id="message"
          name="message"
          className="field__textarea"
          required
          rows={6}
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="e.g. Our team spends 20 hours a week copying data between the CRM, spreadsheets, and invoices. It should be automatic."
        />
      </div>

      <div className="contact-form__footer">
        <button type="submit" className="btn btn-primary">
          Send project brief <span aria-hidden="true">→</span>
        </button>
        <p className="contact-form__note">
          This opens your email app with the details filled in.
        </p>
      </div>

      <div className="contact-form__direct">
        <span>
          Prefer to write directly? <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </span>
        <button
          type="button"
          className={`copy-brief${copyStatus === 'copied' ? ' is-copied' : ''}`}
          onClick={handleCopy}
          title="Copy your answers as an email-ready brief"
        >
          <span className="copy-brief__icon" aria-hidden="true">
            {copyStatus === 'copied' ? (
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="m3 8.5 3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <rect x="5.25" y="5.25" width="8" height="8.5" rx="1.4" stroke="currentColor" strokeWidth="1.2" />
                <path d="M10.75 5.25V4.4A1.4 1.4 0 0 0 9.35 3h-5.6A1.4 1.4 0 0 0 2.35 4.4v6.1a1.4 1.4 0 0 0 1.4 1.4h1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            )}
          </span>
          {copyStatus === 'copied'
            ? 'Copied'
            : copyStatus === 'error'
              ? 'Copy failed'
              : 'Copy brief'}
        </button>
        <span className="sr-only" role="status" aria-live="polite">
          {copyStatus === 'copied'
            ? 'Project brief copied to clipboard. Paste it into your email and fill in any missing details.'
            : copyStatus === 'error'
              ? 'Could not copy the project brief. Select the fields manually.'
              : ''}
        </span>
      </div>
    </form>
  )
}
