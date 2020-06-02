import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({text, vote}) => {
  return <>
    <p>{text}</p>
    <p>has {vote} votes</p>
  </>
}

const App = (props) => {
  const [selected, setSelected] = useState(Math.round(Math.random() * (props.anecdotes.length - 1)))
  const [votes, setVotes] = useState(Array.apply(null, new Array(props.anecdotes.length))
    .map(Number.prototype.valueOf, 0))

  const handleNext = () => setSelected(Math.round(Math.random() * (props.anecdotes.length - 1)))

  const handleVote = () => {
    let newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)
  }

  const positionMostVoted = () => votes.findIndex(item => item === Math.max(...votes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={props.anecdotes[selected]} vote={votes[selected]}/>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <Anecdote text={props.anecdotes[positionMostVoted()]} vote={votes[positionMostVoted()]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)