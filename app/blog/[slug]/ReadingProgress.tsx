'use client'

import { useEffect, useState } from 'react'

/* ──────────────────────────────────────────────────
   Reading progress bar
   Thin accent-colored line at top of viewport.
   Width tracks scroll position through article.
────────────────────────────────────────────────── */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop    = window.scrollY || document.documentElement.scrollTop
      const docHeight    = document.documentElement.scrollHeight - window.innerHeight
      const pct          = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(Math.min(100, Math.max(0, pct)))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      className="reading-progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  )
}
