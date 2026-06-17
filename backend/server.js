import express from "express"
import cors from "cors"
import dashboardRoutes from "./routes/dashboard.js"

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get("/api", (_req, res) => {
  res.json({ status: "ok" })
})

app.use("/api/dashboard", dashboardRoutes)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: "Internal server error" })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
