import { holdings, transactions, goals, priceHistory } from "../mockData.js"
import { simulateDelay, simulateError } from "../utils.js"

const SYMBOL_ICONS = {
  BTC: "\u20BF",
  ETH: "\u039E",
  TSLA: "T",
  AAPL: "A",
  GBP: "\u00A3",
}

function gainPercent(holding) {
  return ((holding.currentPrice - holding.avgCost) / holding.avgCost) * 100
}

function totalValue(holding) {
  return holding.shares * holding.currentPrice
}

export async function getSummary(_req, res, next) {
  try {
    await simulateDelay()
    simulateError()

    const totalPortfolioValue = holdings.reduce(
      (sum, h) => sum + totalValue(h),
      0
    )
    const totalGainLoss = holdings.reduce(
      (sum, h) => sum + (h.currentPrice - h.avgCost) * h.shares,
      0
    )
    const totalAssets = holdings.length
    const totalTransactions = transactions.length

    const gains = holdings.map((h) => ({
      ...h,
      gainPct: gainPercent(h),
      totalValue: totalValue(h),
    }))

    const averageReturn =
      gains.length > 0
        ? gains.reduce((sum, h) => sum + h.gainPct, 0) / gains.length
        : 0

    const topPerformerData = [...gains].sort(
      (a, b) => b.gainPct - a.gainPct
    )[0]
    const worstPerformerData = [...gains].sort(
      (a, b) => a.gainPct - b.gainPct
    )[0]

    const highestValueData = [...gains].sort(
      (a, b) => b.totalValue - a.totalValue
    )[0]

    function performerShape(holdingData) {
      if (!holdingData) return null
      const prices = priceHistory[holdingData.symbol] ?? []
      return {
        symbol: holdingData.symbol,
        name: holdingData.name,
        value: Math.round(holdingData.totalValue),
        changePercent: Math.round(holdingData.gainPct * 100) / 100,
        icon: SYMBOL_ICONS[holdingData.symbol] ?? holdingData.symbol.charAt(0),
        miniChart: prices.slice(-10),
      }
    }

    const topPerformer = performerShape(topPerformerData)
    const worstPerformer = performerShape(worstPerformerData)
    const highestValueAsset = performerShape(highestValueData)

    const goalWithPct = goals
      .filter((g) => g.targetAmount > 0)
      .map((g) => ({
        ...g,
        progressPct: Math.min(
          Math.round((g.currentAmount / g.targetAmount) * 100),
          100
        ),
      }))
      .sort((a, b) => b.progressPct - a.progressPct)

    const closestGoal = goalWithPct.length > 0 ? goalWithPct[0] : null

    const allocationPie = holdings.map((h) => ({
      symbol: h.symbol,
      name: h.name,
      value: Math.round(totalValue(h)),
      percentage:
        totalPortfolioValue > 0
          ? Math.round((totalValue(h) / totalPortfolioValue) * 10000) / 100
          : 0,
    }))

    res.json({
      totalPortfolioValue: Math.round(totalPortfolioValue),
      totalGainLoss: Math.round(totalGainLoss),
      totalAssets,
      totalTransactions,
      averageReturn: Math.round(averageReturn * 100) / 100,
      topPerformer,
      worstPerformer,
      highestValueAsset,
      closestGoal: closestGoal
        ? {
            id: closestGoal.id,
            name: closestGoal.name,
            progressPct: closestGoal.progressPct,
            currentAmount: closestGoal.currentAmount,
            targetAmount: closestGoal.targetAmount,
            color: closestGoal.color,
          }
        : null,
      allocationPie,
    })
  } catch (err) {
    next(err)
  }
}
