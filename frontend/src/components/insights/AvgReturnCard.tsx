import "./AvgReturnCard.css"

interface AvgReturnCardProps {
  averageReturn: number
}

export default function AvgReturnCard({ averageReturn }: AvgReturnCardProps) {
  const sign = averageReturn >= 0 ? "+" : ""

  return (
    <div className="avg-return-card">
      <div className="avg-return-label">Average Monthly Return</div>
      <div className="avg-return-value" style={{ color: averageReturn >= 0 ? "#16a34a" : "#dc2626" }}>
        {sign}{averageReturn}%
      </div>
      <div className="avg-return-period">Over the last 6 months</div>
    </div>
  )
}
