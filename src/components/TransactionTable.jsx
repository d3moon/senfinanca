import React, { useState } from 'react'
import { useTransactionContext } from '../contexts/TransactionContext'

const TransactionTable = () => {
  const { state, dispatch } = useTransactionContext()
  const { transactions } = state

  const [categoryFilter, setCategoryFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id })
  }

  const handleSave = (updatedTransaction) => {
    dispatch({
      type: 'EDIT_TRANSACTION',
      payload: { updatedTransaction },
    })
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const categoryMatch = categoryFilter
      ? transaction.category === categoryFilter
      : true
    const typeMatch = typeFilter ? transaction.type === typeFilter : true
    return categoryMatch && typeMatch
  })

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <div className='flex justify-between p-4 bg-white dark:bg-gray-800 sm:rounded-t-lg'>
        <div>
          <label
            htmlFor='categoryFilter'
            className='mr-2 text-gray-600 dark:text-gray-400'
          >
            Categoria:
          </label>
          <input
            type='text'
            id='categoryFilter'
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className='border border-gray-300 px-2 py-1 rounded-lg focus:ring focus:ring-blue-300'
          />
        </div>
        <div>
          <label
            htmlFor='typeFilter'
            className='mr-2 text-gray-600 dark:text-gray-400'
          >
            Tipo:
          </label>
          <select
            id='typeFilter'
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className='border border-gray-300 px-2 py-1 rounded-lg focus:ring focus:ring-blue-300'
          >
            <option value=''>Todos</option>
            <option value='entrada'>Entrada</option>
            <option value='saída'>Saída</option>
          </select>
        </div>
      </div>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Título
            </th>
            <th scope='col' className='px-6 py-3'>
              Tipo
            </th>
            <th scope='col' className='px-6 py-3'>
              Categoria
            </th>
            <th scope='col' className='px-6 py-3'>
              Valor
            </th>
            <th scope='col' className='px-6 py-3'>
              <span className='sr-only'>Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              onDelete={handleDelete}
              onSave={handleSave}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const TransactionRow = ({ transaction, onDelete, onSave }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTransaction, setEditedTransaction] = useState(transaction)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onSave(editedTransaction)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedTransaction(transaction)
  }

  return (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
      <td className='px-6 py-4'>
        {isEditing ? (
          <input
            type='text'
            value={editedTransaction.title}
            onChange={(e) =>
              setEditedTransaction((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
          />
        ) : (
          transaction.title
        )}
      </td>
      <td className='px-6 py-4'>
        {isEditing ? (
          <select
            value={editedTransaction.type}
            onChange={(e) =>
              setEditedTransaction((prevState) => ({
                ...prevState,
                type: e.target.value,
              }))
            }
          >
            <option value='entrada'>Entrada</option>
            <option value='saída'>Saída</option>
          </select>
        ) : (
          transaction.type
        )}
      </td>
      <td className='px-6 py-4'>
        {isEditing ? (
          <input
            type='text'
            value={editedTransaction.category}
            onChange={(e) =>
              setEditedTransaction((prevState) => ({
                ...prevState,
                category: e.target.value,
              }))
            }
          />
        ) : (
          transaction.category
        )}
      </td>
      <td className='px-6 py-4'>
        {isEditing ? (
          <input
            type='number'
            value={editedTransaction.amount}
            onChange={(e) =>
              setEditedTransaction((prevState) => ({
                ...prevState,
                amount: e.target.value,
              }))
            }
          />
        ) : (
          transaction.amount
        )}
      </td>
      <td className='px-6 py-4 text-right'>
        {isEditing ? (
          <div>
            <button
              onClick={handleSave}
              className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
            >
              Salvar
            </button>
            <button
              onClick={handleCancel}
              className='ml-2 font-medium text-red-600 dark:text-red-500 hover:underline'
            >
              Cancelar
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={handleEdit}
              className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(transaction.id)}
              className='ml-2 font-medium text-red-600 dark:text-red-500 hover:underline'
            >
              Excluir
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}

export default TransactionTable
