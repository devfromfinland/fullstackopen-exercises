
import React, { useState, useEffect } from 'react'
import './App.css'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import Notification from './components/Notification'

import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import  { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, AUTHOR_UPDATED } from './queries'
import { getAuthedUser, removeAuthedUser, saveAuthedUser } from './utils/helpers'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      // console.log('subscriptionData', subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
    }
  })

  useSubscription(AUTHOR_UPDATED, {
    onSubscriptionData: ({ subscriptionData }) => {
      // console.log('data', subscriptionData)
      const updatedAuthor = subscriptionData.data.authorUpdated
      updateAuthorsCache(updatedAuthor)
    }
  })

  const updateAuthorsCache = (updatedAuthor) => {
    const authorsInCache = client.readQuery({ query: ALL_AUTHORS })

    const foundAuthor = authorsInCache.allAuthors.find(item => item.id === updatedAuthor.id)

    if (foundAuthor) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: {
          ...authorsInCache,
          allAuthors: authorsInCache.allAuthors.map(item => item.id === updatedAuthor.id
            ? {
                id: updatedAuthor.id,
                name: updatedAuthor.name,
                born: updatedAuthor.born,
                bookCount: foundAuthor.bookCount
              }
            : item
          )
        }
      })

      notify('success', `Author ${updatedAuthor.name} has just been updated in the database`)
    }
  }

  const updateCacheWith = (addedBook) => {
    const booksInCache = client.readQuery({ query: ALL_BOOKS })
    const authorsInCache = client.readQuery({ query: ALL_AUTHORS })

    let updatedAuthor = authorsInCache.allAuthors.find(item => item.name === addedBook.author.name)

    if (booksInCache.allBooks.map(item => item.id)
      .indexOf(addedBook.id) > -1) {
        console.log('booked founded')
    } else {
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...booksInCache,
          allBooks: [
            ...booksInCache.allBooks,
            addedBook
          ]
        }
      })
    }

    client.writeQuery({
      query: ALL_AUTHORS,
      data: {
        ...authorsInCache,
        allAuthors: updatedAuthor
          ? authorsInCache.allAuthors.map(item => item.name === addedBook.author.name
              ? { ...updatedAuthor, bookCount: updatedAuthor.bookCount + 1 } // this might calculate twice
              : item
            )
          : [
            ...authorsInCache.allAuthors,
            {
              name: addedBook.author.name,
              bookCount: 1,
              born: addedBook.author.born,
              id: addedBook.author.id
            }
          ]
      }
    })

    notify('success', `New book ${addedBook.title} has just been added to the database`)
  }

  const handleLoginSuccess = (token) => {
    saveAuthedUser(token) // update local storage
    setUser(token) // update local state
    setPage('authors') // update showing page

    initCache() // fix mutation error when store is emptied after logging out
  }

  const handleLogout = (e) => {
    e.preventDefault()
    removeAuthedUser() // remove from localStorage
    client.resetStore() // remove cache
    setUser(null) // remove from local state
  }

  const initCache = () => {
    // init graphQL cache for all users with current data
    if (books.data && authors.data) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          allBooks: books.data.allBooks
        }
      })

      client.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: authors.data.allAuthors
        }
      })
    }
  }

  useEffect(() => {
    const authedUser = getAuthedUser()
    if (authedUser) {
      setUser(authedUser)
    }
  }, [])


  const notify = (type, message) => {
    setNotification({
      type: type, // success, error, warning
      message: message
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  
  if (!authors.data && !books.data) {
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