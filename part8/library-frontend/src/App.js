
import React, { useState, useEffect } from 'react'
import './App.css'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import Notification from './components/Notification'

import { useQuery, useApolloClient } from '@apollo/client'
import  { ALL_AUTHORS, ALL_BOOKS } from './queries'
import { getAuthedUser, removeAuthedUser, saveAuthedUser } from './utils/helpers'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const client = useApolloClient()
  // const me = useQuery(ME)
  // console.log('me', me)

  useEffect(() => {
    const authedUser = getAuthedUser()
    if (authedUser) {
      setUser(authedUser)
    }
  }, [])

  const handleLoginSuccess = (token) => {
    saveAuthedUser(token) // update local storage
    setUser(token) // update local state
    setPage('authors') // update showing page
  }

  const notify = (type, message) => {
    setNotification({
      type: type, // success, error, warning
      message: message
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogout = (e) => {
    e.preventDefault()

    setUser(null) // remove from local state
    removeAuthedUser() // remove from localStorage
    client.resetStore() // remove cache
  }

  if (!authors.data || !books.data) {
    return <div>Can't connect to server. Check if the server is online and refresh this page.</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { user
          ? <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white'}}>logout</button>
          </>
          : <button onClick={() => setPage('login')} style={{ backgroundColor: 'blue', color: 'white'}}>login</button>
        }
      </div>

      { notification && <Notification type={notification.type} message={notification.message} />}

      { authors.loading
        ? <div>Loading authors...</div>
        : <Authors
          show={page === 'authors'}
          authors={authors.data.allAuthors}
          user={user}
          notify={notify}
        />
      }

      { books.loading
        ? <div>Loading books...</div>
        : <Books
          show={page === 'books'}
          books={books.data.allBooks}
          notify={notify}
        />
      }

      <NewBook
        show={page === 'add'}
        notify={notify}
      />

      <Recommend
        show={page === 'recommend'}
        books={books.data.allBooks}
        user={user}
      />

      <Login
        show={page === 'login'}
        handleLoginSuccess={handleLoginSuccess}
        notify={notify}
      />

    </div>
  )
}

export default App