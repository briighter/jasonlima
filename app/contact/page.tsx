import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

/* ──────────────────────────────────────────────────
   Contact — server component
   Exports metadata; delegates interactivity to
   ContactForm (client component).
────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch — open to interesting conversations about engineering, collaboration, and the craft of building software.',
}

export default function ContactPage() {
  return <ContactForm />
}

