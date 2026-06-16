import { Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import SavingsGoals from "./pages/SavingsGoals"
import AdminInsights from "./pages/AdminInsights"
import Settings from "./pages/Settings"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/goals" element={<SavingsGoals />} />
      <Route path="/insights" element={<AdminInsights />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}
