import "./ErrorState.css"

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export default function ErrorState({ message = "Something went wrong", onRetry }: ErrorStateProps) {
  return (
    <div className="error-state">
      <svg className="error-state-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
      <p className="error-state-message">{message}</p>
      {onRetry && (
        <button className="error-state-btn" type="button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  )
}
