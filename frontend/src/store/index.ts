// Global state store (Zustand) — holds dashboard data, goals, admin summary, and UI state
import { create } from "zustand"
import type { DashboardResponse } from "../api/dashboard"
import type { Goal } from "../api/goals"
import type { AdminSummaryResponse } from "../api/admin"

interface AppState {
  activePage: string
  dashboardData: DashboardResponse | null
  goals: Goal[]
  adminSummary: AdminSummaryResponse | null
  loading: boolean
  error: string | null
  setActivePage: (page: string) => void
  setDashboardData: (data: DashboardResponse) => void
  setGoals: (goals: Goal[]) => void
  setAdminSummary: (summary: AdminSummaryResponse) => void
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

  // setters replace the entire value for each slice of state
  setActivePage: (page) => set({ activePage: page }),
  setDashboardData: (data) => set({ dashboardData: data }),
  setGoals: (goals) => set({ goals }),
  setAdminSummary: (summary) => set({ adminSummary: summary }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}))
