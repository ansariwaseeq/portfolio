import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import CountUp from './components/CountUp'
import FlowDiagram from './components/FlowDiagram'
import { GitHubIcon, LinkedInIcon, MailIcon, StackIcon } from './components/Icons'
import NightMap from './components/NightMap'
import PortlStage from './components/PortlStage'
import TourDock from './components/TourDock'
import TourRoute from './components/TourRoute'
import TourSpotlight from './components/TourSpotlight'
import TourTicket from './components/TourTicket'
import {
  BRING,
  EDUCATION,
  EXPERIENCE,
  LINKS,
  NEXT,
  PROFILE,
  PROJECTS,
  SECTIONS,
  STACK,
  STATS,
  TICKER,
  TOUR_STEPS,
} from './data'
import type { SectionId } from './data'
import { usePrefersReducedMotion, useReveal } from './hooks'

function karachiClock(now = new Date()) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Karachi',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now)
}

function kicker(id: SectionId) {
  const section = SECTIONS.find((item) => item.id === id)!
  return `${section.index} · ${section.label} / ${section.plain}`
}

const delay = (index: number) => ({ '--d': `${index * 90}ms` }) as CSSProperties

export default function App() {
  const [active, setActive] = useState<SectionId>('arrival')
  const [tourPhase, setTourPhase] = useState<'off' | 'ticket' | 'rooms'>('off')
  const [tourStep, setTourStep] = useState(0)
  const [visited, setVisited] = useState<Set<number>>(() => new Set())
  const [autoplay, setAutoplay] = useState(false)
  const [holding, setHolding] = useState(false)
  const triggerRef = useRef<HTMLElement | null>(null)
  const dockRef = useRef<HTMLElement>(null)
  const [clock, setClock] = useState(() => karachiClock())
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const reduced = usePrefersReducedMotion()

  useReveal()

  const showStep = useCallback(
    (index: number) => {
      const step = TOUR_STEPS[index]
      const target = document.querySelector(step.target) ?? document.getElementById(step.id)
      if (target) {
        const rect = target.getBoundingClientRect()
        const offset = Math.max(96, window.innerHeight * 0.4 - rect.height / 2)
        window.scrollTo({
          top: Math.max(0, rect.top + window.scrollY - offset),
          behavior: reduced ? 'auto' : 'smooth',
        })
      }
      setActive(step.id)
      setTourStep(index)
      setVisited((current) => (current.has(index) ? current : new Set(current).add(index)))
    },
    [reduced],
  )

  const startTour = () => {
    if (tourPhase === 'off') triggerRef.current = document.activeElement as HTMLElement | null
    setVisited(new Set())
    setAutoplay(false)
    setHolding(false)
    setTourStep(0)
    setTourPhase('ticket')
  }

  const enterRooms = useCallback(() => {
    setTourPhase('rooms')
    showStep(0)
  }, [showStep])

  const closeTour = useCallback(() => {
    setTourPhase('off')
    setAutoplay(false)
    setHolding(false)
    triggerRef.current?.focus({ preventScroll: true })
  }, [])

  const nextStep = useCallback(() => {
    if (tourStep < TOUR_STEPS.length - 1) showStep(tourStep + 1)
  }, [tourStep, showStep])

  const prevStep = useCallback(() => {
    if (tourStep > 0) showStep(tourStep - 1)
  }, [tourStep, showStep])

  useEffect(() => {
    const timer = window.setInterval(() => setClock(karachiClock()), 15000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (tourPhase !== 'rooms' || !autoplay || holding) return
    if (tourStep === TOUR_STEPS.length - 1) return
    const timer = window.setTimeout(nextStep, 7000)
    return () => window.clearTimeout(timer)
  }, [tourPhase, autoplay, holding, tourStep, nextStep])

  useEffect(() => {
    if (tourPhase !== 'rooms') return
    dockRef.current?.focus({ preventScroll: true })
    document.body.classList.add('is-touring')
    return () => document.body.classList.remove('is-touring')
  }, [tourPhase])

  useEffect(() => {
    if (tourPhase === 'off') return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeTour()
      if (tourPhase !== 'rooms') return
      if (event.key === 'ArrowRight') nextStep()
      if (event.key === 'ArrowLeft') prevStep()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [tourPhase, closeTour, nextStep, prevStep])

  useEffect(() => {
    let frame = 0
    const onMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mx', `${event.clientX}px`)
        document.documentElement.style.setProperty('--my', `${event.clientY}px`)
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  useEffect(() => {
    const nodes = SECTIONS.map((section) => document.getElementById(section.id)).filter(
      (node): node is HTMLElement => Boolean(node),
    )
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible?.target.id) setActive(visible.target.id as SectionId)
      },
      { rootMargin: '-45% 0px -54% 0px', threshold: 0 },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const featured = PROJECTS.find((project) => project.featured)!
  const rest = PROJECTS.filter((project) => !project.featured)
  return (
    <>
      <div className="ambient" />
      <div className="grain" />
      <div className="shell">
        <nav className="rail" aria-label="Floor index">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={active === section.id ? 'active' : ''}
              onClick={() => setActive(section.id)}
            >
              <small>{section.index}</small>
              <span>{section.label}</span>
              <em>{section.plain}</em>
            </a>
          ))}
        </nav>

        <header className="topbar">
          <a className="brand" href="#arrival">
            <strong>{PROFILE.short}</strong>
            <span>Night Circuit</span>
          </a>
          <div className="clock">
            <i />
            Karachi {clock} PKT
          </div>
          <div className="top-actions">
            <a className="btn" href={PROFILE.resume} target="_blank" rel="noreferrer">
              Download resume
            </a>
            <a className="icon-btn" href={`mailto:${PROFILE.email}`} aria-label="Email Waseeq">
              <MailIcon />
            </a>
          </div>
        </header>

        <nav className="mobile-rail" aria-label="Sections">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={active === section.id ? 'active' : ''}
              onClick={() => setActive(section.id)}
            >
              {section.plain}
            </a>
          ))}
        </nav>

        <main className="page">
          <section id="arrival" className="section hero">
            <div>
              <div className="status-pill reveal">
                <i />
                {PROFILE.availability}
              </div>
              <p className="role-line reveal" style={delay(1)}>
                {PROFILE.role}
              </p>
              <h1 className="reveal" style={delay(2)}>
                {PROFILE.name.split(' ').slice(0, 2).join(' ')}
                <br />
                <em>{PROFILE.name.split(' ').slice(2).join(' ')}</em>
              </h1>
              <p className="lede reveal" style={delay(3)}>
                {PROFILE.summary}
              </p>
              <div className="hero-actions reveal" style={delay(4)}>
                <button className="btn primary" type="button" onClick={startTour}>
                  Walk the floor
                </button>
                <a className="btn" href={PROFILE.resume} target="_blank" rel="noreferrer">
                  Resume
                </a>
                <a
                  className="icon-btn"
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                </a>
                <a
                  className="icon-btn"
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
              </div>
              <div className="stats">
                {STATS.map((stat, index) => (
                  <div className="stat reveal" key={stat.label} style={delay(5 + index)}>
                    <strong>
                      <CountUp value={stat.value} />
                    </strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal" style={delay(3)}>
              <NightMap />
            </div>
          </section>

          <div className="ticker" aria-hidden="true">
            <div className="ticker-track">
              {[...TICKER, ...TICKER].map((item, index) => (
                <span key={`${item}-${index}`}>
                  <b>live</b> {item}
                </span>
              ))}
            </div>
          </div>

          <section id="brief" className="section">
            <div className="kicker reveal">{kicker('brief')}</div>
            <h2 className="pull reveal" style={delay(1)}>
              I keep the write path honest after the night gets busy.
            </h2>
            <div className="split">
              <div className="prose reveal" style={delay(2)}>
                <p>
                  Most of my work lives where two users can hit the same slot, the same table,
                  or the same payment at the same time. NestJS and Node services, PostgreSQL
                  and Prisma models, JWT ownership checks, and AWS queues that have to
                  deliver once — with React and Next.js when the product needs a face.
                </p>
                <p>
                  I also sit with product owners and merchants. Senvers needed a booking lock
                  that could not double-book. Portl needed booking, feed, and payment paths
                  that still worked for 68k+ people trying to go out. Lima needed AI that
                  parsed a syllabus instead of performing a demo.
                </p>
              </div>
              <div className="columns reveal" style={delay(3)}>
                <div>
                  <h3>What I bring</h3>
                  <ul>
                    {BRING.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>What I want next</h3>
                  <ul>
                    {NEXT.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="stack" className="section">
            <div className="kicker reveal">{kicker('stack')}</div>
            <div className="stack-head reveal" style={delay(1)}>
              <h2>Systems grouped the way the work arrived.</h2>
              <p className="copy">
                Not a keyword cloud. The four rooms I actually lived in: APIs, events,
                payments, and the product features that needed a model.
              </p>
            </div>
            <div className="stack-grid">
              {STACK.map((group, index) => (
                <article
                  className={`stack-tile reveal ${index === 0 ? 'is-lead' : ''}`}
                  key={group.title}
                  style={delay(index + 1)}
                >
                  <span className="stack-icon">
                    <StackIcon name={group.icon} />
                  </span>
                  <h3>{group.title}</h3>
                  <p>{group.copy}</p>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="log" className="section">
            <div className="kicker reveal">{kicker('log')}</div>
            <div className="log-head reveal" style={delay(1)}>
              <h2>Recent rooms, and what changed after the work shipped.</h2>
            </div>
            <ol className="timeline">
              {EXPERIENCE.map((job, index) => {
                const open = Boolean(expanded[job.company])
                const shown = open ? job.bullets : job.bullets.slice(0, 2)
                const hidden = job.bullets.length - 2
                return (
                  <li
                    className={`timeline-item reveal ${job.current ? 'is-current' : ''}`}
                    key={job.company}
                    style={delay(index + 1)}
                  >
                    <span className="timeline-dot" aria-hidden="true" />
                    <div className="timeline-meta">
                      {job.dates} · {job.place}
                      {job.current && <span className="now">Now</span>}
                    </div>
                    <h3>{job.company}</h3>
                    <div className="role">{job.role}</div>
                    <p className="impact">{job.impact}</p>
                    <ul>
                      {shown.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    {hidden > 0 && (
                      <button
                        className="more"
                        type="button"
                        aria-expanded={open}
                        onClick={() =>
                          setExpanded((value) => ({ ...value, [job.company]: !open }))
                        }
                      >
                        {open ? 'Show less' : `Show ${hidden} more`}
                      </button>
                    )}
                    <div className="chips">
                      {job.tags.map((tag) => (
                        <span className="chip" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </li>
                )
              })}
            </ol>
            <p className="edu reveal">
              {EDUCATION.degree}, {EDUCATION.full} · {EDUCATION.dates}
            </p>
          </section>

          <section id="work" className="section">
            <div className="kicker reveal">{kicker('work')}</div>
            <div className="work-head reveal" style={delay(1)}>
              <h2>Selected builds worth opening the door for.</h2>
              <p className="copy">
                Every card shows the system underneath. Portl is the live nightlife product
                from SOC Solutions; the rest is the marketplace, classroom AI, messaging, and
                the medical model.
              </p>
            </div>

            <article className="featured reveal" style={delay(2)}>
              <div className="featured-copy">
                <div className="kicker">{featured.kicker}</div>
                <h3>{featured.name}</h3>
                <a className="live" href={featured.href!} target="_blank" rel="noreferrer">
                  {featured.hrefLabel} ↗
                </a>
                <p className="copy">{featured.blurb}</p>
                <p className="copy">{featured.details}</p>
                <FlowDiagram steps={featured.flow} label={`${featured.name} system flow`} />
                <div className="chips">
                  {featured.stack.map((tag) => (
                    <span className="chip" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <PortlStage />
            </article>

            <div className="work-grid">
              {rest.map((project, index) => (
                <article className="card reveal" key={project.id} style={delay(index + 1)}>
                  <div className="kicker">{project.kicker}</div>
                  <h3>{project.name}</h3>
                  <p>{project.blurb}</p>
                  <FlowDiagram steps={project.flow} label={`${project.name} system flow`} />
                  <p className="card-note">{project.details}</p>
                  <div className="chips">
                    {project.stack.map((tag) => (
                      <span className="chip" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="signal" className="section signal">
            <div className="kicker reveal">{kicker('signal')}</div>
            <h2 className="reveal" style={delay(1)}>
              If the night is overbooked, send the booking to me.
            </h2>
            <p className="copy reveal" style={delay(2)}>
              I am in {PROFILE.location}. If you need a backend focused full stack engineer
              who can own booking, matching, payments, and still ship the UI when it
              matters, the channel is open.
            </p>
            <div className="signal-panel reveal" style={delay(3)}>
              <div>
                <a className="mail" href={`mailto:${PROFILE.email}`}>
                  {PROFILE.email}
                </a>
                <p className="copy">{PROFILE.phone}</p>
                <a className="btn primary" href={`mailto:${PROFILE.email}`}>
                  Send a signal
                </a>
              </div>
              <div className="contact-list">
                {LINKS.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      {tourPhase === 'ticket' && <TourTicket onDone={enterRooms} />}

      {tourPhase === 'rooms' && (
        <>
          <TourSpotlight target={TOUR_STEPS[tourStep].target} />
          <TourRoute step={tourStep} visited={visited} onJump={showStep} />
          <TourDock
            ref={dockRef}
            step={tourStep}
            visited={visited}
            autoplay={autoplay}
            onPrev={prevStep}
            onNext={nextStep}
            onToggleAutoplay={() => setAutoplay((value) => !value)}
            onHold={setHolding}
            onRestart={startTour}
            onClose={closeTour}
          />
        </>
      )}
    </>
  )
}
