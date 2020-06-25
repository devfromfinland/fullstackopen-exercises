import anecdoteService from '../services/anecdotes'
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const result = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      anecdote: result
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      anecdotes
    })
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.increaseVote(id)
    dispatch({
      type: 'VOTE',
      id
    })
  }
}

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const newState = state.map(anecdote => 
        anecdote.id !== action.id
          ? anecdote
          : {
            content: anecdote.content,
            id: anecdote.id,
            votes: anecdote.votes + 1
          }
      )
      return newState
    case 'NEW_ANECDOTE':
      return [
        ...state, 
        action.anecdote
      ]
    case 'INIT_ANECDOTES':
      return action.anecdotes
    default:
      return state
  }
}

export default anecdoteReducer