import { useState, useEffect, useMemo, type FormEvent } from "react"
import { createGoal, updateGoal, type CreateGoalPayload, type UpdateGoalPayload, type Goal } from "../../api/goals"
import { validateGoalForm, type ValidationErrors } from "../../utils/validation"
import "./GoalModal.css"

interface GoalModalProps {
  isOpen: boolean
  onClose: () => void
  onSaved: () => void
  editingGoal?: Goal | null
}

export default function GoalModal({ isOpen, onClose, onSaved, editingGoal }: GoalModalProps) {
  const [name, setName] = useState("")
  const [targetAmount, setTargetAmount] = useState("")
  const [currentAmount, setCurrentAmount] = useState("")
  const [description, setDescription] = useState("")
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [generalError, setGeneralError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const isEdit = !!editingGoal

  useEffect(() => {
    if (editingGoal) {
      setName(editingGoal.name)
      setTargetAmount(String(editingGoal.targetAmount))
      setCurrentAmount(String(editingGoal.currentAmount))
      setDescription(editingGoal.description)
    } else {
      setName("")
      setTargetAmount("")
      setCurrentAmount("")
      setDescription("")
    }
    setErrors({})
    setGeneralError("")
  }, [editingGoal, isOpen])

  function clearFieldError(field: string) {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const isFormInvalid = useMemo(() => {
    const result = validateGoalForm({ name, targetAmount, currentAmount, description })
    return !result.valid
  }, [name, targetAmount, currentAmount, description])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const result = validateGoalForm({ name, targetAmount, currentAmount, description })
    if (!result.valid) {
      setErrors(result.errors)
      return
    }
    setErrors({})
    setSubmitting(true)
    setGeneralError("")
    try {
      if (isEdit && editingGoal) {
        const payload: UpdateGoalPayload = {
          name: name.trim(),
          targetAmount: Number(targetAmount),
          currentAmount: currentAmount ? Number(currentAmount) : 0,
          description: description.trim() || undefined,
        }
        await updateGoal(editingGoal.id, payload)
      } else {
        const payload: CreateGoalPayload = {
          name: name.trim(),
          targetAmount: Number(targetAmount),
          currentAmount: currentAmount ? Number(currentAmount) : undefined,
          description: description.trim() || undefined,
        }
        await createGoal(payload)
      }
      onSaved()
      onClose()
    } catch (err: any) {
      setGeneralError(err?.response?.data?.error ?? err?.message ?? "Failed to save goal")
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
          <span className="modal-title">{isEdit ? "Edit Goal" : "Create New Goal"}</span>
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
              onChange={(e) => { setName(e.target.value); clearFieldError("name") }}
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
              onChange={(e) => { setTargetAmount(e.target.value); clearFieldError("targetAmount") }}
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
              onChange={(e) => { setCurrentAmount(e.target.value); clearFieldError("currentAmount") }}
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
            <button className="btn-primary" type="submit" disabled={submitting || isFormInvalid}>
              {submitting ? "Saving..." : isEdit ? "Save Changes" : "Create Goal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
