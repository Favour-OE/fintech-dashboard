# FinTech Dashboard

A fintech dashboard web application for tracking investment portfolios, managing savings goals, and monitoring key financial insights. Built as a 2-day assessment project.

## Prerequisites

- **Node.js 18+** — runtime for both frontend and backend
- **npm** — package manager

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 19 + TypeScript | UI framework |
| **Build tool** | Vite 8 | Dev server & bundling |
| **State** | Zustand 5 | Global state management (scaffolded) |
| **Charts** | Recharts 3 | Portfolio performance & allocation charts |
| **Routing** | React Router 7 | Client-side navigation |
| **HTTP** | Axios 1 | API client |
| **Backend** | Node.js + Express 5 | REST API |
| **Testing** | Manual (no test framework) | E2E flows verified |
| **Styling** | Plain CSS (co-located) | Component-scoped stylesheets |

## Architecture Decisions

- **Why Zustand?** Lightweight, TypeScript-native state management with no boilerplate. Scaffolded for future use — current pages use local state with a polling hook for simplicity.
- **Why Recharts?** Declarative charting API that integrates naturally with React. Provides area, pie, and responsive containers out of the box.
- **Why Express 5?** Minimal, unopinionated Node.js framework suitable for a mock API layer. The async error handling in Express 5 simplifies controller code.
- **Why plain CSS?** Zero runtime overhead, no build complexity. Each component's styles are co-located in accompanying `.css` files using a BEM-like naming convention.
- **Why polling over WebSockets?** Simpler to implement and sufficient for a mock-data demo. A production system would use SSE or WebSockets for real-time updates.

## Setup

### 1. Clone & install

```bash
git clone https://github.com/Favour-OE/fintech-dashboard.git
cd fintech-dashboard

# Install backend
cd backend && npm install

# Install frontend
cd ../frontend && npm install
```

### 2. Environment variables

Copy the example env file and adjust if needed:

```bash
cp .env.example backend/.env   # optional — defaults work out of the box
```

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3001` | Backend server port |
| `NODE_ENV` | `development` | Environment mode |
| `CORS_ORIGIN` | (see config) | Comma-separated allowed origins |
| `VITE_API_URL` | `http://localhost:3001/api` | Backend URL for the frontend Axios client |
| `VITE_API_TIMEOUT` | `10000` | API request timeout in ms |

### 3. Start the backend

```bash
cd backend
npm run dev
```

Server starts at `http://localhost:3001`. Health check: `curl http://localhost:3001/api`

The price simulator starts automatically and logs price changes to the console every 5–10 seconds.

### 4. Start the frontend

```bash
cd frontend
npm run dev
```

Opens at `http://localhost:5173`. Requires the backend to be running.

### Build for production

```bash
cd frontend
npm run build       # tsc + vite build → output in frontend/dist/
npm run preview     # serve the built files locally
```

## Project Structure

```
fintech-dashboard/
├── frontend/
│   └── src/
│       ├── api/              # Axios client + typed API modules
│       │   ├── client.ts     #   shared Axios instance (baseURL, timeout)
│       │   ├── dashboard.ts  #   GET /api/dashboard
│       │   ├── goals.ts      #   CRUD /api/goals
│       │   └── admin.ts      #   GET /api/admin/summary
│       ├── components/
│       │   ├── dashboard/    # DashboardStats, PortfolioChart, AllocationChart,
│       │   │                 #   TransactionsTable, DashboardGoals
│       │   ├── goals/        # GoalCard, GoalModal
│       │   ├── insights/     # AdminStats, PerformerCard, ClosestGoalCard,
│       │   │                 #   AvgReturnCard, AllocationPie
│       │   ├── layout/       # Layout, Topbar, navItems
│       │   └── shared/       # StatCard, Skeleton, ErrorBoundary, ErrorState
│       ├── hooks/
│       │   ├── usePolling.ts #   periodic data fetch with in-flight guard
│       │   └── useCountUp.ts #   animated number counter
│       ├── pages/
│       │   ├── Dashboard.tsx       # portfolio overview + 5s polling
│       │   ├── SavingsGoals.tsx    # goal CRUD (manual fetch)
│       │   ├── AdminInsights.tsx   # analytics + 5s polling
│       │   └── Settings.tsx        # account form (UI only)
│       ├── store/
│       │   └── index.ts     # Zustand store (scaffolded)
│       ├── utils/
│       │   ├── format.ts    # formatCurrency, formatChange
│       │   └── validation.ts # validateGoalForm, validateTransaction
│       ├── App.tsx          # React Router routes
│       ├── main.tsx         # Entry point
│       └── index.css        # Global reset & base styles
├── backend/
│   ├── server.js            # Express app, middleware, routes, error handler
│   ├── utils.js             # simulateDelay, simulateError, validateId
│   ├── mockData.js          # holdings, transactions, goals, priceHistory
│   ├── services/
│   │   └── priceSimulator.js # background price fluctuation every 5–10s
│   ├── controllers/
│   │   ├── dashboardController.js
│   │   ├── goalsController.js
│   │   └── adminController.js
│   └── routes/
│       ├── dashboard.js
│       ├── goals.js
│       └── admin.js
├── docs/
│   ├── definition.md        # original assessment spec
│   └── phases/              # implementation plan by phase
├── .env.example
├── vercel.json              # monorepo deployment config
└── README.md
```

## Features

### Portfolio Dashboard (`/dashboard`)
- 4 stat cards: total value, monthly return, asset count, transaction count
- **Portfolio Performance** — area chart with 3-month / 6-month / 1-year views
- **Asset Allocation** — donut chart with per-asset legend
- **Recent Transactions** — table with type/status badges
- **Goal Overview** — up to 4 compact progress cards
- Data refreshes every 5 seconds (prices fluctuate via backend simulator)

### Savings Goals (`/goals`)
- Create, edit, and delete savings goals
- Form validation: required name, target > 0, current ≤ target, name ≤ 100 chars
- Animated progress bars; "Completed!" badge at 100%; "N/A" for 0-target goals
- Empty state with "Create your first goal" CTA

### Admin Insights (`/insights`)
- 4 aggregate stat cards
- Top performer, worst performer, highest-value asset with mini sparkline charts
- Closest goal card, average monthly return, allocation breakdown
- Data refreshes every 5 seconds

### Settings (`/settings`)
- Account settings form (prefilled, UI only — no backend)

## API Reference

| Method | Endpoint | Description | Status Codes |
|---|---|---|---|
| `GET` | `/api` | Health check | 200 |
| `GET` | `/api/dashboard` | Portfolio summary, holdings, transactions, history | 200, 500 |
| `GET` | `/api/goals` | List all goals | 200, 500 |
| `POST` | `/api/goals` | Create a goal | 201, 400, 500 |
| `PATCH` | `/api/goals/:id` | Update a goal | 200, 400, 404, 500 |
| `DELETE` | `/api/goals/:id` | Delete a goal | 204, 404, 500 |
| `GET` | `/api/admin/summary` | Admin summary with performers and allocation | 200, 500 |

All endpoints simulate 300–800ms latency. Goals endpoints have a 5% random error rate to test frontend resilience.

## Assumptions

1. **Single-user application** — no authentication, no user context. All data is shared in-memory.
2. **Mock data only** — prices are synthetic and fluctuate within ±5% of initial values. No real market data.
3. **Naira (NGN) currency** — all monetary values displayed in Nigerian Naira.
4. **No persistence** — goals created/edited are lost on server restart. A database is not required per the assessment scope.
5. **Desktop-first** — responsive layouts target mobile and tablet but the primary design is desktop.
6. **Chrome/Chromium browsers** — tested primarily in Chrome. Some CSS features (CSS Grid, flexbox gap) may behave differently in older browsers.
