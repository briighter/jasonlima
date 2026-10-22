interface StarMarkProps {
  size?: number
  className?: string
  title?: string
}

const STAR_PATH =
  'M100 2 Q108 76 198 100 Q108 124 100 198 Q92 124 2 100 Q92 76 100 2 Z'

/* Four-point star built from flat colour layers — navy, gold, coral, white.
   Matches the brand mark used across the site. */
export default function StarMark({ size = 40, className, title }: StarMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <path d={STAR_PATH} fill="#213e63" />
      <path
        d={STAR_PATH}
        fill="#e8a53d"
        transform="translate(100 100) scale(.76) translate(-100 -100)"
      />
      <path
        d={STAR_PATH}
        fill="#e2543a"
        transform="translate(100 100) scale(.5) translate(-100 -100)"
      />
      <path
        d={STAR_PATH}
        fill="#ffffff"
        transform="translate(100 100) scale(.2) translate(-100 -100)"
      />
    </svg>
  )
}
