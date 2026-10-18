import { useState } from 'react'
import { MAP_NODES } from '../data'
import { usePrefersReducedMotion } from '../hooks'

const PATHS = [
  'M320 78 C 280 110, 210 130, 168 176',
  'M320 78 C 380 110, 440 130, 470 168',
  'M168 176 C 190 240, 220 280, 250 312',
  'M470 168 C 480 230, 478 280, 456 318',
  'M250 312 C 210 350, 170 380, 140 400',
  'M456 318 C 360 360, 240 390, 140 400',
]

export default function NightMap() {
  const reduced = usePrefersReducedMotion()
  const [selected, setSelected] = useState('portl')
  const node = MAP_NODES.find((item) => item.id === selected) ?? MAP_NODES[0]

  return (
    <div className="map-wrap">
      <header>
        <span>Live circuit</span>
        <span>Hover or tap a node</span>
      </header>
      <svg viewBox="0 0 640 480" role="group" aria-label="Map of systems I shipped">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e0a36a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e0a36a" stopOpacity="0" />
          </radialGradient>
        </defs>
        {PATHS.map((d) => (
          <path key={d} d={d} fill="none" stroke="rgba(243,236,227,0.18)" strokeWidth="1.4" />
        ))}
        {!reduced &&
          PATHS.map((d, i) => (
            <circle key={`t-${i}`} r="3.2" fill={i % 2 ? '#7dffe1' : '#e0a36a'}>
              <animateMotion dur={`${7 + i}s`} repeatCount="indefinite" path={d} />
            </circle>
          ))}
        {MAP_NODES.map((item) => {
          const active = item.id === selected
          return (
            <g
              key={item.id}
              className={`map-node ${active ? 'is-active' : ''}`}
              role="button"
              tabIndex={0}
              aria-label={`${item.label}: ${item.title}`}
              aria-pressed={active}
              onMouseEnter={() => setSelected(item.id)}
              onFocus={() => setSelected(item.id)}
              onClick={() => setSelected(item.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setSelected(item.id)
                }
              }}
            >
              <circle cx={item.x} cy={item.y} r="28" fill="transparent" />
              <circle
                cx={item.x}
                cy={item.y}
                r="18"
                fill="url(#glow)"
                opacity={active ? 0.95 : 0.5}
              >
                {!reduced && (
                  <animate attributeName="r" values="14;22;14" dur="3.6s" repeatCount="indefinite" />
                )}
              </circle>
              {active && (
                <circle
                  cx={item.x}
                  cy={item.y}
                  r="11"
                  fill="none"
                  stroke="#e0a36a"
                  strokeWidth="1.5"
                />
              )}
              <circle cx={item.x} cy={item.y} r="5.5" fill={active ? '#e0a36a' : '#f3ece3'} />
              <text className="node-label" x={item.x + 14} y={item.y - 4}>
                {item.label}
              </text>
              <text className="node-sub" x={item.x + 14} y={item.y + 10}>
                {item.sub}
              </text>
            </g>
          )
        })}
      </svg>
      <div className="map-detail" aria-live="polite">
        <div className="map-detail-head">
          <strong>{node.title}</strong>
          <span>{node.metric}</span>
        </div>
        <p>{node.body}</p>
        <div className="chips">
          {node.stack.map((tag) => (
            <span className="chip" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
