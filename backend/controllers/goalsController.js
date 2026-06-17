// Goals controller — full CRUD for savings goals backed by the in-memory mock data array.
import { goals } from "../mockData.js"

// random delay between 300-800ms to simulate real API latency
function simulateDelay() {
	const ms = Math.floor(Math.random() * 500) + 300;
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function simulateError() {
	if (Math.random() < 0.05) {
		throw new Error("Internal server error");
	}
}

let nextId = goals.length + 1;

const GOAL_PALETTE = [
	{ color: "#3b82f6", icon: "S" },
	{ color: "#8b5cf6", icon: "T" },
	{ color: "#ef4444", icon: "P" },
	{ color: "#22c55e", icon: "R" },
	{ color: "#f59e0b", icon: "G" },
	{ color: "#06b6d4", icon: "H" },
];
let paletteIndex = 0;

function addProgressPercent(goal) {
	const progressPercent = Math.min(
		Math.round((goal.currentAmount / goal.targetAmount) * 100),
		100
	);
	return { ...goal, progressPercent };
}

export async function getGoals(_req, res, next) {
	try {
		await simulateDelay();
		simulateError();
		res.json(goals.map(addProgressPercent));
	} catch (err) {
		next(err);
	}
}

export async function createGoal(req, res, next) {
	try {
		await simulateDelay();
		simulateError();

		const { name, targetAmount, currentAmount, description } = req.body;

		if (!name || typeof name !== "string" || !name.trim()) {
			return res.status(400).json({ error: "Name is required" });
		}
		if (
			targetAmount == null ||
			typeof targetAmount !== "number" ||
			targetAmount <= 0
		) {
			return res
				.status(400)
				.json({ error: "Target amount must be greater than 0" });
		}
		if (
			currentAmount != null &&
			(typeof currentAmount !== "number" || currentAmount < 0)
		) {
			return res
				.status(400)
				.json({ error: "Current amount must be 0 or greater" });
		}

		const palette = GOAL_PALETTE[paletteIndex % GOAL_PALETTE.length];
		paletteIndex++;

		const goal = {
			id: nextId++,
			name: name.trim(),
			description: description ?? "",
			targetAmount,
			currentAmount: currentAmount ?? 0,
			category: "General",
			color: palette.color,
			icon: palette.icon,
			createdAt: new Date().toISOString().slice(0, 10),
		};
		goals.push(goal);
		res.status(201).json(addProgressPercent(goal));
	} catch (err) {
		next(err);
	}
}

export async function updateGoal(req, res, next) {
	try {
		await simulateDelay();
		simulateError();

		const goal = goals.find((g) => g.id === Number(req.params.id));
		if (!goal) return res.status(404).json({ error: "Goal not found" });

		if (req.body.name != null) goal.name = req.body.name;
		if (req.body.description != null)
			goal.description = req.body.description;
		if (req.body.targetAmount != null)
			goal.targetAmount = req.body.targetAmount;
		if (req.body.currentAmount != null)
			goal.currentAmount = req.body.currentAmount;
		if (req.body.category != null) goal.category = req.body.category;

		res.json(addProgressPercent(goal));
	} catch (err) {
		next(err);
	}
}

export async function deleteGoal(req, res, next) {
	try {
		await simulateDelay();
		simulateError();

		const idx = goals.findIndex((g) => g.id === Number(req.params.id));
		if (idx === -1)
			return res.status(404).json({ error: "Goal not found" });
		goals.splice(idx, 1);
		res.status(204).end();
	} catch (err) {
		next(err);
	}
}
