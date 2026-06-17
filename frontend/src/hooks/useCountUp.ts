import { useState, useEffect, useRef } from "react"

export function useCountUp(end: number, duration = 600, enabled = true): number {
  const [count, setCount] = useState(enabled ? 0 : end)
  const startTime = useRef<number | null>(null)
  const raf = useRef<number>(0)
  const endRef = useRef(end)

  useEffect(() => {
    endRef.current = end
  }, [end])

  useEffect(() => {
    if (!enabled) return
    startTime.current = null

    function animate(now: number) {
      if (startTime.current === null) startTime.current = now
      const elapsed = now - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * endRef.current)

      if (progress < 1) {
        raf.current = requestAnimationFrame(animate)
      }
    }

    raf.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf.current)
  }, [duration, enabled])

  return count
}
