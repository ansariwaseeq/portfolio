const NODES = [
  { id: 'karachi', x: 320, y: 78, label: 'Karachi', sub: 'base' },
  { id: 'portl', x: 470, y: 168, label: 'Portl', sub: '68k users' },
  { id: 'senvers', x: 168, y: 176, label: 'Senvers', sub: 'slot lock' },
  { id: 'lima', x: 250, y: 312, label: 'Lima', sub: 'syllabus AI' },
  { id: 'pay', x: 456, y: 318, label: 'Payments', sub: 'fiat + chain' },
  { id: 'outbox', x: 140, y: 400, label: 'Outbox', sub: 'SQS once' },
]

const PATHS = [
  'M320 78 C 280 110, 210 130, 168 176',
  'M320 78 C 380 110, 440 130, 470 168',
  'M168 176 C 190 240, 220 280, 250 312',
  'M470 168 C 480 230, 478 280, 456 318',
  'M250 312 C 210 350, 170 380, 140 400',
  'M456 318 C 360 360, 240 390, 140 400',
]

type Props = {
  onSelect?: (id: string) => void
}

export default function NightMap({ onSelect }: Props) {
  return (
    <div className="map-wrap" aria-hidden="false">
      <header>
        <span>Live circuit</span>
        <span>bookings · matches · nights</span>
      </header>
      <svg viewBox="0 0 640 480" role="img" aria-label="Map of shipped systems">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e0a36a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e0a36a" stopOpacity="0" />
          </radialGradient>
        </defs>
        {PATHS.map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="rgba(243,236,227,0.18)"
            strokeWidth="1.4"
          />
        ))}
        {PATHS.map((d, i) => (
          <circle key={`t-${i}`} r="3.2" fill={i % 2 ? '#7dffe1' : '#e0a36a'}>
            <animateMotion dur={`${7 + i}s`} repeatCount="indefinite" path={d} />
          </circle>
        ))}
        {NODES.map((node) => (
          <g
            key={node.id}
            style={{ cursor: 'pointer' }}
            onClick={() => onSelect?.(node.id)}
          >
            <circle cx={node.x} cy={node.y} r="18" fill="url(#glow)" opacity="0.55">
              <animate
                attributeName="r"
                values="14;22;14"
                dur="3.6s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx={node.x} cy={node.y} r="5.5" fill="#f3ece3" />
            <text className="node-label" x={node.x + 14} y={node.y - 4}>
              {node.label}
            </text>
            <text className="node-sub" x={node.x + 14} y={node.y + 10}>
              {node.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
