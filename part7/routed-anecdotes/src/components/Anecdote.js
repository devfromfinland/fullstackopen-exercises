import React from 'react'
import { useParams } from 'react-router-dom'

const Anecdote = (props) => {
  const id = useParams().id
  const anecdote = props.anecdotes.filter(item => item.id === id)[0]

  if (!anecdote) {
    return <div style={{ marginTop: 20, marginBottom: 20 }}>PAGE NOT FOUND. To be redirect to 404 page.</div>
  }

  const { content, info, votes } = anecdote

  return (
    <div>
      <h2>{content}</h2>
      <p>has {votes} votes</p>
      <p>for more info, see <a href={info} target='_blank'>{info}</a></p>
    </div>
  )
}

export default Anecdote