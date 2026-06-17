import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import type { PortfolioPoint } from "../api/dashboard"
import "./PortfolioChart.css"

function formatValue(n: number): string {
  if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `₦${(n / 1_000).toFixed(1)}K`
  return `₦${n.toLocaleString()}`
}

interface PortfolioChartProps {
  data: PortfolioPoint[]
}

export default function PortfolioChart({ data }: PortfolioChartProps) {
  return (
    <div className="portfolio-chart">
      <div className="portfolio-chart-header">
        <h3>Portfolio Performance</h3>
        <select className="period-select">
          <option>6 Months</option>
          <option>3 Months</option>
          <option>1 Year</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
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
            tickFormatter={formatValue}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            width={70}
          />
          <Tooltip
            formatter={(value: number) => [formatValue(value), "Value"]}
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
