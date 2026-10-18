import { useEffect } from 'react'
import { PROFILE, TOUR_STEPS } from '../data'
import { usePrefersReducedMotion } from '../hooks'

type Props = {
  onDone: () => void
}

const DURATION = 1700

export default function TourTicket({ onDone }: Props) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const timer = window.setTimeout(onDone, reduced ? 600 : DURATION)
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') onDone()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
    }
  }, [onDone, reduced])

  return (
    <div className="ticket-gate" role="presentation" onClick={onDone}>
      <div className="ticket" role="status" aria-label="Admitted to the floor walk">
        <div className="ticket-main">
          <small>Guestlist · Night Circuit</small>
          <strong>{PROFILE.name}</strong>
          <span>
            Admit one · {TOUR_STEPS.length} rooms
          </span>
        </div>
        <div className="ticket-stub" aria-hidden="true">
          <small>No.</small>
          <b>068</b>
        </div>
        <div className="ticket-stamp" aria-hidden="true">
          Admitted
        </div>
      </div>
      <p className="ticket-skip">Tap or press any key to skip</p>
    </div>
  )
}
