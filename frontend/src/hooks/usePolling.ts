import { useState, useEffect, useRef, useCallback } from "react"

interface UsePollingResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export default function usePolling<T>(
  fetchFn: () => Promise<T>,
  interval = 5000,
  enabled = true,
): UsePollingResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const inFlight = useRef(false)
  const fetchRef = useRef(fetchFn)

  useEffect(() => {
    fetchRef.current = fetchFn
  }, [fetchFn])

  const load = useCallback(async () => {
    if (inFlight.current) return
    inFlight.current = true
    setError(null)
    try {
      const result = await fetchRef.current()
      setData(result)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Request failed")
    } finally {
      inFlight.current = false
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    load()
    const id = setInterval(load, interval)
    return () => clearInterval(id)
  }, [interval, enabled, load])

  return { data, loading, error, refetch: load }
}
