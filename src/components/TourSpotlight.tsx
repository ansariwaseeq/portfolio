import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks'

type Props = {
  target: string
}

const PAD = 14

export default function TourSpotlight({ target }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const box = useRef({ x: 0, y: 0, w: 0, h: 0, ready: false })
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const hole = ref.current
    if (!hole) return
    const current = box.current
    let frame = 0

    const tick = () => {
      const el = document.querySelector(target)
      if (el) {
        const rect = el.getBoundingClientRect()
        const goal = {
          x: rect.left - PAD,
          y: rect.top - PAD,
          w: rect.width + PAD * 2,
          h: rect.height + PAD * 2,
        }
        const k = reduced || !current.ready ? 1 : 0.18
        current.x += (goal.x - current.x) * k
        current.y += (goal.y - current.y) * k
        current.w += (goal.w - current.w) * k
        current.h += (goal.h - current.h) * k
        current.ready = true
        hole.style.transform = `translate(${current.x}px, ${current.y}px)`
        hole.style.width = `${current.w}px`
        hole.style.height = `${current.h}px`
        hole.style.opacity = '1'
      } else {
        hole.style.opacity = '0'
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, reduced])

  return (
    <div className="spotlight" aria-hidden="true">
      <div className="spotlight-hole" ref={ref} />
    </div>
  )
}
