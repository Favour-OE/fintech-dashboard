import { AreaChart, Area, ResponsiveContainer } from "recharts"
import type { PerformerAsset } from "../../api/admin"
import { formatCurrency } from "../../utils/format"
import "./PerformerCard.css"

interface PerformerCardProps {
  label: string
  asset: PerformerAsset
  color: string
  variant?: "performer" | "highest"
  totalPortfolioValue?: number
}

export default function PerformerCard({ label, asset, color, variant = "performer", totalPortfolioValue }: PerformerCardProps) {
  const chartData = asset.miniChart.map((v) => ({ v }))

  if (variant === "highest") {
    const portfolioPct = totalPortfolioValue
      ? Math.round((asset.value / totalPortfolioValue) * 100)
      : 0

    return (
      <div className="performer-card">
        <div className="performer-label">{label}</div>
        <div className="performer-row">
          <div className="performer-icon" style={{ background: `${color}1a`, color }}>
            {asset.icon}
          </div>
          <div>
            <div className="performer-name">{asset.name}</div>
            <div className="performer-value">{formatCurrency(asset.value)}</div>
            <div className="performer-pct-of-portfolio">{portfolioPct}% of portfolio</div>
          </div>
        </div>
       
      </div>
    )
  }

  return (
    <div className="performer-card">
      <div className="performer-label">{label}</div>
      <div className="performer-row">
        <div className="performer-icon" style={{ background: `${color}1a`, color }}>
          {asset.icon}
        </div>
        <div>
          <div className="performer-name">{asset.name}</div>
          <div className="performer-change" style={{ color }}>
            {asset.changePercent >= 0 ? "+" : ""}{asset.changePercent}%
          </div>
        </div>
      </div>
      <div className="performer-chart">
        <ResponsiveContainer width="100%" height={50}>
          <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`perfFill-${label.replace(/\s+/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.2} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={color}
              strokeWidth={2}
              fill={`url(#perfFill-${label.replace(/\s+/g, "")})`}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
