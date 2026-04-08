import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import '@/styles/globals.css'
import '@/styles/animations.css'

export const metadata: Metadata = {
  title: {
    default: 'Jason Lima — Software Engineer',
    template: '%s | Jason Lima',
  },
  description:
    'Software engineer, builder, and occasional writer. Work at the intersection of thoughtful engineering and clean product design.',
  metadataBase: new URL('https://jasonlima.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jasonlima.com',
    siteName: 'Jason Lima',
    title: 'Jason Lima — Software Engineer',
    description: 'Software engineer, builder, and occasional writer.',
  },
  robots: { index: true, follow: true },
}

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: darkModeScript }} />
      </head>
      <body>
        <Nav />
        <ScrollReveal />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

