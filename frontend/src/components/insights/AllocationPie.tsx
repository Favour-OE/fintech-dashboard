import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import type { AllocationItem } from "../../api/admin"
import "./AllocationPie.css"

const COLORS: Record<string, string> = {
  BTC: "#3b82f6",
  ETH: "#8b5cf6",
  TSLA: "#ef4444",
  AAPL: "#22c55e",
}

interface AllocationPieProps {
  allocation: AllocationItem[]
}

export default function AllocationPie({ allocation }: AllocationPieProps) {
  return (
    <div className="allocation-pie-card">
      <div className="allocation-pie-label">Asset Allocation</div>
      <div className="allocation-pie-body">
        <div className="allocation-pie-donut">
          <ResponsiveContainer width={80} height={80}>
            <PieChart>
              <Pie
                data={allocation}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={24}
                outerRadius={38}
                stroke="none"
              >
                {allocation.map((entry) => (
                  <Cell
                    key={entry.symbol}
                    fill={COLORS[entry.symbol] ?? "#d1d5db"}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="allocation-pie-legend">
          {allocation.map((item) => (
            <div key={item.symbol} className="allocation-pie-legend-item">
              <span
                className="allocation-pie-dot"
                style={{ background: COLORS[item.symbol] ?? "#d1d5db" }}
              />
              <span className="allocation-pie-name">{item.name}</span>
              <span className="allocation-pie-pct">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
