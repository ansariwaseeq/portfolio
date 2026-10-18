import type { CSSProperties } from 'react'
import { TOUR_STEPS } from '../data'

type Props = {
  step: number
  visited: Set<number>
  onJump: (step: number) => void
}

export default function TourRoute({ step, visited, onJump }: Props) {
  const at = step / (TOUR_STEPS.length - 1)

  return (
    <nav className="route" aria-label="Floor walk route" style={{ '--at': at } as CSSProperties}>
      <span className="route-line" aria-hidden="true">
        <span className="route-fill" />
      </span>
      <span className="route-you" aria-hidden="true" />
      <ol>
        {TOUR_STEPS.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              className={`route-stop${visited.has(index) ? ' is-visited' : ''}${index === step ? ' is-here' : ''}`}
              aria-current={index === step ? 'step' : undefined}
              onClick={() => onJump(index)}
            >
              <span className="sr-only">{item.room}</span>
              <em aria-hidden="true">{item.room}</em>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
