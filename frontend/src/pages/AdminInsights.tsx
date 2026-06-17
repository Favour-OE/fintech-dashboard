import { fetchAdminSummary } from "../api/admin"
import AdminStats from "../components/insights/AdminStats"
import PerformerCard from "../components/insights/PerformerCard"
import ClosestGoalCard from "../components/insights/ClosestGoalCard"
import AvgReturnCard from "../components/insights/AvgReturnCard"
import AllocationPie from "../components/insights/AllocationPie"
import ErrorState from "../components/shared/ErrorState"
import usePolling from "../hooks/usePolling"
import "./AdminInsights.css"

export default function AdminInsights() {
  const { data, loading, error, refetch } = usePolling(fetchAdminSummary, 5000)

  if (error && !data) {
    return (
      <div className="insights-page">
        <div className="insights-header">
          <h2>Admin Insights</h2>
        </div>
        <AdminStats data={null} loading={false} error={error} />
        <ErrorState message={error} onRetry={refetch} />
      </div>
    )
  }

  return (
    <div className="insights-page">
      <div className="insights-header">
        <h2>Admin Insights</h2>
      </div>

      <AdminStats data={data} loading={loading} error={error} />

      {loading ? (
        <>
          <div className="insights-performer-row">
            {[1, 2, 3].map((i) => (
              <div key={i} className="performer-skeleton">
                <div className="skeleton-line skeleton-line--label" />
                <div className="skeleton-line skeleton-line--icon-row" />
                <div className="skeleton-line skeleton-line--chart" />
              </div>
            ))}
          </div>
          <div className="insights-bottom-row">
            {[1, 2, 3].map((i) => (
              <div key={i} className="performer-skeleton">
                <div className="skeleton-line skeleton-line--label" />
                <div className="skeleton-line skeleton-line--short" />
                <div className="skeleton-line skeleton-line--long" />
                <div className="skeleton-line skeleton-line--chart" />
              </div>
            ))}
          </div>
        </>
      ) : data ? (
        <>
          <div className="insights-performer-row">
            <PerformerCard
              label="Top Performer"
              asset={data.topPerformer}
              color="#22c55e"
            />
            <PerformerCard
              label="Worst Performer"
              asset={data.worstPerformer}
              color="#ef4444"
            />
            <PerformerCard
              label="Highest Value Asset"
              asset={data.highestValueAsset}
              color="#ea580c"
              variant="highest"
              totalPortfolioValue={data.totalPortfolioValue}
            />
          </div>
          <div className="insights-bottom-row">
            <ClosestGoalCard goal={data.closestGoal} />
            <AvgReturnCard averageReturn={data.averageReturn} />
            <AllocationPie allocation={data.allocationPie} />
          </div>
        </>
      ) : null}
    </div>
  )
}
