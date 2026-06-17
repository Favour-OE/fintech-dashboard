// Dashboard page — assembles all dashboard sections: stats, charts, goals overview, and transactions table
import { useState } from "react"
import DashboardStats from "../components/dashboard/DashboardStats"
import PortfolioChart from "../components/dashboard/PortfolioChart"
import AllocationChart from "../components/dashboard/AllocationChart"
import TransactionsTable from "../components/dashboard/TransactionsTable"
import DashboardGoals from "../components/dashboard/DashboardGoals"
import { fetchDashboard } from "../api/dashboard"
import usePolling from "../hooks/usePolling"
import "./Dashboard.css"

export default function Dashboard() {
  const { data, loading, error, refetch } = usePolling(fetchDashboard, 5000)
  const [period, setPeriod] = useState(6) // default chart period: 6 months

  // slice portfolio history to the selected period
  const chartData = data ? data.portfolioHistory.slice(-period) : []

  // full-page error if the dashboard fetch fails (individual sections have their own error states too)
  if (error && !data) {
    return (
      <div className="dashboard-page">
        <DashboardStats />
        <div className="dashboard-error">
          <p>{error}</p>
          <button type="button" onClick={refetch}>
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
