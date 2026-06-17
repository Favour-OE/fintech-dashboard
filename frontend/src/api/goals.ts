import apiClient from "./client"

export interface Goal {
  id: number
  name: string
  description: string
  targetAmount: number
  currentAmount: number
  category: string
  createdAt: string
}

export interface CreateGoalPayload {
  name: string
  description: string
  targetAmount: number
  currentAmount: number
  category: string
}

export interface UpdateGoalPayload {
  name?: string
  description?: string
  targetAmount?: number
  currentAmount?: number
  category?: string
}

export async function fetchGoals(): Promise<Goal[]> {
  const { data } = await apiClient.get<Goal[]>("/api/goals")
  return data
}

export async function createGoal(payload: CreateGoalPayload): Promise<Goal> {
  const { data } = await apiClient.post<Goal>("/api/goals", payload)
  return data
}

export async function updateGoal(
  id: number,
  payload: UpdateGoalPayload
): Promise<Goal> {
  const { data } = await apiClient.put<Goal>(`/api/goals/${id}`, payload)
  return data
}

export async function deleteGoal(id: number): Promise<void> {
  await apiClient.delete(`/api/goals/${id}`)
}
