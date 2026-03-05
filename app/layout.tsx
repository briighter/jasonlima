import type { Metadata } from 'next'
import { Fraunces, DM_Sans } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import '@/styles/globals.css'
import '@/styles/animations.css'

/* ──────────────────────────────────────────────────
   FONT LOADING — zero layout shift via next/font
   Aesthetic: Refined Editorial
   Display: Fraunces (optical-size variable font, italic for emphasis)
   Body/UI: DM Sans (clean humanist grotesque)
────────────────────────────────────────────────── */
const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz', 'SOFT', 'WONK'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
})

/* ──────────────────────────────────────────────────
   METADATA — defaults; individual pages override
────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: 'Jason Lima — Software Engineer',
    template: '%s | Jason Lima',
  },
  description:
    'Software engineer, builder, and occasional writer. Work at the intersection of thoughtful engineering and clean product design.',
  metadataBase: new URL('https://briighter.github.io'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://briighter.github.io',
    siteName: 'Jason Lima',
    title: 'Jason Lima — Software Engineer',
    description:
      'Software engineer, builder, and occasional writer.',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Jason Lima — Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jason Lima — Software Engineer',
    description: 'Software engineer, builder, and occasional writer.',
    images: ['/images/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

/* ──────────────────────────────────────────────────
   DARK MODE SCRIPT
   Must run synchronously BEFORE React hydrates to
   prevent flash of wrong theme. Reads localStorage
   and sets data-theme on <html>.
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${dmSans.variable}`}
    >
      <head>
        {/* Synchronous dark mode — prevents FOUC */}
        <script dangerouslySetInnerHTML={{ __html: darkModeScript }} />
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
