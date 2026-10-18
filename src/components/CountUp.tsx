import { useEffect, useState } from 'react'
import { useInView, usePrefersReducedMotion } from '../hooks'

const DURATION = 1200

export default function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : ''
  const reduced = usePrefersReducedMotion()
  const [ref, inView] = useInView<HTMLSpanElement>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView || reduced || !target) return
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / DURATION)
      setCurrent(Math.round(target * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduced, target])

  if (!match) return <span ref={ref}>{value}</span>

  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {reduced ? target : current}
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  )
}
