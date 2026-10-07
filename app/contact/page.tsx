import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Get a Free Fix Assessment — Contact Jason Lima',
  description:
    'Tell me what is costing you time or customers. Free 20-min diagnostic call, reply within 1 business day. Email limalabsllc@gmail.com or message Lima Labs on Facebook.',
}

export default function ContactPage() {
  return <ContactForm />
}
