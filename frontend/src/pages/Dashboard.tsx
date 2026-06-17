// Dashboard page — assembles all dashboard sections: stats, charts, goals overview, and transactions table
import { useEffect, useState } from "react"
import DashboardStats from "../components/dashboard/DashboardStats"
import PortfolioChart from "../components/dashboard/PortfolioChart"
import AllocationChart from "../components/dashboard/AllocationChart"
import TransactionsTable from "../components/dashboard/TransactionsTable"
import DashboardGoals from "../components/dashboard/DashboardGoals"
import { fetchDashboard, type DashboardResponse } from "../api/dashboard"
import "./Dashboard.css"

export default function Dashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [period, setPeriod] = useState(6) // default chart period: 6 months

  // fetch dashboard data on mount with a reusable load function for retry
  const load = () => {
    setLoading(true)
    setError(null)
    fetchDashboard()
      .then(setData)
      .catch((err) => setError(err?.message ?? "Failed to load dashboard"))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  // slice portfolio history to the selected period
  const chartData = data ? data.portfolioHistory.slice(-period) : []

  // full-page error if the dashboard fetch fails (individual sections have their own error states too)
  if (error && !data) {
    return (
      <div className="dashboard-page">
        <DashboardStats />
        <div className="dashboard-error">
          <p>{error}</p>
          <button type="button" onClick={load}>
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <DashboardStats />

      {/* charts grid — show skeletons while loading, otherwise render the two charts side by side */}
      {loading ? (
        <div className="dashboard-charts">
          <div className="chart-skeleton" />
          <div className="chart-skeleton" />
        </div>
      ) : (
        <div className="dashboard-charts">
          <PortfolioChart
            data={chartData}
            period={period}
            onPeriodChange={setPeriod}
          />
          <AllocationChart
            allocation={data!.allocation}
            totalValue={data!.totalValue}
          />
        </div>
      )}

      <DashboardGoals />
      {data && <TransactionsTable transactions={data.transactions} />}
    </div>
  )
}
