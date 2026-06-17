import { holdings, transactions, priceHistory } from "../mockData.js"

function simulateDelay() {
  const ms = Math.floor(Math.random() * 500) + 300
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getDashboard(_req, res, next) {
  try {
    await simulateDelay()

    const totalValue = holdings.reduce(
      (sum, h) => sum + h.shares * h.currentPrice,
      0
    )
    const totalCost = holdings.reduce(
      (sum, h) => sum + h.shares * h.avgCost,
      0
    )
    const monthlyReturn =
      totalCost > 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0
    const totalAssets = holdings.length
    const totalTransactions = transactions.length

    const recentTransactions = [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    const pointCount = Math.min(priceHistory.BTC?.length ?? 6, 6)
    const startIdx = priceHistory.BTC
      ? priceHistory.BTC.length - pointCount
      : 0
    const portfolioHistory = months.slice(-pointCount).map((month, i) => {
      const idx = startIdx + i
      const value = holdings.reduce((sum, h) => {
        const prices = priceHistory[h.symbol]
        const price = prices && prices[idx] != null ? prices[idx] : h.currentPrice
        return sum + h.shares * price
      }, 0)
      return { month, value: Math.round(value) }
    })

    const allocation = holdings.map((h) => ({
      symbol: h.symbol,
      name: h.name,
      value: h.shares * h.currentPrice,
      percentage:
        totalValue > 0
          ? Math.round(((h.shares * h.currentPrice) / totalValue) * 10000) /
            100
          : 0,
    }))

    res.json({
      holdings,
      transactions: recentTransactions,
      totalValue: Math.round(totalValue),
      monthlyReturn: Math.round(monthlyReturn * 100) / 100,
      totalAssets,
      totalTransactions,
      allocation,
      portfolioHistory,
    })
  } catch (err) {
    next(err)
  }
}
