export const PROFILE = {
  name: 'Waseeq Ahmed Ansari',
  short: 'Waseeq',
  role: 'Backend focused full stack engineer',
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
  { label: 'Email', href: `mailto:${PROFILE.email}` },
  { label: 'LinkedIn', href: PROFILE.linkedin },
  { label: 'GitHub', href: PROFILE.github },
]

export const SECTIONS = [
  { id: 'arrival', index: '01', label: 'Arrival' },
  { id: 'brief', index: '02', label: 'Brief' },
  { id: 'stack', index: '03', label: 'Stack' },
  { id: 'log', index: '04', label: 'Log' },
  { id: 'work', index: '05', label: 'Work' },
  { id: 'signal', index: '06', label: 'Signal' },
] as const

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
    copy: 'When the backend has to show up in a UI, a classroom, or a chat widget.',
    items: [
      'React, Next.js, Vite',
      'OpenAI and Gemini workflows',
      'Supabase-backed product features',
      'Cursor and Copilot as daily tools',
    ],
  },
]

export const EXPERIENCE = [
  {
    company: 'Botmer International (MindTech)',
    role: 'Backend Engineer',
    dates: 'Jan 2026 — Present',
    place: 'Karachi',
    tags: ['NestJS', 'gRPC', 'Prisma', 'SQS', 'OpenAI'],
    bullets: [
      'Stopped double-booking on the Senvers marketplace with atomic slot reservation, overlap checks, timezone validation, and transactional Prisma writes under concurrent load.',
      'Made provider notifications reliable with idempotent BOOKING_CREATED events over an SQS/outbox path, delivered across in-app, push, and email.',
      'Shipped JWT-secured match and profile APIs with ownership checks, filtering, sorting, and lifecycle status updates for seekers and providers.',
      'Expanded profile and jobs domains with skills/trust summaries, attachments, feed enrichment, and SQS-based file processing.',
      'Took owned job-service/BFF modules to 100% statement coverage and hardened CI through Docker Compose, LocalStack, and GitHub Actions.',
      'Worked directly with the Lima EdTech product team on AI syllabus parsing, vocabulary workshops, and assessment cooldowns using OpenAI/Gemini, Supabase, Redis, and S3.',
    ],
  },
  {
    company: 'Sleekhive Technologies',
    role: 'Backend Engineer',
    dates: 'Oct 2025 — Dec 2025',
    place: 'Karachi',
    tags: ['Node.js', 'BullMQ', 'WhatsApp', 'AWS EC2'],
    bullets: [
      'Built a SaaS workspace backend for website crawling and AI agent training, including an embeddable chat widget with AI replies and live-agent takeover.',
      'Moved crawling, ingestion, and agent-training workloads onto Redis/BullMQ so long-running jobs stay out of the request cycle.',
      'Shipped REST APIs for crawled sites, training data, agent configs, and customer workspaces.',
      'Shipped WhatsApp messaging through Baileys with Redis/BullMQ queues, running Node services on AWS EC2 under PM2.',
    ],
  },
  {
    company: 'SOC Solutions',
    role: 'Software Developer',
    dates: 'Sep 2023 — Aug 2025',
    place: 'Karachi',
    tags: ['Node.js', 'MongoDB', 'Stripe', 'Web3', 'Redis'],
    bullets: [
      'Worked on the production platform behind Portl — a nightlife and social discovery app for restaurants, beach clubs, events, guestlists, and tables.',
      'Scaled Web3 event platform APIs to reliably serve 17,000+ users across booking, personalized feed, and merchant/admin portals.',
      'Integrated fiat and crypto payments (Stripe, Apple Pay, Ethereum, Solana) with AWS Secrets Manager, Lambda, SQS, SNS, Redis, and S3.',
      'Cut payment processing time by about 20% with Stripe/PayPal integrations and Redis session caching on e-commerce APIs.',
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

export const PROJECTS = [
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
      'I worked on the backend of the live product: booking and feed paths, merchant/admin portals, and payment rails across Stripe, Apple Pay, Ethereum, and Solana. The app now runs in the UAE and Thailand, with 17,000+ users on the platform I helped keep standing.',
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
      'Vocabulary workshops, AI syllabus parsing, and teacher/student performance insights, built in direct coordination with the product owner.',
    details:
      'The models only mattered because they sat inside a real classroom workflow — parse a syllabus, run a workshop, respect assessment cooldowns.',
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
      'Workspace backend for crawling sites, training AI agents, and handing a chat from the model to a live person — including WhatsApp in production.',
    details:
      'Crawling, queues, and takeover had to coexist. The widget could answer, then a human could step in without dropping the thread.',
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
  },
]

export const TOUR_STEPS = [
  {
    id: 'arrival',
    title: 'Arrival',
    copy: 'This is the floor, not a launch pad. Start with who I am, then walk the systems I actually shipped.',
  },
  {
    id: 'brief',
    title: 'Brief',
    copy: 'Backend focused, full stack when it matters. Booking integrity, notifications that retry safely, and the UI on top when the product needs to ship end to end.',
  },
  {
    id: 'stack',
    title: 'Stack',
    copy: 'Grouped the way the work showed up: APIs, events, payments, and the AI features that had to live in a real product.',
  },
  {
    id: 'log',
    title: 'Log',
    copy: 'Three rooms. MindTech for Senvers and Lima. Sleekhive for agents. SOC Solutions for Portl, payments, and production load.',
  },
  {
    id: 'work',
    title: 'Work',
    copy: 'Portl is the live nightlife product. Senvers is the marketplace write-path. Lima is classroom AI. The FYP is the medical model.',
  },
  {
    id: 'signal',
    title: 'Signal',
    copy: 'If you need someone who can own a service, debug production, and still ship the UI when it matters, send the booking.',
  },
]
