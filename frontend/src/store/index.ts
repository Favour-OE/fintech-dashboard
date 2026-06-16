import { create } from "zustand"

interface DashboardData {
  holdings: unknown[]
  transactions: unknown[]
  totalValue: number
  monthlyReturn: number
  totalAssets: number
  totalTransactions: number
}

interface AdminSummary {
  totalPortfolioValue: number
  totalAssets: number
  totalTransactions: number
  averageReturn: number
  topPerformer: unknown
  worstPerformer: unknown
}

interface AppState {
  activePage: string
  dashboardData: DashboardData | null
  goals: unknown[]
  adminSummary: AdminSummary | null
  loading: boolean
  error: string | null
  setActivePage: (page: string) => void
  setDashboardData: (data: DashboardData) => void
  setGoals: (goals: unknown[]) => void
  setAdminSummary: (summary: AdminSummary) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  activePage: "dashboard",
  dashboardData: null,
  goals: [],
  adminSummary: null,
  loading: false,
  error: null,
  setActivePage: (page) => set({ activePage: page }),
  setDashboardData: (data) => set({ dashboardData: data }),
  setGoals: (goals) => set({ goals }),
  setAdminSummary: (summary) => set({ adminSummary: summary }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}))
