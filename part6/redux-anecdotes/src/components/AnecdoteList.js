import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filterText = useSelector(state => state.filterText)
  const anecdotes = useSelector(state => filterText === '' 
    ? state.anecdotes
    : state.anecdotes.filter(item => item.content.toUpperCase()
      .indexOf(filterText.toUpperCase()) !== -1)
    )
  const dispatch = useDispatch()

  const vote = (id) => {
    const anecdote = anecdotes.filter(item => item.id === id)[0]
    
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return anecdotes.length > 0
  ? <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  : <div>There is nothing to show...</div>
}

export default AnecdoteList