import "./StatCard.css"

interface StatCardProps {
  label: string
  value: string
  change?: string
  changeType?: "up" | "down" | "neutral"
}

export default function StatCard({
  label,
  value,
  change,
  changeType,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-card-label">{label}</div>
      <div className="stat-card-value">{value}</div>
      {change && (
        <div className={`stat-card-change stat-card-change--${changeType ?? "neutral"}`}>
          {change}
        </div>
      )}
    </div>
  )
}
