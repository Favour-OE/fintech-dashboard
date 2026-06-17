// Admin API — summary/insights data for the Admin Insights page
import apiClient from "./client"
import type { Holding } from "./dashboard"

export interface AdminSummaryResponse {
  totalPortfolioValue: number
  totalAssets: number
  totalTransactions: number
  averageReturn: number
  topPerformer: Holding | null
  worstPerformer: Holding | null
}

export async function fetchAdminSummary(): Promise<AdminSummaryResponse> {
  const { data } = await apiClient.get<AdminSummaryResponse>("/admin")
  return data
}
