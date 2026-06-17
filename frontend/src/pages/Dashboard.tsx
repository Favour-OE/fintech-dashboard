import { useEffect, useState } from "react"
import DashboardStats from "../components/DashboardStats"
import PortfolioChart from "../components/PortfolioChart"
import AllocationChart from "../components/AllocationChart"
import TransactionsTable from "../components/TransactionsTable"
import DashboardGoals from "../components/DashboardGoals"
import { fetchDashboard, type DashboardResponse } from "../api/dashboard"
import "./Dashboard.css"

export default function Dashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [period, setPeriod] = useState(6)

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

  const chartData = data ? data.portfolioHistory.slice(-period) : []

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
