import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import '@/styles/globals.css'
import '@/styles/animations.css'

/* ──────────────────────────────────────────────────
   METADATA — inbound freelance positioning
────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: 'Jason Lima — Freelance Solutions Engineer | AI, Automation, Web & Mobile Apps',
    template: '%s | Jason Lima',
  },
  description:
    'I help small businesses save time and get more customers with practical tech: AI chatbots, workflow automation, custom web apps, mobile apps, and modern websites. Free diagnostic call — no jargon, no pressure.',
  metadataBase: new URL('https://briighter.github.io'),
  keywords: [
    'freelance solutions engineer',
    'AI automation for small business',
    'AI chatbot developer',
    'workflow automation',
    'custom web app developer',
    'mobile app developer for business',
    'small business website developer',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://briighter.github.io',
    siteName: 'Jason Lima — Lima Labs',
    title: 'Jason Lima — I fix expensive business problems with simple tech + AI',
    description:
      'AI chatbots, automations, web apps, mobile apps & websites for small businesses. Get a free fix assessment.',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Jason Lima — Freelance Solutions Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jason Lima — Freelance Solutions Engineer',
    description: 'AI, automation, web apps, mobile apps & websites that save time and win customers.',
    images: ['/images/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

/* ──────────────────────────────────────────────────
   DARK MODE SCRIPT — runs before hydration
────────────────────────────────────────────────── */
const darkModeScript = `
(function() {
  try {
    var stored = localStorage.getItem('color-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Jason Lima — Lima Labs',
  description:
    'Freelance solutions engineer building AI chatbots, workflow automations, custom web apps, mobile apps, and business websites for small businesses.',
  email: 'mailto:limalabsllc@gmail.com',
  sameAs: [
    'https://www.facebook.com/LimaLabsTech',
    'https://www.linkedin.com/in/jaylima0/',
    'https://github.com/briighter',
  ],
  areaServed: 'Worldwide',
  priceRange: '$$',
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI chatbots & support automation' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Workflow & process automation' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom web applications' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile apps for business' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Modern business websites' } },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: darkModeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Nav />
        <ScrollReveal />
        <main id="main-content" className="page-enter">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
