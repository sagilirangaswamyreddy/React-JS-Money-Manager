import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const moneyFullDetails = [
  {
    id: uuidv4(),
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
    altText: 'balance',
    displayText: 'Your Balance',
    balance: parseInt(0),
    backgroundColor: '#ecfccb',
    borderColor: '#84cc16',
    amount: 'balanceAmount',
  },
  {
    id: uuidv4(),
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
    altText: 'income',
    displayText: 'Your Income',
    balance: parseInt(0),
    backgroundColor: '#cffafe',
    borderColor: '#06b6d4',
    amount: 'incomeAmount',
  },
  {
    id: uuidv4(),
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
    altText: 'expenses',
    displayText: 'Your Expenses',
    balance: parseInt(0),
    backgroundColor: '#ede9fe',
    borderColor: '#7c3aed',
    amount: 'expensesAmount',
  },
]

class MoneyManager extends Component {
  state = {
    moneyDetails: [...moneyFullDetails],
    title: '',
    amount: '',
    type: 'INCOME',
    transactionsList: [],
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    if (title !== '' && amount !== '' && type !== '') {
      const newTransaction = {
        id: uuidv4(),
        title,
        amount,
        type,
        imageUrl:
          'https://assets.ccbp.in/frontend/react-js/money-manager/delete.png',
        alternateText: 'delete',
      }
      if (type === 'INCOME') {
        this.setState(prevState => ({
          moneyDetails: prevState.moneyDetails.map(eachItem => {
            if (
              eachItem.amount === 'balanceAmount' ||
              eachItem.amount === 'incomeAmount'
            ) {
              return {...eachItem, balance: eachItem.balance + parseInt(amount)}
            }
            return eachItem
          }),
        }))
      } else {
        this.setState(prevState => ({
          moneyDetails: prevState.moneyDetails.map(eachItem => {
            if (eachItem.amount === 'balanceAmount') {
              return {...eachItem, balance: eachItem.balance - parseInt(amount)}
            }
            return eachItem
          }),
        }))
        this.setState(prevState => ({
          moneyDetails: prevState.moneyDetails.map(eachItem => {
            if (eachItem.amount === 'expensesAmount') {
              return {...eachItem, balance: eachItem.balance + parseInt(amount)}
            }
            return eachItem
          }),
        }))
      }

      this.setState(prevState => ({
        transactionsList: [...prevState.transactionsList, newTransaction],
        title: '',
        amount: '',
        type: 'INCOME',
      }))
    }
  }

  onDeleteTransaction = props => {
    const {type, amount, id} = props
    const {transactionsList} = this.state

    if (type === 'INCOME') {
      this.setState(prevState => ({
        moneyDetails: prevState.moneyDetails.map(eachItem => {
          if (
            eachItem.amount === 'balanceAmount' ||
            eachItem.amount === 'incomeAmount'
          ) {
            return {...eachItem, balance: eachItem.balance - parseInt(amount)}
          }
          return eachItem
        }),
      }))
    } else {
      this.setState(prevState => ({
        moneyDetails: prevState.moneyDetails.map(eachItem => {
          if (eachItem.amount === 'balanceAmount') {
            return {...eachItem, balance: eachItem.balance + parseInt(amount)}
          }
          return eachItem
        }),
      }))
      this.setState(prevState => ({
        moneyDetails: prevState.moneyDetails.map(eachItem => {
          if (eachItem.amount === 'expensesAmount') {
            return {...eachItem, balance: eachItem.balance - parseInt(amount)}
          }
          return eachItem
        }),
      }))
    }
    const updatedTransactionsList = transactionsList.filter(
      eachComment => eachComment.id !== id,
    )

    this.setState({transactionsList: updatedTransactionsList})
  }

  onChangeDropdown = event => {
    const filteredAmountType = transactionTypeOptions.filter(
      eachTransaction => eachTransaction.optionId === event.target.value,
    )
    this.setState({type: filteredAmountType[0].optionId})
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onAmountChange = event => {
    this.setState({amount: event.target.value})
  }

  render() {
    const {moneyDetails, title, amount, type, transactionsList} = this.state
    console.log(type)
    return (
      <div className="bg-container">
        <div className="name-card-container">
          <h1 className="heading">Hi, Richard</h1>
          <p className="name-card-container-para">
            Welcome back to your
            <span className="top-container-span"> Money Manager</span>
          </p>
        </div>
        <div>
          <ul className="money-details-container">
            {moneyDetails.map(eachDetail => (
              <MoneyDetails key={eachDetail.id} eachDetail={eachDetail} />
            ))}
          </ul>
        </div>
        <div className="input-and-transaction-container">
          <div className="input-container">
            <form className="form-styles" onSubmit={this.onAddTransaction}>
              <h1 className="transaction-heading">Add Transaction</h1>
              <label className="label-styles" htmlFor="title">
                TITLE
              </label>
              <br />
              <input
                value={title}
                className="input-styles"
                type="text"
                id="title"
                placeholder="TITLE"
                onChange={this.onTitleChange}
              />
              <br />
              <label className="label-styles" htmlFor="amount">
                AMOUNT
              </label>
              <br />
              <input
                value={amount}
                className="input-styles"
                type="text"
                id="amount"
                placeholder="AMOUNT"
                onChange={this.onAmountChange}
              />
              <br />
              <label className="label-styles" htmlFor="type">
                TYPE
              </label>
              <br />
              <select
                value={type}
                className="input-styles"
                name="type"
                onChange={this.onChangeDropdown}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <br />
              <button type="submit" className="submit-btn">
                Add
              </button>
            </form>
          </div>
          <div className="transaction-history-container">
            <h1 className="history-heading">History</h1>
            <div className="title-amount-type-container">
              <p className="history-tile">Title</p>
              <p className="history-tile">Amount</p>
              <p className="history-tile">Type</p>
            </div>
            <ul className="title-amount-type-delete-container">
              {transactionsList.map(eachTransaction => (
                <TransactionItem
                  key={eachTransaction.id}
                  eachTransaction={eachTransaction}
                  optionId={eachTransaction.type}
                  onDeleteTransaction={this.onDeleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
