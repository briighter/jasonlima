interface SocialIconProps {
  icon: 'mail' | 'linkedin' | 'github' | 'x'
  size?: number
}

export default function SocialIcon({ icon, size = 18 }: SocialIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: 'false' as const,
  }

  if (icon === 'mail') {
    return (
      <svg {...common}>
        <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
        <path d="m3.5 6.5 8.5 6 8.5-6" />
      </svg>
    )
  }

  if (icon === 'linkedin') {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M7.5 10.5V17M7.5 7.5v.01M11.5 17v-3.6a2.4 2.4 0 0 1 4.8 0V17M11.5 10.5V17" />
      </svg>
    )
  }

  if (icon === 'github') {
    return (
      <svg {...common}>
        <path d="M9 19c-4.6 1.4-4.6-2.3-6.5-2.8M15 21v-3.4a3 3 0 0 0-.9-2.4c3-.3 6.2-1.5 6.2-6.7a5.2 5.2 0 0 0-1.4-3.6 4.9 4.9 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.7 12.7 0 0 0-6.6 0C6 1 4.9 1.3 4.9 1.3a4.9 4.9 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7a3 3 0 0 0-.9 2.4V21" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M4 4l16 16M20 4 4 20" />
    </svg>
  )
}
