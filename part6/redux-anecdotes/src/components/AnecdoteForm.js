import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()

  const { dispatch } = props

  const create = async (event) => {
    event.preventDefault()
    const anecdote = event.target.inputAnecdote.value
    event.target.inputAnecdote.value = ''
    if (anecdote !== '') {
      dispatch(createAnecdote(anecdote))
      dispatch(setNotification(`you created '${anecdote}'`, 5))
    } else {
      alert('enter the text first')
    }
  }

  return (
    <div style={{ marginBottom: 10, marginTop: 10 }}>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input type='text' name='inputAnecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    // nothing to map -> no need to pass to connect parameter below
  }
}

export default connect()(AnecdoteForm)