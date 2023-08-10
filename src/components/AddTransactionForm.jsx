import React, { useState } from 'react'
import { useTransactionContext } from '../contexts/TransactionContext'

const AddTransactionForm = () => {
  const { dispatch } = useTransactionContext()
  const [title, setTitle] = useState('')
  const [type, setType] = useState('entrada')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const transaction = {
      id: new Date().getTime(),
      title,
      type,
      category,
      amount: parseFloat(amount),
      createdAt: new Date().toISOString(),
    }
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction })
    setTitle('')
    setType('entrada')
    setCategory('')
    setAmount('')
  }

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Adicionar Transação</h2>
      <form onSubmit={handleSubmit} className='grid gap-6 mb-6 md:grid-cols-2'>
        <div className='flex flex-col border border-blue-300 text-gray-900 text-sm rounded-lg focus-within:ring-blue-500 focus-within:border-blue-500 p-2.5 d0 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus-within:ring-blue-500 dark:focus-within:border-blue-500'>
          <label htmlFor='title' className=''>
            Título
          </label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='type'>Tipo</label>
          <select
            id='type'
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          >
            <option value='entrada'>Entrada</option>
            <option value='saída'>Saída</option>
          </select>
        </div>
        <div>
          <label htmlFor='category'>Categoria</label>
          <input
            type='text'
            id='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
        <div>
          <label htmlFor='amount'>Valor</label>
          <input
            type='number'
            id='amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
        <div className='md:col-span-2'>
          <button
            type='submit'
            className='text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 rounded focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Adicionar Transação
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTransactionForm
