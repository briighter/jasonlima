import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

/* ──────────────────────────────────────────────────
   POST /api/contact — owned form backend (no Formspree)
   Sends the inquiry to CONTACT_TO via Gmail SMTP.
   Env required (set in Vercel dashboard):
     GMAIL_USER          e.g. limalabsllc@gmail.com
     GMAIL_APP_PASSWORD  Google Account → Security → 2-Step → App passwords
     CONTACT_TO          e.g. limalabsllc@gmail.com (defaults to GMAIL_USER)
────────────────────────────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getTransporter() {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  if (!user || !pass) return null
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })
}

// Simple in-memory rate limit: 5 submissions / 10 min per IP.
// Note: resets on serverless cold start — enough to stop casual spam,
// pair with Vercel Attack Challenge / a honeypot for more.
const hits = new Map<string, number[]>()
function rateLimited(ip: string): boolean {
  const now = Date.now()
  const windowStart = now - 10 * 60 * 1000
  const recent = (hits.get(ip) ?? []).filter(t => t > windowStart)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 5
}

export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a few minutes.' },
      { status: 429 }
    )
  }

  let body: { name?: string; email?: string; service?: string; message?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const name = (body.name ?? '').trim().slice(0, 100)
  const email = (body.email ?? '').trim().slice(0, 200)
  const service = (body.service ?? '').trim().slice(0, 200)
  const message = (body.message ?? '').trim().slice(0, 5000)

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 }
    )
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: 'Please provide a valid email address.' },
      { status: 400 }
    )
  }

  const transporter = getTransporter()
  if (!transporter) {
    // Misconfigured server — tell the client to fall back to mailto
    // rather than silently dropping the lead.
    return NextResponse.json(
      { error: 'Email service not configured.', fallback: true },
      { status: 503 }
    )
  }

  const to = process.env.CONTACT_TO ?? process.env.GMAIL_USER!

  try {
    await transporter.sendMail({
      from: `"Lima Labs site" <${process.env.GMAIL_USER}>`,
      to,
      replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
      subject: `New inquiry — ${service || 'general'} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nNeed: ${service || '—'}\n\n${message}\n\n— sent from limalabs contact form (IP: ${ip})`,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('contact email failed:', err)
    return NextResponse.json(
      { error: 'Could not send. Please email directly.', fallback: true },
      { status: 502 }
    )
  }
}
