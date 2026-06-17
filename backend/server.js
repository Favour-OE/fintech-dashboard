// Express server entry point — mounts middleware, API routes, and error handler
import express from "express"
import cors from "cors"
import dashboardRoutes from "./routes/dashboard.js"
import goalsRoutes from "./routes/goals.js"

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())              // allow cross-origin requests from the frontend
app.use(express.json())      // parse JSON request bodies

// health-check endpoint
app.get("/api", (_req, res) => {
  res.json({ status: "ok" })
})

// domain routes
app.use("/api/dashboard", dashboardRoutes)
app.use("/api/goals", goalsRoutes)

// global error handler — catches errors thrown in route handlers
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: "Internal server error" })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
