import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact — Jason Lima',
  description:
    'Get in touch — open to interesting conversations about engineering, collaboration, and the craft of building software.',
}

export default function ContactPage() {
  return <ContactForm />
}

