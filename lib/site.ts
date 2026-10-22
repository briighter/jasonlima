/* ──────────────────────────────────────────────────
   Site-wide content: identity, socials, offers
   Edit prices / copy here and it updates everywhere.
────────────────────────────────────────────────── */

export const SITE = {
  name: 'Jason Lima',
  role: 'Freelance Software Engineer & Fractional CTO',
  email: 'jason@jasonlima.com',
  location: 'Connecticut, USA — working remotely',
  availability: 'Available for new projects',
  description:
    'Freelance software engineer and fractional CTO. I build automations, internal tools, web apps, and mobile apps that erase repetitive work and pay for themselves.',
}

export interface SocialLink {
  label: string
  value: string
  href: string
  icon: 'mail' | 'linkedin' | 'github' | 'x'
}

export const SOCIALS: SocialLink[] = [
  {
    label: 'Email',
    value: 'jason@jasonlima.com',
    href: 'mailto:jason@jasonlima.com',
    icon: 'mail',
  },
  {
    label: 'LinkedIn',
    value: 'in/jaylima0',
    href: 'https://www.linkedin.com/in/jaylima0/',
    icon: 'linkedin',
  },
  {
    label: 'GitHub',
    value: '@briighter',
    href: 'https://github.com/briighter',
    icon: 'github',
  },
  {
    label: 'X / Twitter',
    value: '@realjasonlima',
    href: 'https://twitter.com/realjasonlima',
    icon: 'x',
  },
]

export interface Service {
  num: string
  title: string
  tagline: string
  description: string
  price: string
  timeline: string
  bullets: string[]
  accent: 'navy' | 'gold' | 'coral'
}

export const SERVICES: Service[] = [
  {
    num: '01',
    title: 'Automation Audit',
    tagline: 'Find the hours before you spend the money.',
    description:
      'A one-week teardown of how work actually moves through your business. I map the repetitive tasks, quantify what they cost, and rank what is worth automating first.',
    price: '$1,500 fixed',
    timeline: '5 days',
    bullets: [
      'Workflow and systems map',
      'Hours and cost baseline',
      'ROI-ranked automation roadmap',
    ],
    accent: 'navy',
  },
  {
    num: '02',
    title: 'Workflow Automation',
    tagline: 'Manual work, deleted.',
    description:
      'I replace spreadsheets, inboxes, and copy-paste with a monitored pipeline. Invoices, onboarding, reporting, data sync — running quietly in the background.',
    price: 'From $5,000',
    timeline: '2–4 weeks',
    bullets: [
      'Trigger → process → outcome pipeline',
      'Error handling and alerts',
      'Documentation and handoff',
    ],
    accent: 'coral',
  },
  {
    num: '03',
    title: 'Internal Tools & Dashboards',
    tagline: 'One place for the work in eleven tabs.',
    description:
      'Ops dashboards, admin panels, and client portals built around your actual process — not a generic template with your logo taped to it.',
    price: 'From $8,000',
    timeline: '3–5 weeks',
    bullets: [
      'Custom admin and ops interface',
      'Role-based access',
      'Live data, exports, audit trail',
    ],
    accent: 'gold',
  },
  {
    num: '04',
    title: 'Full-Stack Web App',
    tagline: 'From data model to production.',
    description:
      'A complete product: auth, payments, database, API, interface, deployment. Built to ship and stay shipped — not to impress you in a demo.',
    price: 'From $15,000',
    timeline: '4–8 weeks',
    bullets: [
      'Next.js, Node, PostgreSQL',
      'Auth and billing',
      'Deploy, monitor, document',
    ],
    accent: 'navy',
  },
  {
    num: '05',
    title: 'Mobile & Cross-Platform',
    tagline: 'One codebase. Two stores.',
    description:
      'iOS and Android apps with React Native and Expo. Native feel, shared logic, and a path all the way through App Store review.',
    price: 'From $20,000',
    timeline: '6–10 weeks',
    bullets: [
      'Expo / React Native',
      'Offline-first data',
      'Store submission support',
    ],
    accent: 'coral',
  },
  {
    num: '06',
    title: 'Systems Analysis & Redesign',
    tagline: 'Rebuild the system around the business.',
    description:
      'I audit your information system, find the friction, and redesign the architecture and flows around how your team actually works.',
    price: 'From $10,000',
    timeline: '3–6 weeks',
    bullets: [
      'Current-state audit',
      'Target architecture',
      'Migration and rollout plan',
    ],
    accent: 'gold',
  },
]

export const PROCESS = [
  {
    num: '01',
    title: 'Diagnose',
    body: 'A free 30-minute call and workflow review. I ask what eats your week. You leave with two or three automation candidates — whether or not we work together.',
  },
  {
    num: '02',
    title: 'Blueprint',
    body: 'A one-page plan: what gets built, what it replaces, what it saves, and when it ships. Fixed scope, fixed price. No hourly surprises.',
  },
  {
    num: '03',
    title: 'Build',
    body: 'Small increments and weekly demos. You test working software while it is being built, not a surprise at the end.',
  },
  {
    num: '04',
    title: 'Handoff',
    body: 'You own the code, the accounts, and the process. Documentation, a walkthrough, and 30 days of post-launch support are included.',
  },
]

export const STATS = [
  { value: '6+', label: 'Years in enterprise software' },
  { value: '20+', label: 'Products and tools shipped' },
  { value: '100%', label: 'Fixed-scope engagements' },
  { value: '30', label: 'Days of post-launch support' },
]
