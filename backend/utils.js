export function simulateDelay() {
  const ms = Math.floor(Math.random() * 500) + 300
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function simulateError() {
  if (Math.random() < 0.05) {
    throw new Error("Internal server error")
  }
}

export function validateId(raw) {
  const id = Number(raw)
  if (!Number.isInteger(id) || id <= 0) {
    const err = new Error("Invalid ID format")
    err.status = 400
    throw err
  }
  return id
}
