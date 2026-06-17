import type { AdminSummaryResponse } from "../../api/admin"
import StatCard from "../shared/StatCard"
import "./AdminStats.css"

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `₦${(n / 1_000).toFixed(1)}K`
  return `₦${n.toLocaleString()}`
}

function formatChange(pct: number): string {
  const sign = pct >= 0 ? "+" : ""
  return `${sign}${pct.toFixed(2)}%`
}

interface AdminStatsProps {
  data: AdminSummaryResponse | null
  loading: boolean
  error: string | null
}

export default function AdminStats({ data, loading, error }: AdminStatsProps) {
  if (loading) {
    return (
      <div className="admin-stats-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="admin-skeleton">
            <div className="skeleton-line skeleton-line--short" />
            <div className="skeleton-line skeleton-line--long" />
          </div>
        ))}
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="admin-stats-grid">
        <div className="admin-stats-error">
          <p>{error ?? "No data"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-stats-grid">
      <StatCard
        label="Total Portfolio Value"
        value={formatCurrency(data.totalPortfolioValue)}
        change={`${data.totalAssets} assets`}
        changeType="neutral"
      />
      <StatCard
        label="Total Assets"
        value={String(data.totalAssets)}
        change={`Across ${data.totalAssets} assets`}
        changeType="neutral"
      />
      <StatCard
        label="Total Transactions"
        value={String(data.totalTransactions)}
        change="This month"
        changeType="neutral"
      />
      <StatCard
        label="Average Return"
        value={formatChange(data.averageReturn)}
        change={formatCurrency(data.totalGainLoss)}
        changeType={data.averageReturn >= 0 ? "up" : "down"}
      />
    </div>
  )
}
