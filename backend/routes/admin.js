import { Router } from "express"
import { getSummary } from "../controllers/adminController.js"

const router = Router()

router.get("/summary", getSummary)

export default router
