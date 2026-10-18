import { TOUR_STEPS } from '../data'

type Props = {
  step: number
  paused: boolean
  onPrev: () => void
  onNext: () => void
  onToggle: () => void
  onClose: () => void
}

export default function TourDock({
  step,
  paused,
  onPrev,
  onNext,
  onToggle,
  onClose,
}: Props) {
  const current = TOUR_STEPS[step]
  const width = ((step + 1) / TOUR_STEPS.length) * 100

  return (
    <aside className="tour" role="dialog" aria-label="Floor walk">
      <header>
        <h3>
          {String(step + 1).padStart(2, '0')} / {String(TOUR_STEPS.length).padStart(2, '0')} ·{' '}
          {current.title}
        </h3>
        <button className="ghost" type="button" onClick={onClose}>
          Close
        </button>
      </header>
      <div className="progress">
        <span style={{ width: `${width}%` }} />
      </div>
      <p>{current.copy}</p>
      <div className="tour-controls">
        <button className="ghost" type="button" onClick={onPrev} disabled={step === 0}>
          Previous
        </button>
        <button className="ghost" type="button" onClick={onToggle}>
          {paused ? 'Continue' : 'Pause'}
        </button>
        <button className="ghost" type="button" onClick={onNext}>
          {step === TOUR_STEPS.length - 1 ? 'Return to arrival' : 'Next room'}
        </button>
      </div>
    </aside>
  )
}
