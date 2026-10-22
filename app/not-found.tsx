import type { Metadata } from 'next'
import Link from 'next/link'
import StarMark from '@/components/StarMark'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'This page does not exist.',
}

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="container">
        <div className="not-found__inner">
          <StarMark size={54} />
          <span className="not-found__code" aria-hidden="true">404</span>
          <p className="eyebrow">Page not found</p>
          <h1 className="not-found__title">Nothing here.</h1>
          <p className="not-found__body">
            The page you&apos;re looking for doesn&apos;t exist or was moved. The work
            hasn&apos;t disappeared — it&apos;s just somewhere else.
          </p>
          <div className="not-found__actions">
            <Link href="/" className="btn btn-primary">
              Go home
            </Link>
            <Link href="/work" className="btn btn-ghost">
              See the work
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
