import { useState, type FormEvent } from "react"
import { createGoal, type CreateGoalPayload } from "../../api/goals"
import "./GoalModal.css"

interface GoalModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: () => void
}

interface FieldErrors {
  name?: string
  targetAmount?: string
  currentAmount?: string
}

export default function GoalModal({ isOpen, onClose, onCreated }: GoalModalProps) {
  const [name, setName] = useState("")
  const [targetAmount, setTargetAmount] = useState("")
  const [currentAmount, setCurrentAmount] = useState("")
  const [description, setDescription] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [generalError, setGeneralError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  function reset() {
    setName("")
    setTargetAmount("")
    setCurrentAmount("")
    setDescription("")
    setErrors({})
    setGeneralError("")
  }

  function validate(): boolean {
    const e: FieldErrors = {}
    if (!name.trim()) e.name = "Goal name is required"
    const target = Number(targetAmount)
    if (!targetAmount || isNaN(target) || target <= 0)
      e.targetAmount = "Target amount must be greater than 0"
    const current = currentAmount ? Number(currentAmount) : 0
    if (currentAmount && (isNaN(current) || current < 0))
      e.currentAmount = "Current amount must be 0 or greater"
    if (current > target)
      e.currentAmount = "Current amount cannot exceed target"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setGeneralError("")
    try {
      const payload: CreateGoalPayload = {
        name: name.trim(),
        targetAmount: Number(targetAmount),
        currentAmount: currentAmount ? Number(currentAmount) : undefined,
        description: description.trim() || undefined,
      }
      await createGoal(payload)
      reset()
      onCreated()
      onClose()
    } catch (err: any) {
      setGeneralError(err?.response?.data?.error ?? err?.message ?? "Failed to create goal")
    } finally {
      setSubmitting(false)
    }
  }

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay modal-overlay--open" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">Create New Goal</span>
          <button className="modal-close" onClick={onClose} type="button">×</button>
        </div>
        <form onSubmit={handleSubmit}>
          {generalError && (
            <div className="form-error form-error--general">{generalError}</div>
          )}
          <div className="form-group">
            <label className="form-label" htmlFor="goalName">Goal Name</label>
            <input
              id="goalName"
              className={`form-input${errors.name ? " form-input--error" : ""}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Emergency Fund"
            />
            {errors.name && <div className="form-error">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="goalTarget">Target Amount (₦)</label>
            <input
              id="goalTarget"
              className={`form-input${errors.targetAmount ? " form-input--error" : ""}`}
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="e.g. 1000000"
            />
            {errors.targetAmount && <div className="form-error">{errors.targetAmount}</div>}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="goalCurrent">Current Amount (₦)</label>
            <input
              id="goalCurrent"
              className={`form-input${errors.currentAmount ? " form-input--error" : ""}`}
              type="number"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
              placeholder="e.g. 250000"
            />
            {errors.currentAmount && <div className="form-error">{errors.currentAmount}</div>}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="goalDesc">Description (Optional)</label>
            <textarea
              id="goalDesc"
              className="form-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any notes about this goal..."
            />
          </div>
          <div className="modal-actions">
            <button className="btn-secondary" type="button" onClick={onClose}>Cancel</button>
            <button className="btn-primary" type="submit" disabled={submitting}>
              {submitting ? "Creating..." : "Create Goal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
