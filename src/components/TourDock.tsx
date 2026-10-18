import { forwardRef, useEffect, useRef } from 'react'
import type { TouchEvent } from 'react'
import { PROFILE, TOUR_STEPS } from '../data'
import { LinkedInIcon, MailIcon } from './Icons'

type Props = {
  step: number
  visited: Set<number>
  autoplay: boolean
  onPrev: () => void
  onNext: () => void
  onToggleAutoplay: () => void
  onHold: (holding: boolean) => void
  onRestart: () => void
  onClose: () => void
}

const SWIPE = 50
const pad = (value: number) => String(value).padStart(2, '0')

const TourDock = forwardRef<HTMLElement, Props>(function TourDock(
  { step, visited, autoplay, onPrev, onNext, onToggleAutoplay, onHold, onRestart, onClose },
  ref,
) {
  const touchX = useRef<number | null>(null)
  const local = useRef<HTMLElement | null>(null)
  const current = TOUR_STEPS[step]
  const last = step === TOUR_STEPS.length - 1

  const setRefs = (node: HTMLElement | null) => {
    local.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) ref.current = node
  }

  useEffect(() => {
    const node = local.current
    if (!node) return
    const root = document.documentElement
    const observer = new ResizeObserver(() => {
      root.style.setProperty('--dock-h', `${node.offsetHeight}px`)
    })
    observer.observe(node)
    return () => {
      observer.disconnect()
      root.style.removeProperty('--dock-h')
    }
  }, [])

  const onTouchStart = (event: TouchEvent) => {
    touchX.current = event.touches[0].clientX
  }

  const onTouchEnd = (event: TouchEvent) => {
    if (touchX.current === null) return
    const delta = event.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (delta <= -SWIPE && !last) onNext()
    if (delta >= SWIPE && step > 0) onPrev()
  }

  return (
    <aside
      ref={setRefs}
      className={`tour${last ? ' is-last' : ''}`}
      role="dialog"
      aria-label="Floor walk"
      tabIndex={-1}
      onMouseEnter={() => onHold(true)}
      onMouseLeave={() => onHold(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <header>
        <div>
          <small>
            Room {pad(step + 1)} / {pad(TOUR_STEPS.length)}
          </small>
          <h3>{current.room}</h3>
        </div>
        <button className="ghost" type="button" onClick={onClose} aria-label="Close floor walk">
          Close
        </button>
      </header>

      {last ? (
        <div className="last-call" aria-live="polite">
          <p className="last-call-title">That is the floor. Want the booking?</p>
          <div className="last-call-actions">
            <a className="btn primary" href={`mailto:${PROFILE.email}`}>
              <MailIcon /> Email
            </a>
            <a className="btn" href={PROFILE.resume} target="_blank" rel="noreferrer">
              Download resume
            </a>
            <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
              <LinkedInIcon /> LinkedIn
            </a>
          </div>
        </div>
      ) : (
        <p className="tour-caption" aria-live="polite">
          {current.caption}
        </p>
      )}

      <div className="stamps" aria-label={`${visited.size} of ${TOUR_STEPS.length} rooms stamped`}>
        {TOUR_STEPS.map((item, index) => (
          <span
            key={item.id}
            className={`stamp${visited.has(index) ? ' is-stamped' : ''}`}
            aria-hidden="true"
          >
            {pad(index + 1)}
          </span>
        ))}
      </div>

      <div className="tour-controls">
        <button className="ghost" type="button" onClick={onPrev} disabled={step === 0}>
          Back
        </button>
        {last ? (
          <button className="ghost accent" type="button" onClick={onRestart}>
            Walk again
          </button>
        ) : (
          <>
            <button
              className="ghost"
              type="button"
              aria-pressed={autoplay}
              onClick={onToggleAutoplay}
            >
              {autoplay ? 'Autoplay on' : 'Autoplay'}
            </button>
            <button className="ghost accent" type="button" onClick={onNext}>
              Next room
            </button>
          </>
        )}
        <span className="tour-hint" aria-hidden="true">
          ← → keys · swipe
        </span>
      </div>
    </aside>
  )
})

export default TourDock
