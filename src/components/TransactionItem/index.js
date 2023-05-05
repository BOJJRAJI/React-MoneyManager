import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteHistory} = props
  const {type, title, id, amount} = transactionDetails

  function onDeleteHistory() {
    deleteHistory(id)
  }
  return (
    <li className="transaction-item">
      <p className="item">{title}</p>
      <p className="item">Rs {amount}</p>
      <p className="item">{type}</p>
      <button
        className="delete-button"
        type="button"
        onClick={onDeleteHistory}
        data-testid="delete"
      >
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
