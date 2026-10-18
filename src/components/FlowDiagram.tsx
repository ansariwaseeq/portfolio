import type { CSSProperties } from 'react'
import type { FlowStep } from '../data'

type Props = {
  steps: FlowStep[]
  label: string
}

export default function FlowDiagram({ steps, label }: Props) {
  return (
    <ol
      className="flow"
      aria-label={label}
      style={{ '--n': steps.length } as CSSProperties}
    >
      {steps.map((step, index) => (
        <li
          className="flow-step"
          key={step.label}
          style={{ '--i': index } as CSSProperties}
        >
          <span className="flow-dot" aria-hidden="true" />
          <strong>{step.label}</strong>
          <small>{step.sub}</small>
        </li>
      ))}
    </ol>
  )
}
