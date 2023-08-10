import React from 'react'
import { useTransactionContext } from '../contexts/TransactionContext'

const TransactionSummary = () => {
  const { state } = useTransactionContext()
  const { transactions } = state

  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'entrada')
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0)

  const totalExpense = transactions
    .filter((transaction) => transaction.type === 'saída')
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0)

  const accountBalance = totalIncome - totalExpense

  return (
    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-4'>
      <h2 className='text-lg font-semibold mb-4 text-gray-900 dark:text-white'>
        Resumo das Transações
      </h2>
      <div className='flex justify-between items-center'>
        <div className='text-gray-700 dark:text-gray-300'>
          <p className='mb-1 text-sm'>Total de Entradas:</p>
          <p className='mb-1 text-sm'>Total de Saídas:</p>
        </div>
        <div className='text-gray-900 dark:text-white'>
          <p className='mb-1 text-sm'>R$ {totalIncome.toFixed(2)}</p>
          <p className='mb-1 text-sm'>R$ {totalExpense.toFixed(2)}</p>
        </div>
      </div>
      <hr className='my-4 border-gray-300 dark:border-gray-600' />
      <div className='flex justify-between items-center'>
        <div className='text-gray-700 dark:text-gray-300'>
          <p className='text-base'>Saldo Total:</p>
        </div>
        <div className='text-gray-900 dark:text-white'>
          <p className='text-base'>R$ {accountBalance.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

export default TransactionSummary
