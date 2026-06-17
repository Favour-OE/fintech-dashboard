import apiClient from "./client"

export interface Holding {
  id: number
  symbol: string
  name: string
  shares: number
  avgCost: number
  currentPrice: number
  sector: string
}

export interface Transaction {
  id: number
  type: "buy" | "sell"
  symbol: string
  name: string
  shares: number
  price: number
  amount: number
  date: string
  status: "completed" | "pending" | "failed"
}

export interface DashboardResponse {
  holdings: Holding[]
  transactions: Transaction[]
  priceHistory: Record<string, number[]>
  totalValue: number
  monthlyReturn: number
  totalAssets: number
  totalTransactions: number
}

export async function fetchDashboard(): Promise<DashboardResponse> {
  const { data } = await apiClient.get<DashboardResponse>("/api/dashboard")
  return data
}
