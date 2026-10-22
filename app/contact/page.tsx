import type { Metadata } from 'next'
import StarMark from '@/components/StarMark'
import SocialIcon from '@/components/SocialIcon'
import ContactForm from '@/components/ContactForm'
import { SOCIALS, SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Start a project',
  description:
    'Tell me what is slowing your business down. Free 30-minute automation review, fixed-scope proposal, and a clear ROI before any code is written.',
}

const NEXT_STEPS = [
  {
    num: '01',
    title: 'I reply within one business day',
    body: 'A real response from me — not a sales sequence.',
  },
  {
    num: '02',
    title: 'Free 30-minute workflow review',
    body: 'We find the two or three places automation would actually move the needle.',
  },
  {
    num: '03',
    title: 'A fixed-scope proposal',
    body: 'What gets built, what it costs, what it saves, and when it ships. Then you decide.',
  },
]

export default function ContactPage() {
  return (
    <div className="contact-page">
      <header className="page-header">
        <div className="container">
          <div className="page-header__inner">
            <span className="eyebrow">
              <StarMark size={11} />
              Start a project
            </span>
            <h1 className="page-header__title">
              Tell me what&apos;s{' '}
              <span className="text-accent">slowing you down.</span>
            </h1>
            <p className="page-header__lead">
              A two-minute brief is enough. If there&apos;s a clear automation win, I&apos;ll
              show you the math. If there isn&apos;t, I&apos;ll tell you that too.
            </p>
            <div className="page-header__meta">
              <span className="status-pill">
                <span className="status-pill__dot" aria-hidden="true" />
                {SITE.availability}
              </span>
              <span className="page-header__meta-item">Replies within 1 business day</span>
              <span className="page-header__meta-item">Fixed-scope proposals</span>
            </div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-wrap">
              <div className="contact-form-head">
                <span className="mono-label">Project brief</span>
                <h2>What are we fixing?</h2>
                <p>
                  The more concrete you are about the manual work, the more useful my
                  first reply will be.
                </p>
              </div>
              <ContactForm />
            </div>

            <aside className="contact-aside">
              <div className="contact-card contact-card--ink">
                <span className="mono-label mono-label--light">Direct line</span>
                <a href={`mailto:${SITE.email}`} className="contact-card__email">
                  {SITE.email}
                </a>
                <p>No gatekeepers, no forms disappearing into a CRM. It comes to me.</p>
                <a
                  href={`mailto:${SITE.email}?subject=${encodeURIComponent('Intro call')}`}
                  className="btn btn-light"
                >
                  Book a free intro call
                  <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="contact-card">
                <h2 className="contact-card__title">Find me elsewhere</h2>
                <div className="contact-socials">
                  {SOCIALS.map(({ label, href, value, icon }) => (
                    <a
                      key={href}
                      href={href}
                      className="contact-social"
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      <span className="contact-social__icon">
                        <SocialIcon icon={icon} size={17} />
                      </span>
                      <span className="contact-social__body">
                        <span className="contact-social__label">{label}</span>
                        <span className="contact-social__value">{value}</span>
                      </span>
                      <span className="contact-social__arrow" aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="contact-card">
                <h2 className="contact-card__title">What happens next</h2>
                <ol className="next-steps" role="list">
                  {NEXT_STEPS.map(step => (
                    <li key={step.num} className="next-step">
                      <span className="next-step__num">{step.num}</span>
                      <div>
                        <h3>{step.title}</h3>
                        <p>{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
