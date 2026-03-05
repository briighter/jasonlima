import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote/rsc'
import Image, { type ImageProps } from 'next/image'

/* ──────────────────────────────────────────────────
   CUSTOM MDX COMPONENTS
   Each maps a standard HTML element or custom tag
   to a styled React component. These get passed
   to <MDXRemote components={...} />.
────────────────────────────────────────────────── */

/* ── Callout block ────────────────────────────── */
interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'danger'
  title?: string
  children: React.ReactNode
}

const CALLOUT_STYLES: Record<NonNullable<CalloutProps['type']>, { bg: string; border: string; icon: string }> = {
  info:    { bg: 'rgba(59, 130, 246, 0.06)',  border: 'rgba(59, 130, 246, 0.3)',  icon: 'ℹ' },
  tip:     { bg: 'rgba(16, 185, 129, 0.06)', border: 'rgba(16, 185, 129, 0.3)', icon: '✦' },
  warning: { bg: 'rgba(245, 158, 11, 0.06)', border: 'rgba(245, 158, 11, 0.3)', icon: '⚠' },
  danger:  { bg: 'rgba(239, 68, 68, 0.06)',  border: 'rgba(239, 68, 68, 0.3)',  icon: '✕' },
}

function Callout({ type = 'info', title, children }: CalloutProps) {
  const s = CALLOUT_STYLES[type]
  return (
    <aside
      style={{
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderLeft: `3px solid ${s.border.replace('0.3', '0.8')}`,
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-4) var(--space-6)',
        marginBlock: '1.5em',
      }}
      role="note"
    >
      {title && (
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 'var(--weight-bold)',
            fontSize: 'var(--text-sm)',
            marginBottom: '0.5em',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span aria-hidden="true">{s.icon}</span>
          {title}
        </p>
      )}
      {children}
    </aside>
  )
}

/* ── Code block with syntax highlighting style ── */
function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        marginBlock: '1.5em',
      }}
    >
      {/* Tab bar decoration */}
      <div
        style={{
          background: 'var(--color-surface-2)',
          borderBottom: '1px solid var(--color-border)',
          padding: '8px 16px',
          display: 'flex',
          gap: '6px',
          alignItems: 'center',
        }}
        aria-hidden="true"
      >
        {['#FF5F57', '#FEBC2E', '#28C840'].map(color => (
          <span
            key={color}
            style={{ width: 10, height: 10, borderRadius: '50%', background: color, opacity: 0.6 }}
          />
        ))}
      </div>
      <pre
        style={{
          margin: 0,
          padding: 'var(--space-6)',
          overflowX: 'auto',
          fontSize: 'var(--text-sm)',
          lineHeight: 1.7,
        }}
      >
        {children}
      </pre>
    </div>
  )
}

/* ── Styled blockquote ────────────────────────── */
function Blockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      style={{
        position: 'relative',
        borderLeft: '3px solid var(--color-accent)',
        paddingLeft: 'var(--space-6)',
        paddingBlock: 'var(--space-2)',
        marginBlock: '1.5em',
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontSize: 'var(--text-lg)',
        color: 'var(--color-muted)',
        lineHeight: 'var(--leading-snug)',
      }}
    >
      {/* Decorative open-quote */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-8px',
          left: '12px',
          fontFamily: 'var(--font-display)',
          fontSize: '80px',
          lineHeight: 1,
          color: 'var(--color-accent)',
          opacity: 0.15,
          pointerEvents: 'none',
        }}
      >
        &ldquo;
      </span>
      {children}
    </blockquote>
  )
}

/* ── Post image with caption ──────────────────── */
function PostImage({
  src,
  alt,
  caption,
  width = 800,
  height = 450,
}: {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}) {
  return (
    <figure style={{ marginBlock: '2em' }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
        }}
      />
      {caption && (
        <figcaption
          style={{
            marginTop: 'var(--space-2)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-muted)',
            textAlign: 'center',
            fontStyle: 'italic',
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/* ── Map MDX elements to styled components ─────── */
const components = {
  // Custom components (used as JSX in MDX)
  Callout,
  CodeBlock,
  PostImage,

  // Override native HTML elements
  blockquote: Blockquote,
  pre: ({ children }: { children: React.ReactNode }) => <CodeBlock>{children}</CodeBlock>,

  // Styled anchor
  a: ({ href = '#', children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      style={{ color: 'var(--color-accent)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),

  // Styled img (for MDX images without PostImage)
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={props.alt ?? ''}
      style={{ borderRadius: 'var(--radius-md)', maxWidth: '100%', marginBlock: '1.5em' }}
    />
  ),
}

/* ──────────────────────────────────────────────────
   MDXContent — renders compiled MDX with custom components
   Uses next-mdx-remote/rsc (React Server Component)
────────────────────────────────────────────────── */
interface MDXContentProps {
  source: string
}

export default function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose">
      {/* @ts-expect-error — MDXRemote is a Server Component */}
      <MDXRemote source={source} components={components} />
    </div>
  )
}
