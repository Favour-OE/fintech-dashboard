# FinTech Dashboard

A fintech dashboard web application for tracking investment portfolios, managing savings goals, and monitoring key financial insights. Built as a 2-day assessment project.

## Scope (per assessment definition)

- **Portfolio Dashboard** — Display portfolio holdings, transactions, and goals with live/periodic price updates (mock data)
- **Savings Goal Tracker** — Create and manage savings goals with visual progress bars
- **Summary & Insights (Admin)** — Overall portfolio summary with top/worst performing assets and key metrics

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 8, Zustand, Recharts, React Router, Axios
- **Backend**: Node.js, Express 5, CORS
- **Styling**: Plain CSS (co-located per component/page)

## Getting Started

### Backend

```bash
cd backend
npm install
npm run dev
```

Server starts on `http://localhost:3001`. Health check: `curl http://localhost:3001/api`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Opens at `http://localhost:5173`. Requires the backend to be running.

## Project Structure

```
fintech-dashboard/
├── frontend/
│   └── src/
│       ├── api/           # Axios client + typed API service layer
│       ├── components/    # Layout, Topbar, shared nav items
│       ├── pages/         # Dashboard, SavingsGoals, AdminInsights, Settings
│       ├── store/         # Zustand global state
│       ├── App.tsx        # React Router routes
│       └── main.tsx       # Entry point
├── backend/
│   ├── server.js          # Express entry point
│   └── mockData.js        # Static mock data
|
├── .env.example
└── README.md
```
