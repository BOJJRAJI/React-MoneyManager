import {Component} from 'react'
import {v4} from 'uuid'
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

class MoneyManager extends Component {
  state = {
    optionId: transactionTypeOptions[0].optionId,
    titleInput: '',
    amountInput: '',
    historyList: [],
  }

  getType = event => {
    this.setState({optionId: event.target.value})
  }

  getTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  getAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  addHistory = event => {
    event.preventDefault()
    const {optionId, titleInput, amountInput, historyList} = this.state

    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption

    const newHistory = {
      id: v4(),
      type: displayText,
      title: titleInput,
      amount: parseInt(amountInput),
    }

    this.setState(prevState => ({
      historyList: [...prevState.historyList, newHistory],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))

    console.log(historyList)
  }

  deleteHistory = id => {
    const {historyList} = this.state
    const filterList = historyList.filter(item => item.id !== id)
    this.setState({
      historyList: filterList,
    })
  }

  getExpense = () => {
    const {historyList} = this.state
    let expensesAmount = 0
    historyList.forEach(eachHistory => {
      if (eachHistory.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachHistory.amount
      }
    })

    return expensesAmount
  }

  getIncome = () => {
    const {historyList} = this.state
    let incomeAmount = 0
    historyList.forEach(eachHistory => {
      if (eachHistory.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachHistory.amount
      }
    })

    return incomeAmount
  }

  render() {
    const {titleInput, historyList, amountInput, optionId} = this.state
    const expensesAmount = this.getExpense()
    const incomeAmount = this.getIncome()
    let balanceAmount = 0
    balanceAmount = incomeAmount - expensesAmount

    return (
      <div className="app-container">
        <div className="card">
          <div className="user-details-card">
            <h1 className="user-name">Hi ,Richard</h1>
            <p className="greetings">
              Welcome back to your
              <span className="greetings-span"> Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />
          <div className="form-history-container">
            <form className="form" onSubmit={this.addHistory}>
              <h1 className="transaction-heading">Add Transaction</h1>
              <label className="label-element" htmlFor="title">
                TITLE
              </label>
              <input
                className="input-element"
                id="title"
                placeholder="TITLE"
                value={titleInput}
                type="text"
                onChange={this.getTitle}
              />

              <label className="label-element" htmlFor="amount">
                AMOUNT
              </label>
              <input
                className="input-element"
                id="amount"
                placeholder="AMOUNT"
                value={amountInput}
                type="text"
                onChange={this.getAmount}
              />

              <label className="label-element" htmlFor="select">
                TYPE
              </label>
              <select
                id="select"
                className="select-element"
                onChange={this.getType}
                name="choice"
                value={optionId}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <div className="history-container">
              <h1 className="history-heading">History</h1>
              <ul className="history-items">
                <li className="history-headings-container">
                  <p className="title-heading">Title</p>
                  <p className="title-heading">Amount</p>
                  <p className="title-heading">Type</p>
                  <p className="para">uuuu</p>
                </li>
                {historyList.map(item => (
                  <TransactionItem
                    transactionDetails={item}
                    key={item.id}
                    deleteHistory={this.deleteHistory}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
