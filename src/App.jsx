import React from 'react'
import AddTransactionForm from './components/AddTransactionForm'
import TransactionTable from './components/TransactionTable'
import TransactionSummary from './components/TransactionSummary'
import { TransactionProvider } from './contexts/TransactionContext'

const App = () => {
  return (
    <TransactionProvider>
      <div className='flex flex-col items-center min-h-screen bg-gray-100'>
        <h1 className='title font-bold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-400 to-sky-600 mb-6 my-4'>
          SenFinança
        </h1>
        <div className='w-full max-w-screen-md'>
          <AddTransactionForm />
          <TransactionSummary />
          <TransactionTable />
        </div>
      </div>
    </TransactionProvider>
  )
}

export default App
