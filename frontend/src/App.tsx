// Root router — all routes are children of Layout so the topbar and mobile nav persist across pages
import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Dashboard from "./pages/Dashboard"
import SavingsGoals from "./pages/SavingsGoals"
import AdminInsights from "./pages/AdminInsights"
import Settings from "./pages/Settings"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/goals" element={<SavingsGoals />} />
        <Route path="/insights" element={<AdminInsights />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
