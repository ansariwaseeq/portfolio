export const PROFILE = {
  name: 'Waseeq Ahmed Ansari',
  short: 'Waseeq',
  role: 'Backend focused full stack engineer',
  availability: 'Open to roles · Remote / Karachi / International',
  location: 'Karachi, Pakistan',
  email: 'ansariwaseeq5@gmail.com',
  phone: '+92 312 8757721',
  github: 'https://github.com/ansariwaseeq',
  linkedin: 'https://linkedin.com/in/waseeq-ansari08',
  resume: '/Waseeq_Ansari_SE.pdf',
  summary:
    'Full-stack engineer with a backend core — NestJS, Node, PostgreSQL, and AWS — who also ships the React/Next.js interface when the product needs to land end to end. About three years across four teams: bookings that cannot double-lock, notifications that survive retries, payments that settle in fiat and on-chain, and AI features that sit inside real workflows.',
}

export const LINKS = [
  { label: 'LinkedIn', href: PROFILE.linkedin },
  { label: 'GitHub', href: PROFILE.github },
  { label: 'Resume (PDF)', href: PROFILE.resume },
]

export const SECTIONS = [
  { id: 'arrival', index: '01', label: 'Arrival', plain: 'Home' },
  { id: 'brief', index: '02', label: 'Brief', plain: 'About' },
  { id: 'stack', index: '03', label: 'Stack', plain: 'Skills' },
  { id: 'log', index: '04', label: 'Log', plain: 'Experience' },
  { id: 'work', index: '05', label: 'Work', plain: 'Projects' },
  { id: 'signal', index: '06', label: 'Signal', plain: 'Contact' },
] as const

export type SectionId = (typeof SECTIONS)[number]['id']

export const STATS = [
  { value: '3 yrs', label: 'production work' },
  { value: '68k+', label: 'users on Portl' },
  { value: '100%', label: 'coverage on owned modules' },
  { value: '90%+', label: 'TB detection accuracy' },
]

export const TICKER = [
  'SENVERS · slot reserved without overlap',
  'PORTL · table request queued for tonight',
  'LIMA · syllabus parsed with Gemini',
  'OUTBOX · BOOKING_CREATED delivered once',
  'PAYMENTS · Stripe + Solana settled',
  'SLEEKHIVE · live-agent takeover on WhatsApp',
  'CI · job-service statement coverage 100%',
  'MATCH · seeker/provider ownership checks passed',
]

export const MAP_NODES = [
  {
    id: 'karachi',
    x: 320,
    y: 78,
    label: 'Karachi',
    sub: 'base',
    title: 'Home base',
    metric: '3 yrs · 4 teams',
    body: 'Where I build from. Backend focused full stack, remote-friendly, on PKT (UTC+5).',
    stack: ['NestJS', 'React', 'AWS'],
  },
  {
    id: 'portl',
    x: 470,
    y: 168,
    label: 'Portl',
    sub: '68k+ users',
    title: 'Portl · nightlife app',
    metric: '68k+ users',
    body: 'Booking, feed, merchant portals, and payment rails for a live product in the UAE and Thailand.',
    stack: ['Node.js', 'MongoDB', 'Stripe', 'Solana'],
  },
  {
    id: 'senvers',
    x: 168,
    y: 176,
    label: 'Senvers',
    sub: 'slot lock',
    title: 'Senvers · marketplace',
    metric: 'atomic booking',
    body: 'A seeker/provider marketplace where two people can never take the same slot.',
    stack: ['NestJS', 'gRPC', 'Prisma', 'PostgreSQL'],
  },
  {
    id: 'lima',
    x: 250,
    y: 312,
    label: 'Lima',
    sub: 'syllabus AI',
    title: 'Lima · EdTech AI',
    metric: 'OpenAI + Gemini',
    body: 'AI syllabus parsing, vocabulary workshops, and assessment cooldowns for real classrooms.',
    stack: ['React', 'Supabase', 'Gemini'],
  },
  {
    id: 'pay',
    x: 456,
    y: 318,
    label: 'Payments',
    sub: 'fiat + chain',
    title: 'Payment rails',
    metric: '~20% faster',
    body: 'Stripe, Apple Pay, PayPal, Ethereum, and Solana, with credentials kept in AWS Secrets Manager.',
    stack: ['Stripe', 'Solana', 'Lambda'],
  },
  {
    id: 'outbox',
    x: 140,
    y: 400,
    label: 'Outbox',
    sub: 'SQS once',
    title: 'Outbox notifications',
    metric: 'idempotent',
    body: 'BOOKING_CREATED events delivered once to in-app, push, and email, even when a retry fires.',
    stack: ['SQS', 'PostgreSQL', 'SNS'],
  },
]

export const BRING = [
  'Transactional booking and marketplace APIs that stay honest under concurrent load',
  'Event-driven notifications with SQS/outbox and idempotent delivery',
  'Fiat and crypto payment rails wired through AWS, not leftover secrets in code',
  'Production debugging with merchants, product owners, and CI that actually fails closed',
]

export const NEXT = [
  'Teams where backend quality is a product feature, not a cleanup ticket',
  'Marketplaces, bookings, and messaging systems that cannot afford silent failure',
  'AI features that sit inside a real workflow, not a demo chat window',
  'Ownership of services from schema to incident to the next release',
]

export const STACK = [
  {
    title: 'Booking & APIs',
    icon: 'api',
    copy: 'The floor people actually stand on. Service boundaries, auth, and the write path.',
    items: [
      'NestJS, Node.js, TypeScript',
      'REST and gRPC services',
      'JWT auth, ownership, lifecycle checks',
      'Atomic slot reservation with Prisma',
    ],
  },
  {
    title: 'Events & Data',
    icon: 'events',
    copy: 'What happens after the request returns. Queues, caches, and the source of truth.',
    items: [
      'PostgreSQL, Prisma, MongoDB, Redis',
      'SQS outbox and idempotent events',
      'BullMQ, SNS, S3 file processing',
      'Nx monorepos and BFF modules',
    ],
  },
  {
    title: 'Payments & Cloud',
    icon: 'payments',
    copy: 'Money and credentials moving through production, not a local .env file.',
    items: [
      'Stripe, PayPal, Apple Pay',
      'Ethereum and Solana rails',
      'AWS Lambda, SQS, SNS, EC2, S3',
      'Secrets Manager, Docker, GitHub Actions',
    ],
  },
  {
    title: 'Product & AI',
    icon: 'ai',
    copy: 'When the backend has to show up in a UI, a classroom, or a chat widget.',
    items: [
      'React, Next.js, Vite',
      'OpenAI and Gemini workflows',
      'Supabase-backed product features',
      'Cursor and Copilot as daily tools',
    ],
  },
] as const

export const EXPERIENCE = [
  {
    company: 'Botmer International (MindTech)',
    role: 'Backend Engineer',
    dates: 'Jan 2026 — Present',
    place: 'Karachi',
    current: true,
    impact:
      'Own the booking, matching, and notification write paths for the Senvers marketplace, plus AI features for Lima EdTech.',
    tags: ['NestJS', 'gRPC', 'Prisma', 'SQS', 'OpenAI'],
    bullets: [
      'Ended double-booking with atomic slot reservation, overlap checks, and Prisma transactions.',
      'Idempotent BOOKING_CREATED events over SQS/outbox to in-app, push, and email.',
      'JWT-secured match and profile APIs with ownership and lifecycle checks.',
      'Profile and jobs features: trust summaries, feed enrichment, SQS file processing.',
      '100% statement coverage on owned modules, enforced in Docker Compose, LocalStack, and GitHub Actions.',
      'Lima EdTech: AI syllabus parsing, vocabulary workshops, and assessment cooldowns with OpenAI/Gemini.',
    ],
  },
  {
    company: 'Sleekhive Technologies',
    role: 'Backend Engineer',
    dates: 'Oct 2025 — Dec 2025',
    place: 'Karachi',
    current: false,
    impact:
      'Built the backend for an AI-agent SaaS: crawl a site, train an agent, embed it, and hand off to a human.',
    tags: ['Node.js', 'BullMQ', 'WhatsApp', 'AWS EC2'],
    bullets: [
      'Embeddable chat widget with AI replies and live-agent takeover.',
      'Crawling, ingestion, and training moved onto Redis/BullMQ so APIs stay responsive.',
      'REST APIs for crawled sites, training data, agent configs, and workspaces.',
      'WhatsApp messaging via Baileys and BullMQ, running on AWS EC2 under PM2.',
    ],
  },
  {
    company: 'SOC Solutions',
    role: 'Software Developer',
    dates: 'Sep 2023 — Aug 2025',
    place: 'Karachi',
    current: false,
    impact: 'Kept Portl’s booking, feed, and payment backend standing for 68k+ users.',
    tags: ['Node.js', 'MongoDB', 'Stripe', 'Web3', 'Redis'],
    bullets: [
      'Scaled Node/Express/MongoDB APIs for booking, personalized feed, and merchant/admin portals.',
      'Fiat and crypto payments: Stripe, Apple Pay, Ethereum, Solana, secured with AWS Secrets Manager.',
      'Async payment workflows on Lambda, SQS, SNS, Redis, and S3.',
      'About 20% faster payment processing with Stripe/PayPal and Redis session caching.',
    ],
  },
]

export const EDUCATION = {
  school: 'FAST-NUCES',
  full: 'National University of Computer and Emerging Sciences (FAST-NUCES)',
  degree: 'B.Sc. in Computer Science',
  dates: 'Aug 2019 — Dec 2023',
  place: 'Karachi',
}

export type FlowStep = { label: string; sub: string }

export type Project = {
  id: string
  featured: boolean
  name: string
  kicker: string
  href: string | null
  hrefLabel: string | null
  stack: string[]
  blurb: string
  details: string
  flow: FlowStep[]
}

export const PROJECTS: Project[] = [
  {
    id: 'portl',
    featured: true,
    name: 'Portl',
    kicker: 'SOC Solutions · live product',
    href: 'https://portl.club',
    hrefLabel: 'portl.club',
    stack: ['Node.js', 'Express', 'MongoDB', 'AWS', 'Stripe', 'Solana'],
    blurb:
      'Find the places, plans and people worth going out for. Discover restaurants, beach clubs, nightlife and events. Join guestlists, book tables and see who’s going.',
    details:
      'I worked on the backend of the live product: booking and feed paths, merchant/admin portals, and payment rails across Stripe, Apple Pay, Ethereum, and Solana. The app runs in the UAE and Thailand, with 68k+ users on the platform I helped keep standing.',
    flow: [
      { label: 'Mobile app', sub: 'iOS · Android' },
      { label: 'API', sub: 'Node · Express' },
      { label: 'Booking + feed', sub: 'MongoDB' },
      { label: 'Payments', sub: 'Stripe · Solana' },
      { label: 'Merchant portal', sub: 'admin' },
    ],
  },
  {
    id: 'senvers',
    featured: false,
    name: 'Senvers Backend',
    kicker: 'MindTech · marketplace',
    href: null,
    hrefLabel: null,
    stack: ['NestJS', 'gRPC', 'Prisma', 'PostgreSQL', 'SQS', 'Docker', 'Nx'],
    blurb:
      'Booking, match, profile, and jobs APIs for a service marketplace — with JWT-secured endpoints, outbox notifications, and 100% coverage on critical modules.',
    details:
      'The hard part was correctness: atomic slot reservation so two seekers cannot take the same time, then an outbox so the provider still hears about it once.',
    flow: [
      { label: 'Request', sub: 'book slot' },
      { label: 'Slot lock', sub: 'overlap check' },
      { label: 'Prisma tx', sub: 'PostgreSQL' },
      { label: 'Outbox', sub: 'BOOKING_CREATED' },
      { label: 'SQS', sub: 'queue' },
      { label: 'Notify', sub: 'push · email' },
    ],
  },
  {
    id: 'lima',
    featured: false,
    name: 'Lima EdTech',
    kicker: 'MindTech · AI product',
    href: null,
    hrefLabel: null,
    stack: ['React', 'TypeScript', 'Express', 'Supabase', 'OpenAI', 'Gemini'],
    blurb:
      'Vocabulary workshops, AI syllabus parsing, and teacher/student performance insights, built with the product owner.',
    details:
      'The models only mattered because they sat inside a real classroom workflow — parse a syllabus, run a workshop, respect assessment cooldowns.',
    flow: [
      { label: 'Syllabus', sub: 'upload' },
      { label: 'Gemini parse', sub: 'structure' },
      { label: 'Workshops', sub: 'vocabulary' },
      { label: 'Cooldowns', sub: 'assessments' },
      { label: 'Insights', sub: 'teacher view' },
    ],
  },
  {
    id: 'sleekhive',
    featured: false,
    name: 'Sleekhive Agents',
    kicker: 'SaaS · messaging',
    href: null,
    hrefLabel: null,
    stack: ['Node.js', 'Redis', 'BullMQ', 'Baileys', 'PM2'],
    blurb:
      'Workspace backend for crawling sites, training AI agents, and handing a chat from the model to a live person — including WhatsApp.',
    details:
      'Crawling, queues, and takeover had to coexist. The widget could answer, then a human could step in without dropping the thread.',
    flow: [
      { label: 'Crawl', sub: 'website' },
      { label: 'BullMQ', sub: 'jobs' },
      { label: 'Train agent', sub: 'ingest' },
      { label: 'Widget', sub: 'AI replies' },
      { label: 'Live agent', sub: 'takeover' },
    ],
  },
  {
    id: 'tb',
    featured: false,
    name: 'TB Detection FYP',
    kicker: 'FAST-NUCES · research',
    href: null,
    hrefLabel: null,
    stack: ['Python', 'PyTorch', 'CNN'],
    blurb:
      'Trained CNN models on chest X-rays with 90%+ classification accuracy for tuberculosis detection.',
    details:
      'A final-year project with a clear metric: can the model read a chest film well enough to be useful in screening, not just in a notebook.',
    flow: [
      { label: 'Chest X-ray', sub: 'input' },
      { label: 'Preprocess', sub: 'normalize' },
      { label: 'CNN', sub: 'PyTorch' },
      { label: 'Result', sub: '90%+ accuracy' },
    ],
  },
]

export type TourStep = {
  id: SectionId
  room: string
  target: string
  caption: string
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'arrival',
    room: 'The door',
    target: '.map-wrap',
    caption: 'Hover a node. The city is my stack, and Portl is where the night started.',
  },
  {
    id: 'brief',
    room: 'The bar',
    target: '.pull',
    caption: 'Pull up a stool. Backend first, and the UI on top when the product has to ship end to end.',
  },
  {
    id: 'stack',
    room: 'The kitchen',
    target: '.stack-tile.is-lead',
    caption: 'Where the orders get made: service boundaries, auth, and a write path that never double-books.',
  },
  {
    id: 'log',
    room: 'The guest book',
    target: '.timeline-item.is-current',
    caption: 'Signed in at MindTech right now, after Sleekhive and two years keeping Portl standing.',
  },
  {
    id: 'work',
    room: 'The main floor',
    target: '#work .flow',
    caption: 'Portl, end to end: app, API, bookings, payments, and the merchant portal for 68k+ guests.',
  },
  {
    id: 'signal',
    room: 'Last call',
    target: '.signal-panel',
    caption: 'The bar is still open. Send the booking and I will answer the signal.',
  },
]
