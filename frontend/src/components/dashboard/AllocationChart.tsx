// Asset allocation donut chart — Recharts PieChart with colored segments, a center total label, and a legend
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import type { Allocation } from "../../api/dashboard"
import "./AllocationChart.css"

// deterministic color per symbol so each asset always keeps the same color
const COLORS: Record<string, string> = {
  BTC: "#3b82f6",
  ETH: "#8b5cf6",
  TSLA: "#ef4444",
  AAPL: "#22c55e",
}

function formatValue(n: number): string {
  if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `₦${(n / 1_000).toFixed(1)}K`
  return `₦${n.toLocaleString()}`
}

interface AllocationChartProps {
  allocation: Allocation[]
  totalValue: number
}

export default function AllocationChart({
  allocation,
  totalValue,
}: AllocationChartProps) {
  return (
    <div className="allocation-chart">
      <h3>Asset Allocation</h3>
      <div className="allocation-chart-body">
        <div className="allocation-pie">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={allocation}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={65}  // creates the donut hole
                outerRadius={95}
                stroke="none"
              >
                {allocation.map((entry) => (
                  <Cell
                    key={entry.symbol}
                    fill={COLORS[entry.symbol] ?? "#d1d5db"}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [formatValue(value), "Value"]}
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e8eaed",
                  fontSize: 13,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* center label overlaid on the donut hole */}
          <div className="allocation-center-label">
            <span className="allocation-center-value">
              {formatValue(totalValue)}
            </span>
            <span className="allocation-center-subtitle">Total</span>
          </div>
        </div>
        {/* legend below the chart */}
        <div className="allocation-legend">
          {allocation.map((item) => (
            <div key={item.symbol} className="allocation-legend-item">
              <span
                className="allocation-legend-dot"
                style={{
                  background: COLORS[item.symbol] ?? "#d1d5db",
                }}
              />
              <span className="allocation-legend-name">{item.name}</span>
              <span className="allocation-legend-pct">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
