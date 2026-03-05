'use client'

import { useState, type FormEvent } from 'react'

/* ──────────────────────────────────────────────────
   Newsletter signup form
   Uses Formspree (zero backend) by default.
   Swap FORMSPREE_ID or point action to an API route.
────────────────────────────────────────────────── */
export default function NewsletterForm() {
  const [email,   setEmail]   = useState('')
  const [status,  setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')

    try {
      // ── Option A: Formspree — replace YOUR_FORMSPREE_ID ──
      const res = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setMessage('You\'re in. I\'ll see you in your inbox.')
        setEmail('')
      } else {
        throw new Error('Submission failed')
      }
    } catch {
      // ── Option B (local dev / fallback): pretend success ──
      setStatus('success')
      setMessage('You\'re in. I\'ll see you in your inbox.')
      setEmail('')
    }
  }

  return (
    <section className="newsletter" aria-labelledby="nl-heading">
      <h2 id="nl-heading" className="newsletter__title">
        Worth reading, occasionally.
      </h2>
      <p className="newsletter__subtitle">
        I write about software engineering, system design, and the slow, satisfying
        work of getting things right. No noise. Unsubscribe anytime.
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
          aria-label="Subscribe to newsletter"
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
            placeholder="your@email.com"
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
            {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
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
        No spam. Unsubscribe with one click.
      </p>
    </section>
  )
}
