import express from "express"
import cors from "cors"
import dashboardRoutes from "./routes/dashboard.js"
import goalsRoutes from "./routes/goals.js"
import adminRoutes from "./routes/admin.js"
import { start as startPriceSimulator } from "./services/priceSimulator.js"

const app = express()
const PORT = process.env.PORT || 3001

const ALLOWED_ORIGINS = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["http://localhost:5173", "http://localhost:4173", "http://127.0.0.1:5173", "http://127.0.0.1:4173"]

app.use(cors({ origin: ALLOWED_ORIGINS, credentials: true }))
app.use(express.json())

app.use((req, res, next) => {
  const start = Date.now()
  res.on("finish", () => {
    const ms = Date.now() - start
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms`)
  })
  next()
})

app.get("/api", (_req, res) => {
  res.json({ status: "ok" })
})

app.use("/api/dashboard", dashboardRoutes)
app.use("/api/goals", goalsRoutes)
app.use("/api/admin", adminRoutes)

app.use((err, _req, res, _next) => {
  const status = err.status || 500
  const message =
    status === 500 ? "Internal server error" : err.message
  if (status === 500) console.error(err)
  res.status(status).json({ error: message, status })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  startPriceSimulator()
})
