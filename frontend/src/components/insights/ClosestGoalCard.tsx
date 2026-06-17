import type { ClosestGoal } from "../../api/admin"
import { formatCurrency } from "../../utils/format"
import "./ClosestGoalCard.css"

interface ClosestGoalCardProps {
  goal: ClosestGoal
}

export default function ClosestGoalCard({ goal }: ClosestGoalCardProps) {
  return (
    <div className="closest-goal-card">
      <div className="closest-goal-label">Goal Closest to Completion</div>
      <div className="closest-goal-name">{goal.name}</div>
      <div className="closest-goal-pct">{goal.progressPct}% complete</div>
      <div className="closest-goal-progress">
        <div className="closest-goal-progress-track">
          <div
            className="closest-goal-progress-fill"
            style={{ width: `${goal.progressPct}%`, background: goal.color }}
          />
        </div>
      </div>
      <div className="closest-goal-amounts">
        {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
      </div>
    </div>
  )
}
