import { useEffect, useState } from "react"
import DashboardStats from "../components/DashboardStats"
import PortfolioChart from "../components/PortfolioChart"
import { fetchDashboard, type DashboardResponse } from "../api/dashboard"
import "./Dashboard.css"

export default function Dashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null)

  useEffect(() => {
    fetchDashboard().then(setData).catch(() => {})
  }, [])

  return (
    <div className="dashboard-page">
      <DashboardStats />
      {data && (
        <div className="dashboard-charts">
          <PortfolioChart data={data.portfolioHistory} />
        </div>
      )}
    </div>
  )
}
