import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import { SITE, SOCIALS } from '@/lib/site'
import '@/styles/globals.css'
import '@/styles/animations.css'

export const metadata: Metadata = {
  title: {
    default: 'Jason Lima — Freelance Software Engineer & Fractional CTO',
    template: '%s | Jason Lima',
  },
  description: SITE.description,
  metadataBase: new URL('https://jasonlima.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jasonlima.com',
    siteName: 'Jason Lima',
    title: 'Jason Lima — Freelance Software Engineer & Fractional CTO',
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@realjasonlima',
    title: 'Jason Lima — Freelance Software Engineer & Fractional CTO',
    description: SITE.description,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Jason Lima — Freelance Software Engineer & Fractional CTO',
  url: 'https://jasonlima.com',
  email: SITE.email,
  description: SITE.description,
  areaServed: 'Worldwide',
  founder: {
    '@type': 'Person',
    name: 'Jason Lima',
    jobTitle: 'Freelance Software Engineer & Fractional CTO',
    sameAs: SOCIALS.filter(s => s.href.startsWith('http')).map(s => s.href),
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Nav />
        <ScrollReveal />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  )
}
