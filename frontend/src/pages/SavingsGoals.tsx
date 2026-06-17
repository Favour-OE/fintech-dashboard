import { useEffect, useState } from "react"
import { fetchGoals, type Goal } from "../api/goals"
import GoalCard from "../components/goals/GoalCard"
import GoalModal from "../components/goals/GoalModal"
import "./SavingsGoals.css"

export default function SavingsGoals() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [animated, setAnimated] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const load = () => {
    setLoading(true)
    setError(null)
    fetchGoals()
      .then(setGoals)
      .catch((err) => setError(err?.message ?? "Failed to load goals"))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(t)
  }, [goals])

  if (loading) {
    return (
      <div className="savings-page">
        <div className="savings-header">
          <h2>Savings Goals</h2>
        </div>
        <div className="savings-list">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="goal-card goal-card--skeleton">
              <div className="goal-card-skeleton-left">
                <div className="skeleton-line skeleton-line--sm" />
                <div className="skeleton-line skeleton-line--sm" />
              </div>
              <div className="goal-card-skeleton-body">
                <div className="skeleton-line skeleton-line--circle" />
                <div className="goal-card-skeleton-text">
                  <div className="skeleton-line skeleton-line--short" />
                  <div className="skeleton-line skeleton-line--xshort" />
                  <div className="skeleton-line skeleton-line--long" />
                  <div className="skeleton-line skeleton-line--medium" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="savings-page">
        <div className="savings-error">
          <p>{error}</p>
          <button type="button" onClick={load}>Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className="savings-page">
      <div className="savings-header">
        <h2>Savings Goals</h2>
        <button className="savings-btn" type="button" onClick={() => setModalOpen(true)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
          New Goal
        </button>
      </div>
      <div className="savings-list">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            animated={animated}
            onEdit={(id) => console.log("Edit", id)}
            onDelete={(id) => console.log("Delete", id)}
          />
        ))}
      </div>
      <GoalModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={load}
      />
    </div>
  )
}
