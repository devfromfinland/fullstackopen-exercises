import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    const anecdote = event.target.inputAnecdote.value
    event.target.inputAnecdote.value = ''
    if (anecdote !== '') {
      dispatch(createAnecdote(anecdote))
    } else {
      alert('enter the text first')
    }
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input type='text' name='inputAnecdote' autoFocus /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm