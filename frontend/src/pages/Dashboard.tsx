import { useEffect, useState } from "react"
import DashboardStats from "../components/DashboardStats"
import PortfolioChart from "../components/PortfolioChart"
import AllocationChart from "../components/AllocationChart"
import TransactionsTable from "../components/TransactionsTable"
import { fetchDashboard, type DashboardResponse } from "../api/dashboard"
import "./Dashboard.css"

export default function Dashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState(6)

  useEffect(() => {
    // setLoading(true)
    fetchDashboard()
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const chartData = data
    ? data.portfolioHistory.slice(-period)
    : []

  return (
    <div className="dashboard-page">
      <DashboardStats />
      {loading ? (
        <div className="dashboard-charts">
          <div className="chart-skeleton" />
          <div className="chart-skeleton" />
        </div>
      ) : data ? (
        <div className="dashboard-charts">
          <PortfolioChart
            data={chartData}
            period={period}
            onPeriodChange={setPeriod}
          />
          <AllocationChart
            allocation={data.allocation}
            totalValue={data.totalValue}
          />
        </div>
      ) : null}
      {data && (
        <TransactionsTable transactions={data.transactions} />
      )}
    </div>
  )
}
