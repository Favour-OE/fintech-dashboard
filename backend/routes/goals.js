// Goals routes — full CRUD for savings goals
import { Router } from "express"
import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goalsController.js"

const router = Router()

router.get("/", getGoals)
router.post("/", createGoal)
router.patch("/:id", updateGoal)
router.delete("/:id", deleteGoal)

export default router
