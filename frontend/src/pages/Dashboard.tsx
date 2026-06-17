import { useEffect, useState } from "react"
import DashboardStats from "../components/DashboardStats"
import PortfolioChart from "../components/PortfolioChart"
import { fetchDashboard, type DashboardResponse } from "../api/dashboard"
import "./Dashboard.css"

export default function Dashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchDashboard()
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

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
          <PortfolioChart data={data.portfolioHistory} />
        </div>
      ) : null}
    </div>
  )
}
