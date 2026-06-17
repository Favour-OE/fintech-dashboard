export function formatCurrency(n: number): string {
  const abs = Math.abs(n)
  let formatted
  if (abs >= 1_000_000) formatted = `${(abs / 1_000_000).toFixed(1)}M`
  else if (abs >= 1_000) formatted = `${(abs / 1_000).toFixed(0)}K`
  else formatted = abs.toLocaleString()
  return n < 0 ? `-₦${formatted}` : `₦${formatted}`
}

export function formatCurrencyPrecise(n: number): string {
  const abs = Math.abs(n)
  const formatted = abs.toLocaleString()
  return n < 0 ? `-₦${formatted}` : `₦${formatted}`
}

export function formatChange(pct: number): string {
  const sign = pct >= 0 ? "+" : ""
  return `${sign}${pct.toFixed(2)}%`
}
