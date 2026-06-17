export interface ValidationErrors {
  [field: string]: string
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationErrors
}

export interface GoalFormData {
  name: string
  targetAmount: string
  currentAmount: string
  description: string
}

export function validateGoalForm(data: GoalFormData): ValidationResult {
  const errors: ValidationErrors = {}
  const { name, targetAmount, currentAmount } = data

  if (!name.trim()) {
    errors.name = "Goal name is required"
  } else if (name.trim().length > 100) {
    errors.name = "Goal name must be 100 characters or less"
  }

  if (!targetAmount || isNaN(Number(targetAmount)) || Number(targetAmount) <= 0) {
    errors.targetAmount = "Target amount must be greater than 0"
  } else {
    const target = Number(targetAmount)
    if (target > 1_000_000_000) {
      errors.targetAmount = "Target amount cannot exceed ₦1,000,000,000"
    }

    if (currentAmount) {
      const current = Number(currentAmount)
      if (isNaN(current) || current < 0) {
        errors.currentAmount = "Current amount must be 0 or greater"
      } else if (target > 0 && current > target) {
        errors.currentAmount = "Current amount cannot exceed target amount"
      }
    }
  }

  return { valid: Object.keys(errors).length === 0, errors }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function validateTransaction(_data: unknown): ValidationResult {
  return { valid: true, errors: {} }
}
