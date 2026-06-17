import { goals } from "../mockData.js"

function simulateDelay() {
  const ms = Math.floor(Math.random() * 500) + 300
  return new Promise((resolve) => setTimeout(resolve, ms))
}

let nextId = goals.length + 1

export async function getGoals(_req, res, next) {
  try {
    await simulateDelay()
    res.json(goals)
  } catch (err) {
    next(err)
  }
}

export async function createGoal(req, res, next) {
  try {
    await simulateDelay()
    const goal = {
      id: nextId++,
      name: req.body.name,
      description: req.body.description ?? "",
      targetAmount: req.body.targetAmount,
      currentAmount: req.body.currentAmount ?? 0,
      category: req.body.category ?? "General",
      createdAt: new Date().toISOString().slice(0, 10),
    }
    goals.push(goal)
    res.status(201).json(goal)
  } catch (err) {
    next(err)
  }
}

export async function updateGoal(req, res, next) {
  try {
    await simulateDelay()
    const goal = goals.find((g) => g.id === Number(req.params.id))
    if (!goal) return res.status(404).json({ error: "Goal not found" })

    if (req.body.name != null) goal.name = req.body.name
    if (req.body.description != null) goal.description = req.body.description
    if (req.body.targetAmount != null) goal.targetAmount = req.body.targetAmount
    if (req.body.currentAmount != null)
      goal.currentAmount = req.body.currentAmount
    if (req.body.category != null) goal.category = req.body.category

    res.json(goal)
  } catch (err) {
    next(err)
  }
}

export async function deleteGoal(req, res, next) {
  try {
    await simulateDelay()
    const idx = goals.findIndex((g) => g.id === Number(req.params.id))
    if (idx === -1) return res.status(404).json({ error: "Goal not found" })
    goals.splice(idx, 1)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
