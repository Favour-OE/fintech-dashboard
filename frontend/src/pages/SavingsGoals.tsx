import { useEffect, useState, useCallback } from "react"
import { fetchGoals, deleteGoal, type Goal } from "../api/goals"
import GoalCard from "../components/goals/GoalCard"
import GoalModal from "../components/goals/GoalModal"
import "./SavingsGoals.css"

export default function SavingsGoals() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [animated, setAnimated] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)

  const load = useCallback(() => {
    setLoading(true)
    setError(null)
    fetchGoals()
      .then(setGoals)
      .catch((err) => setError(err?.message ?? "Failed to load goals"))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(t)
  }, [goals])

  function handleEdit(goal: Goal) {
    setEditingGoal(goal)
    setModalOpen(true)
  }

  function handleDelete(id: number) {
    if (!window.confirm("Delete this goal?")) return
    deleteGoal(id).then(load).catch(() => {})
  }

  function handleCloseModal() {
    setModalOpen(false)
    setEditingGoal(null)
  }

  function handleSaved() {
    load()
  }

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
            onEdit={() => handleEdit(goal)}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <GoalModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSaved={handleSaved}
        editingGoal={editingGoal}
      />
    </div>
  )
}
