import { useCallback, useEffect, useState } from 'react'
import NightMap from './components/NightMap'
import PortlStage from './components/PortlStage'
import TourDock from './components/TourDock'
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

function karachiClock(now = new Date()) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Karachi',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now)
}

export default function App() {
  const [active, setActive] = useState<(typeof SECTIONS)[number]['id']>('arrival')
  const [tourOpen, setTourOpen] = useState(false)
  const [tourStep, setTourStep] = useState(0)
  const [paused, setPaused] = useState(false)
  const [clock, setClock] = useState(() => karachiClock())

  const goTo = useCallback((id: string) => {
    setActive(id as (typeof SECTIONS)[number]['id'])
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const startTour = () => {
    setTourOpen(true)
    setTourStep(0)
    setPaused(false)
    goTo(TOUR_STEPS[0].id)
  }

  const closeTour = () => {
    setTourOpen(false)
    setPaused(false)
  }

  const nextStep = useCallback(() => {
    setTourStep((current) => {
      const next = current >= TOUR_STEPS.length - 1 ? 0 : current + 1
      goTo(TOUR_STEPS[next].id)
      return next
    })
  }, [goTo])

  const prevStep = () => {
    setTourStep((current) => {
      const next = Math.max(0, current - 1)
      goTo(TOUR_STEPS[next].id)
      return next
    })
  }

  useEffect(() => {
    const timer = window.setInterval(() => setClock(karachiClock()), 15000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!tourOpen || paused) return
    const timer = window.setInterval(nextStep, 8000)
    return () => window.clearInterval(timer)
  }, [tourOpen, paused, nextStep])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeTour()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      document.documentElement.style.setProperty('--mx', `${event.clientX}px`)
      document.documentElement.style.setProperty('--my', `${event.clientY}px`)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const nodes = SECTIONS.map((section) => document.getElementById(section.id)).filter(
      (node): node is HTMLElement => Boolean(node),
    )
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) {
          setActive(visible.target.id as (typeof SECTIONS)[number]['id'])
        }
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0.15, 0.35, 0.6] },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const featured = PROJECTS.find((project) => project.featured)!
  const rest = PROJECTS.filter((project) => !project.featured)
  const focusId = tourOpen ? TOUR_STEPS[tourStep].id : null

  const handleMapSelect = (id: string) => {
    if (id === 'portl' || id === 'senvers' || id === 'lima') {
      goTo('work')
      return
    }
    if (id === 'pay' || id === 'outbox') goTo('stack')
  }

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
            <button className="btn primary" type="button" onClick={startTour}>
              Walk the floor
            </button>
            <a className="btn" href={PROFILE.resume} target="_blank" rel="noreferrer">
              Download resume
            </a>
            <a className="btn ghosted" href={`mailto:${PROFILE.email}`}>
              Send a signal
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
              {section.label}
            </a>
          ))}
        </nav>

        <main className="page">
          <section
            id="arrival"
            className={`section hero ${focusId === 'arrival' ? 'is-focus' : ''}`}
          >
            <div>
              <div className="kicker">Night circuit portfolio</div>
              <p className="role-line">{PROFILE.role}</p>
              <h1>
                {PROFILE.name.split(' ').slice(0, 2).join(' ')}
                <br />
                <em>{PROFILE.name.split(' ').slice(2).join(' ')}</em>
              </h1>
              <p className="lede">{PROFILE.summary}</p>
              <div className="hero-actions">
                <button className="btn primary" type="button" onClick={startTour}>
                  Walk the floor
                </button>
                <a className="btn" href={PROFILE.resume} target="_blank" rel="noreferrer">
                  Download resume
                </a>
                <a className="btn" href={PROFILE.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>
              <div className="stats">
                {STATS.map((stat) => (
                  <div className="stat" key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <NightMap onSelect={handleMapSelect} />
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

          <section
            id="brief"
            className={`section ${focusId === 'brief' ? 'is-focus' : ''}`}
          >
            <div className="kicker">02 · Brief</div>
            <div className="split">
              <div className="prose">
                <h2>I keep the write path honest after the night gets busy.</h2>
                <p>
                  Most of my work lives where two users can hit the same slot, the same table,
                  or the same payment at the same time. NestJS and Node services, PostgreSQL
                  and Prisma models, JWT ownership checks, and AWS queues that have to
                  deliver once — with React and Next.js when the product needs a face.
                </p>
                <p>
                  I also sit with product owners and merchants. Senvers needed a booking lock
                  that could not double-book. Portl needed booking, feed, and payment paths
                  that still worked for 17,000+ people trying to go out. Lima needed AI that
                  parsed a syllabus instead of performing a demo.
                </p>
              </div>
              <div className="columns">
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

          <section
            id="stack"
            className={`section ${focusId === 'stack' ? 'is-focus' : ''}`}
          >
            <div className="kicker">03 · Stack</div>
            <div className="stack-head">
              <h2>Systems grouped the way the work arrived.</h2>
              <p className="copy">
                Not a keyword cloud. The four rooms I actually lived in: APIs, events,
                payments, and the product features that needed a model.
              </p>
            </div>
            <div className="stack-grid">
              {STACK.map((group) => (
                <article className="stack-card" key={group.title}>
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

          <section
            id="log"
            className={`section ${focusId === 'log' ? 'is-focus' : ''}`}
          >
            <div className="kicker">04 · Log</div>
            <div className="log-head">
              <h2>Recent rooms, and what changed after the work shipped.</h2>
            </div>
            <div className="log-list">
              {EXPERIENCE.map((job) => (
                <article className="job" key={job.company}>
                  <div className="meta">
                    <div>{job.dates}</div>
                    <h3>{job.company}</h3>
                    <div className="role">{job.role}</div>
                    <div>{job.place}</div>
                  </div>
                  <div>
                    <div className="chips">
                      {job.tags.map((tag) => (
                        <span className="chip" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ul>
                      {job.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
            <p className="edu">
              {EDUCATION.degree}, {EDUCATION.full} · {EDUCATION.dates}
            </p>
          </section>

          <section
            id="work"
            className={`section ${focusId === 'work' ? 'is-focus' : ''}`}
          >
            <div className="kicker">05 · Work</div>
            <div className="work-head">
              <h2>Selected builds worth opening the door for.</h2>
              <p className="copy">
                Portl is the live nightlife product from SOC Solutions. The rest is the
                marketplace, classroom AI, messaging, and the medical model.
              </p>
            </div>

            <article className="featured">
              <div className="featured-copy">
                <div className="kicker">{featured.kicker}</div>
                <h3>{featured.name}</h3>
                <a className="live" href={featured.href!} target="_blank" rel="noreferrer">
                  {featured.hrefLabel} ↗
                </a>
                <p className="copy">{featured.blurb}</p>
                <p className="copy">{featured.details}</p>
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
              {rest.map((project) => (
                <article className="card" key={project.id}>
                  <div className="kicker">{project.kicker}</div>
                  <h3>{project.name}</h3>
                  <p>{project.blurb}</p>
                  <p>{project.details}</p>
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

          <section
            id="signal"
            className={`section signal ${focusId === 'signal' ? 'is-focus' : ''}`}
          >
            <div className="kicker">06 · Signal</div>
            <h2>If the night is overbooked, send the booking to me.</h2>
            <p className="copy">
              I am in {PROFILE.location}. If you need a backend focused full stack engineer
              who can own booking, matching, payments, and still ship the UI when it
              matters, the channel is open.
            </p>
            <div className="signal-panel">
              <div>
                <a className="mail" href={`mailto:${PROFILE.email}`}>
                  {PROFILE.email}
                </a>
                <p className="copy">{PROFILE.phone}</p>
                <div className="hero-actions">
                  <a className="btn primary" href={`mailto:${PROFILE.email}`}>
                    Send a signal
                  </a>
                  <a className="btn" href={PROFILE.resume} target="_blank" rel="noreferrer">
                    Download resume
                  </a>
                </div>
              </div>
              <div className="contact-list">
                {LINKS.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      {tourOpen && (
        <TourDock
          step={tourStep}
          paused={paused}
          onPrev={prevStep}
          onNext={nextStep}
          onToggle={() => setPaused((value) => !value)}
          onClose={closeTour}
        />
      )}
    </>
  )
}
