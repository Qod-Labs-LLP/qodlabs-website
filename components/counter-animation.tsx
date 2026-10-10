'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export function CounterAnimation({ target = 0, suffix = '', prefix = '', duration = 2000 }: {
  target?: number
  suffix?: string
  prefix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated?.current) return
    hasAnimated.current = true
    const safeTarget = target ?? 0
    const safeDuration = duration ?? 2000
    const steps = 60
    const increment = safeTarget / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= safeTarget) {
        setCount(safeTarget)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, safeDuration / steps)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix ?? ''}{count}{suffix ?? ''}
    </span>
  )
}
