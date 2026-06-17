// Dashboard goals overview — fetches goals and displays up to 4 compact cards with progress bars
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchGoals, type Goal } from "../../api/goals"
import "./DashboardGoals.css"

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `₦${(n / 1_000).toFixed(1)}K`
  return `₦${n.toLocaleString()}`
}

// color per goal category so each type has a consistent icon background
const CATEGORY_COLORS: Record<string, string> = {
  Savings: "#3b82f6",
  Travel: "#8b5cf6",
  Purchase: "#ef4444",
  "Real Estate": "#22c55e",
}

export default function DashboardGoals() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // animate progress bars from 0 → target width after mount
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchGoals()
      .then((data) => {
        if (!cancelled) setGoals(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message ?? "Failed to load goals")
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  // trigger the fill animation shortly after mount
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(t)
  }, [])

  // loading skeleton
  if (loading) {
    return (
      <div className="dashboard-goals">
        <div className="dashboard-goals-header">
          <h3>Savings Goals Overview</h3>
        </div>
        <div className="dashboard-goals-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="goal-card goal-card--skeleton">
              <div className="skeleton-line skeleton-line--circle" />
              <div className="skeleton-line skeleton-line--short" />
              <div className="skeleton-line skeleton-line--long" />
              <div className="skeleton-line skeleton-line--medium" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-goals">
        <div className="dashboard-goals-header">
          <h3>Savings Goals Overview</h3>
        </div>
        <div className="goals-error">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-goals">
      <div className="dashboard-goals-header">
        <h3>Savings Goals Overview</h3>
        <Link to="/goals" className="view-all-link">
          View all goals
        </Link>
      </div>
      <div className="dashboard-goals-grid">
        {goals.slice(0, 4).map((goal) => {
          const pct = Math.min(
            Math.round((goal.currentAmount / goal.targetAmount) * 100),
            100
          )
          return (
            <div key={goal.id} className="goal-card">
              <div className="goal-card-top">
                <div
                  className="goal-icon"
                  style={{
                    background:
                      CATEGORY_COLORS[goal.category] ?? "#d1d5db",
                  }}
                >
                  {goal.name.charAt(0)}
                </div>
                <span className="goal-name">{goal.name}</span>
              </div>
              <div className="goal-progress">
                <div className="goal-progress-bar">
                  {/* width starts at 0 and animates to the target via CSS transition */}
                  <div
                    className="goal-progress-fill"
                    style={{ width: `${animated ? pct : 0}%` }}
                  />
                </div>
                <span className="goal-progress-pct">{pct}%</span>
              </div>
              <div className="goal-amounts">
                <span className="goal-current">{formatCurrency(goal.currentAmount)} </span>  
                <span className = "goal-seperator"> / </span>
                <span className="goal-target"> {formatCurrency(goal.targetAmount)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
