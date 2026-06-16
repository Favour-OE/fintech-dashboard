import { NavLink } from "react-router-dom"
import { navItems } from "./navItems"
import "./Topbar.css"

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-logo">
          <div className="logo-icon">F</div>
          <span className="logo-text">FinTech</span>
        </div>
      </div>
      <div className="topbar-center">
        <nav className="top-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `top-nav-item${isActive ? " active" : ""}`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="topbar-right">
        <div className="market-status">
          <span className="dot" /> Live
        </div>
        <button className="icon-btn" type="button" aria-label="Notifications">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
        <button className="icon-btn" type="button" aria-label="Refresh">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 4v6h6" />
            <path d="M23 20v-6h-6" />
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
          </svg>
        </button>
        <div className="user-avatar">FE</div>
      </div>
    </header>
  )
}
