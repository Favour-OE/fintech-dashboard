import { goals } from "../mockData.js"
import { simulateDelay, simulateError, validateId } from "../utils.js"

let nextId = goals.length + 1

const GOAL_COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#ef4444",
  "#22c55e",
  "#f59e0b",
  "#06b6d4",
]
let colorIndex = 0

function addProgressPercent(goal) {
  const progressPercent = goal.targetAmount > 0
    ? Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100)
    : 0
  return { ...goal, progressPercent }
}

export async function getGoals(_req, res, next) {
  try {
    await simulateDelay()
    simulateError()
    res.json(goals.map(addProgressPercent))
  } catch (err) {
    next(err)
  }
}

export async function createGoal(req, res, next) {
  try {
    await simulateDelay()
    simulateError()

    const { name, targetAmount, currentAmount, description } = req.body

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Name is required", status: 400 })
    }
    if (name.trim().length > 100) {
      return res.status(400).json({ error: "Name must be 100 characters or less", status: 400 })
    }
    if (targetAmount == null || typeof targetAmount !== "number" || targetAmount <= 0) {
      return res.status(400).json({ error: "Target amount must be greater than 0", status: 400 })
    }
    if (targetAmount > 1_000_000_000) {
      return res.status(400).json({ error: "Target amount cannot exceed 1,000,000,000", status: 400 })
    }
    if (currentAmount != null && (typeof currentAmount !== "number" || currentAmount < 0)) {
      return res.status(400).json({ error: "Current amount must be 0 or greater", status: 400 })
    }
    if (currentAmount != null && targetAmount > 0 && currentAmount > targetAmount) {
      return res.status(400).json({ error: "Current amount cannot exceed target amount", status: 400 })
    }

    const color = GOAL_COLORS[colorIndex % GOAL_COLORS.length]
    colorIndex++

    const goal = {
      id: nextId++,
      name: name.trim(),
      description: description ?? "",
      targetAmount,
      currentAmount: currentAmount ?? 0,
      category: "General",
      color,
      icon: name.trim().charAt(0).toUpperCase(),
      createdAt: new Date().toISOString().slice(0, 10),
    }
    goals.push(goal)
    res.status(201).json(addProgressPercent(goal))
  } catch (err) {
    next(err)
  }
}

export async function updateGoal(req, res, next) {
  try {
    await simulateDelay()
    simulateError()

    const id = validateId(req.params.id)
    const goal = goals.find((g) => g.id === id)
    if (!goal) return res.status(404).json({ error: "Goal not found", status: 404 })

    if (req.body.name != null) {
      if (typeof req.body.name !== "string" || !req.body.name.trim()) {
        return res.status(400).json({ error: "Name must be a non-empty string", status: 400 })
      }
      goal.name = req.body.name.trim()
    }
    if (req.body.description != null) goal.description = req.body.description
    if (req.body.targetAmount != null) {
      if (typeof req.body.targetAmount !== "number" || req.body.targetAmount <= 0) {
        return res.status(400).json({ error: "Target amount must be greater than 0", status: 400 })
      }
      goal.targetAmount = req.body.targetAmount
    }
    if (req.body.currentAmount != null) {
      if (typeof req.body.currentAmount !== "number" || req.body.currentAmount < 0) {
        return res.status(400).json({ error: "Current amount must be 0 or greater", status: 400 })
      }
      goal.currentAmount = req.body.currentAmount
    }
    if (req.body.category != null) goal.category = req.body.category

    res.json(addProgressPercent(goal))
  } catch (err) {
    next(err)
  }
}

export async function deleteGoal(req, res, next) {
  try {
    await simulateDelay()
    simulateError()

    const id = validateId(req.params.id)
    const idx = goals.findIndex((g) => g.id === id)
    if (idx === -1) return res.status(404).json({ error: "Goal not found", status: 404 })
    goals.splice(idx, 1)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
