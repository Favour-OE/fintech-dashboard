import type { Transaction } from "../api/dashboard"
import "./TransactionsTable.css"

interface TransactionsTableProps {
  transactions: Transaction[]
}

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `₦${(n / 1_000).toFixed(1)}K`
  return `₦${n.toLocaleString()}`
}

export default function TransactionsTable({
  transactions,
}: TransactionsTableProps) {
  return (
    <div className="transactions-table-wrapper">
      <div className="transactions-table-header">
        <h3>Recent Transactions</h3>
        <a href="" className="view-all-link">
          View all
        </a>
      </div>
      <div className="transactions-table-container">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Asset</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td className="tx-date">{tx.date}</td>
                <td className="tx-asset">
                  <span className="tx-symbol">{tx.symbol}</span>
                  <span className="tx-name">{tx.name}</span>
                </td>
                <td>
                  <span
                    className={`tx-type tx-type--${tx.type}`}
                  >
                    {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                  </span>
                </td>
                <td className="tx-amount">{formatCurrency(tx.amount)}</td>
                <td className="tx-price">{formatCurrency(tx.price)}</td>
                <td>
                  <span
                    className={`tx-status tx-status--${tx.status}`}
                  >
                    {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
