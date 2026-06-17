import { useState, useEffect, useRef } from "react"

export function useCountUp(end: number, duration = 600, enabled = true): number {
  const [count, setCount] = useState(enabled ? 0 : end)
  const startTime = useRef<number | null>(null)
  const raf = useRef<number>(0)

  useEffect(() => {
    if (!enabled) {
      setCount(end)
      return
    }

    startTime.current = null
    const startValue = 0

    function animate(now: number) {
      if (startTime.current === null) startTime.current = now
      const elapsed = now - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(startValue + (end - startValue) * eased)

      if (progress < 1) {
        raf.current = requestAnimationFrame(animate)
      }
    }

    raf.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf.current)
  }, [end, duration, enabled])

  return count
}
