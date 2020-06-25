import React, { useState } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import Anecdote from './components/Anecdote'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const showNotification = (message, time = 5) => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, time * 1000)
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(a => a.id === match.params.id)
    : null
  
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />

      { notification === ''
        ? null
        : <div style={{
            border: 'solid',
            marginTop: 10,
            marginBottom: 10,
            padding: 5,
            borderWidth: 1,
            backgroundColor: 'rgb(174, 214, 241)'}}>
            {notification}
          </div>
      }

      {/* <button onClick={() => showNotification('hello')}>test</button> */}

      <Switch>
        <Route path='/' exact>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>

        <Route path='/anecdotes/:id'>
          <Anecdote anecdote={anecdote} />
        </Route>

        <Route path='/about'>
          <About />
        </Route>

        <Route path='/create'>
          <CreateNew addNew={addNew} showNotification={showNotification}/>
        </Route>
      </Switch>

      <Footer />
    </div>
  )
}

export default App