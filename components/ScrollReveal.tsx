'use client'

import { useEffect } from 'react'

/* ──────────────────────────────────────────────────
   ScrollReveal
   Attaches IntersectionObserver to all .reveal and
   .bento-appear elements on the page, adding
   .in-view when they enter the viewport.

   Used as a global effect in the root layout so it
   works across all pages without needing to be
   included per-page.
────────────────────────────────────────────────── */
export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            // Once revealed, stop observing (animation fires once)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -48px 0px',
      }
    )

    const observe = () => {
      document.querySelectorAll('.reveal, .bento-appear').forEach(el => {
        // Only observe elements that haven't already animated
        if (!el.classList.contains('in-view')) {
          observer.observe(el)
        }
      })
    }

    // Initial observation
    observe()

    // Re-observe after route changes (Next.js App Router)
    // Using MutationObserver to watch for new .reveal elements
    const mutObs = new MutationObserver(observe)
    mutObs.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutObs.disconnect()
    }
  }, [])

  return null // No rendered output
}
