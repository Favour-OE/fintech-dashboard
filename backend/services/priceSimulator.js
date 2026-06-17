import { holdings } from "../mockData.js"

const STABLE_SYMBOLS = new Set(["GBP"])

const originalPrices = new Map()
for (const h of holdings) {
  originalPrices.set(h.symbol, h.currentPrice)
}

function randomInterval() {
  return Math.floor(Math.random() * 5000) + 5000
}

function tick() {
  const symbols = holdings.filter((h) => !STABLE_SYMBOLS.has(h.symbol)).map((h) => h.symbol)
  const count = Math.random() < 0.5 ? 1 : 2
  const shuffled = [...symbols].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, count)

  for (const symbol of selected) {
    const holding = holdings.find((h) => h.symbol === symbol)
    if (!holding) continue

    const change = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1)
    const original = originalPrices.get(symbol)
    const newPrice = holding.currentPrice * (1 + change / 100)
    const maxPrice = original * 1.05
    const minPrice = original * 0.95

    holding.currentPrice = Math.round(Math.min(maxPrice, Math.max(minPrice, newPrice)))

    console.log(
      `[PriceSimulator] ${symbol}: ${holding.currentPrice.toLocaleString()} (${change >= 0 ? "+" : ""}${change.toFixed(1)}%)`
    )
  }

  setTimeout(tick, randomInterval())
}

export function start() {
  setTimeout(tick, randomInterval())
  console.log("[PriceSimulator] Started — fluctuating prices every 5-10s")
}

export function stop() {
  // for future use — clearTimeout tracking if needed
}
