import React, { createContext, useContext, useReducer, useEffect } from 'react'

const TransactionContext = createContext()

const initialState = {
  transactions: JSON.parse(localStorage.getItem('transactions')) || [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      const updatedTransactions = [...state.transactions, action.payload]
      localStorage.setItem('transactions', JSON.stringify(updatedTransactions))
      return { ...state, transactions: updatedTransactions }
    case 'DELETE_TRANSACTION':
      const filteredTransactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload,
      )
      localStorage.setItem('transactions', JSON.stringify(filteredTransactions))
      return { ...state, transactions: filteredTransactions }
    case 'EDIT_TRANSACTION':
      const editedTransactions = state.transactions.map((t) =>
        t.id === action.payload.updatedTransaction.id
          ? action.payload.updatedTransaction
          : t,
      )
      localStorage.setItem('transactions', JSON.stringify(editedTransactions))
      return { ...state, transactions: editedTransactions }
    default:
      return state
  }
}

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <TransactionContext.Provider value={{ state, dispatch }}>
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactionContext = () => useContext(TransactionContext)
