import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'This page does not exist.',
}

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="container">
        <div className="not-found__inner">
          <span className="not-found__code" aria-hidden="true">404</span>
          <p className="section-eyebrow">Page not found</p>
          <h1 className="not-found__title">
            Nothing here.
          </h1>
          <p className="not-found__body">
            The page you&apos;re looking for doesn&apos;t exist or was moved.
          </p>
          <div className="not-found__actions">
            <Link href="/" className="btn btn-primary">
              Go home
            </Link>
            <Link href="/blog" className="btn btn-ghost">
              Read the blog
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
