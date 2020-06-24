import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    const anecdote = event.target.inputAnecdote.value
    event.target.inputAnecdote.value = ''
    if (anecdote !== '') {
      dispatch(createAnecdote(anecdote))

      dispatch(showNotification(`you created '${anecdote}'`))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)
    } else {
      alert('enter the text first')
    }
  }

  return (
    <div style={{ marginBottom: 10, marginTop: 10 }}>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input type='text' name='inputAnecdote' autoFocus /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm