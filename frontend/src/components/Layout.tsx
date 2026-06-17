// Page shell — renders Topbar at the top, the active page via <Outlet />, and a fixed bottom tab nav on mobile
import { NavLink, Outlet } from "react-router-dom"
import Topbar from "./Topbar"
import { navItems } from "./navItems"
import "./Layout.css"

export default function Layout() {
  return (
    <div className="app">
      <Topbar />
      <div className="page-body">
        <Outlet />
      </div>
      {/* Mobile-only bottom navigation bar */}
      <nav className="mobile-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `mobile-nav-item${isActive ? " active" : ""}`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
