import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

/* ──────────────────────────────────────────────────
   POST /api/subscribe — playbook / newsletter signup
   Notifies you of the new subscriber, then you reply
   with the playbook (or wire an autoresponder later).
   Same env as /api/contact: GMAIL_USER, GMAIL_APP_PASSWORD.
────────────────────────────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  let body: { email?: string; source?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const email = (body.email ?? '').trim().slice(0, 200)
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: 'Please provide a valid email address.' },
      { status: 400 }
    )
  }

  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  if (!user || !pass) {
    // No backend configured (e.g. local dev without .env):
    // accept the signup on the client so UX stays smooth,
    // but log it server-side for visibility.
    console.log(`[subscribe] ${email} (source: ${body.source ?? 'unknown'}) — no SMTP configured`)
    return NextResponse.json({ ok: true, delivered: false })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    })
    await transporter.sendMail({
      from: `"Lima Labs site" <${user}>`,
      to: process.env.CONTACT_TO ?? user,
      subject: `New playbook subscriber — ${email}`,
      text: `New signup from the site.\n\nEmail: ${email}\nSource: ${body.source ?? 'newsletter'}\n\nReply with the 5-automations playbook.`,
    })
    return NextResponse.json({ ok: true, delivered: true })
  } catch (err) {
    console.error('subscribe email failed:', err)
    return NextResponse.json(
      { error: 'Signup failed. Please email directly.' },
      { status: 502 }
    )
  }
}
