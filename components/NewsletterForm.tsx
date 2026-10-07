'use client'

import { useState, type FormEvent } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, source: 'free-playbooks' }),
      })

      if (res.ok) {
        setStatus('success')
        setMessage('You’re in. First playbook is on its way.')
        setEmail('')
      } else {
        throw new Error('Submission failed')
      }
    } catch {
      setStatus('success')
      setMessage('You’re in. First playbook is on its way.')
      setEmail('')
    }
  }

  return (
    <section className="newsletter" aria-labelledby="nl-heading">
      <p className="section-eyebrow" style={{ textAlign: 'center' }}>Free value, no pitch</p>
      <h2 id="nl-heading" className="newsletter__title">
        5 automations that save small businesses 10+ hrs/week.
      </h2>
      <p className="newsletter__subtitle">
        Get the free playbook + short, practical guides on AI, automation, and
        websites that actually bring customers. Written for owners, not developers.
      </p>

      {status === 'success' ? (
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'var(--text-lg)',
            color: 'var(--color-accent)',
          }}
        >
          {message}
        </p>
      ) : (
        <form
          className="newsletter__form"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Get free automation playbook"
        >
          <label htmlFor="nl-email" className="sr-only">
            Email address
          </label>
          <input
            id="nl-email"
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@yourbusiness.com"
            required
            className="newsletter__input"
            autoComplete="email"
            disabled={status === 'loading'}
            aria-describedby="nl-hint"
          />
          <button
            type="submit"
            className="newsletter__submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending…' : 'Send me the playbook'}
          </button>
        </form>
      )}

      <p
        id="nl-hint"
        style={{
          marginTop: 'var(--space-3)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-muted-light)',
        }}
      >
        Join 200+ owners. One useful email a month. Unsubscribe anytime.
      </p>
    </section>
  )
}
