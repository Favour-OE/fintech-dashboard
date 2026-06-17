import type { Goal } from "../../api/goals"
import { formatCurrency } from "../../utils/format"
import "./GoalCard.css"

const ICON_TINTS: Record<string, { bg: string; text: string }> = {
  "#3b82f6": { bg: "#eff6ff", text: "#2563eb" },
  "#8b5cf6": { bg: "#faf5ff", text: "#7c3aed" },
  "#ef4444": { bg: "#fef2f2", text: "#ef4444" },
  "#22c55e": { bg: "#f0fdf4", text: "#16a34a" },
  "#f59e0b": { bg: "#fffbeb", text: "#d97706" },
  "#06b6d4": { bg: "#ecfeff", text: "#0891b2" },
}

interface GoalCardProps {
  goal: Goal
  animated?: boolean
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export default function GoalCard({ goal, animated, onEdit, onDelete }: GoalCardProps) {
  const tint = ICON_TINTS[goal.color] ?? { bg: "#f0fdf4", text: "#16a34a" }
  const hasZeroTarget = goal.targetAmount <= 0
  const isCompleted = !hasZeroTarget && goal.progressPercent >= 100

  return (
    <div className={`goal-card${isCompleted ? " goal-card--completed" : ""}`}>
      <div className="goal-card-actions">
        {onEdit && (
          <button className="goal-card-btn" onClick={() => onEdit(goal.id)} title="Edit goal">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="m18.5 2.5 2.5 2.5L11 15l-4 1 1-4 10.5-10.5Z"/>
            </svg>
          </button>
        )}
        {onDelete && (
          <button className="goal-card-btn goal-card-btn--delete" onClick={() => onDelete(goal.id)} title="Delete goal">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </button>
        )}
      </div>
      <div className="goal-card-main">
        <div
          className="goal-card-icon"
          style={{ background: tint.bg, color: tint.text }}
        >
          {goal.icon}
        </div>
        <div className="goal-card-body">
          <div className="goal-card-name">
            {goal.name}
            {isCompleted && <span className="goal-card-badge">Completed!</span>}
          </div>
          {goal.description && (
            <div className="goal-card-desc">{goal.description}</div>
          )}
          <div className="goal-card-progress">
            <div className="goal-card-progress-track">
              <div
                className="goal-card-progress-fill"
                style={{
                  width: `${animated && !hasZeroTarget ? goal.progressPercent : 0}%`,
                  background: hasZeroTarget ? "#e5e7eb" : goal.color,
                }}
              />
            </div>
            <div className="goal-card-progress-meta">
              <span className="goal-card-amounts">
                {formatCurrency(goal.currentAmount)} / {hasZeroTarget ? "N/A" : formatCurrency(goal.targetAmount)}
              </span>
              <span className="goal-card-pct">
                {hasZeroTarget ? "N/A" : isCompleted ? "100%" : `${goal.progressPercent}%`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
