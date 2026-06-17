// Portfolio performance area chart — Recharts AreaChart with blue gradient fill and a period selector
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import type { PortfolioPoint } from "../../api/dashboard"
import { formatCurrency } from "../../utils/format"
import "./PortfolioChart.css"

interface PortfolioChartProps {
  data: PortfolioPoint[]
  period: number
  onPeriodChange: (period: number) => void
}

const periods = [
  { label: "3 Months", value: 3 },
  { label: "6 Months", value: 6 },
  { label: "1 Year", value: 12 },
]

export default function PortfolioChart({ data, period, onPeriodChange }: PortfolioChartProps) {
  return (
    <div className="portfolio-chart">
      <div className="portfolio-chart-header">
        <h3>Portfolio Performance</h3>
        {/* period selector controls how many months of history to display */}
        <select
          className="period-select"
          value={period}
          onChange={(e) => onPeriodChange(Number(e.target.value))}
        >
          {periods.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            {/* blue gradient that fades to near-transparent at the bottom */}
            <linearGradient id="portfolioFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#2563eb" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e8eaed" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
          />
          <YAxis
            tickFormatter={formatCurrency}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            width={70}
          />
          <Tooltip
            formatter={(value) => [formatCurrency(Number(value) || 0), "Value"]}
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #e8eaed",
              fontSize: 13,
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2}
            fill="url(#portfolioFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
