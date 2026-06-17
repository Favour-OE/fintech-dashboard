import { useEffect, useState } from "react"
import { fetchDashboard, type DashboardResponse } from "../api/dashboard"
import StatCard from "./StatCard"
import "./DashboardStats.css"

function formatCurrency(n: number): string {
  if (n >= 1_000_000) {
    return `₦${(n / 1_000_000).toFixed(2)}M`
  }
  if (n >= 1_000) {
    return `₦${(n / 1_000).toFixed(1)}K`
  }
  return `₦${n.toLocaleString()}`
}

function formatChange(pct: number): string {
  const sign = pct >= 0 ? "+" : ""
  return `${sign}${pct.toFixed(2)}%`
}

export default function DashboardStats() {
  const [data, setData] = useState<DashboardResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchDashboard()
      .then((res) => {
        if (!cancelled) setData(res)
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message ?? "Failed to load dashboard")
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <div className="stats-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="stat-card stat-card--skeleton">
            <div className="skeleton-line skeleton-line--short" />
            <div className="skeleton-line skeleton-line--long" />
            <div className="skeleton-line skeleton-line--short" />
          </div>
        ))}
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="stats-error">
        <p>{error ?? "No data available"}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="stats-grid">
      <StatCard
        label="Total Portfolio Value"
        value={formatCurrency(data.totalValue)}
        change={formatChange(data.monthlyReturn)}
        changeType={data.monthlyReturn >= 0 ? "up" : "down"}
      />
      <StatCard
        label="Monthly Return"
        value={formatChange(data.monthlyReturn)}
        change={data.monthlyReturn >= 0 ? "Above target" : "Below target"}
        changeType={data.monthlyReturn >= 0 ? "up" : "down"}
      />
      <StatCard
        label="Total Assets"
        value={String(data.totalAssets)}
        change={`${data.totalAssets} holdings`}
        changeType="neutral"
      />
      <StatCard
        label="Total Transactions"
        value={String(data.totalTransactions)}
        change="All time"
        changeType="neutral"
      />
    </div>
  )
}
