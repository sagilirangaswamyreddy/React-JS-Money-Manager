import './index.css'

const TransactionItem = props => {
  const {eachTransaction, onDeleteTransaction, optionId} = props
  const {title, amount, alternateText, imageUrl} = eachTransaction

  const onDelete = () => {
    onDeleteTransaction(eachTransaction)
  }

  const typeOfTransaction = optionId === 'INCOME' ? 'Income' : 'Expenses'

  return (
    <>
      <li className="history-item">
        <p className="history-item-tile">{title}</p>
        <p className="history-item-tile">Rs {amount}</p>
        <p className="history-item-tile">{typeOfTransaction}</p>
        <button
          type="button"
          className="btn"
          onClick={onDelete}
          data-testid="delete"
        >
          <img className="img-style" src={imageUrl} alt={alternateText} />
        </button>
      </li>
    </>
  )
}

export default TransactionItem
