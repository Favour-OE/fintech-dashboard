import type { DashboardResponse } from "../../api/dashboard"
import StatCard from "../shared/StatCard"
import { formatCurrency, formatChange } from "../../utils/format"
import "./DashboardStats.css"

interface DashboardStatsProps {
  data: DashboardResponse | null
  loading: boolean
  error: string | null
}

export default function DashboardStats({ data, loading, error }: DashboardStatsProps) {
  if (loading) {
    return (
      <div className="stats-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="stat-card stat-card--skeleton">
            <div className="skeleton-line skeleton-line--short" />
            <div className="skeleton-line skeleton-line--long" />
            <div className="skeleton-line skeleton-line--short" />
          </div>
        ))}
      </div>
    )
  }

  // error state with page reload as simple retry
  if (error || !data) {
    return (
      <div className="stats-error">
        <p>{error ?? "No data available"}</p>
      </div>
    )
  }

  return (
    <div className="stats-grid">
      <StatCard
        label="Total Portfolio Value"
        value={formatCurrency(data.totalValue)}
        change={formatChange(data.monthlyReturn)}
        changeType={data.monthlyReturn >= 0 ? "up" : "down"}
      />
      <StatCard
        label="Monthly Return"
        value={formatChange(data.monthlyReturn)}
        change={data.monthlyReturn >= 0 ? "Above target" : "Below target"}
        changeType={data.monthlyReturn >= 0 ? "up" : "down"}
      />
      <StatCard
        label="Total Assets"
        value={String(data.totalAssets)}
        change={`${data.totalAssets} holdings`}
        changeType="neutral"
      />
      <StatCard
        label="Total Transactions"
        value={String(data.totalTransactions)}
        change="All time"
        changeType="neutral"
      />
    </div>
  )
}
