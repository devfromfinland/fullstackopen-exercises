import React, { useState, useEffect } from 'react'
import './App.css'

import Blog from './components/Blog'
import Login from './components/Login'
import AlertMessage from './components/AlertMessage'
import NewBlog from './components/NewBlog'

import blogService from './services/blogs'
import userService from './services/users'
import authService from './services/authentication'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)  // The token returned with a successful login is saved to user
  const [alertMessage, setAlertMessage] = useState(null)

  useEffect(() => {
    const authedUser = window.localStorage.getItem('authedUser')
    if (authedUser) {
      const user = JSON.parse(authedUser)
      setUser(user)
      // set logged in token
    }
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const notify = (type, message) => {
    setAlertMessage({
      type: type, // sucess, error, warning
      message: message
    })
    setTimeout(() => {
      setAlertMessage(null)
    }, 5000)
  }

  const handleLogin = async ({ username, password }) => {
    if (username === '' || password === '') {
      notify('error', `Username and password must be filled`)
      return
    }

    try {
      const result = await authService.login({ username, password })
      setUser(result) // name, username, token
      window.localStorage.setItem('authedUser',JSON.stringify(result))
      // set logged in token
    } catch(exception) {
      notify('error', `wrong username or password`)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('authedUser')
  }

  const handleNewBlog = ({ title, author, url }) => {
    notify('success', `a new blog ${title} by ${author} was added`)
  }

  if (user) {
    return (
      <div>
        <h1>blogs</h1>

        { alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message}/>}

        { user && 
          <div>
            {user.name} logged in
            { }
            <button onClick={handleLogout}>
              logout
            </button>
          </div>
        }

        <div>
          <NewBlog handleNewBlog={handleNewBlog}/>
        </div>

        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <h1>log in to application</h1>
        { alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message}/>}
        <Login handleLogin={handleLogin}/>
      </div>
    )
  }

  
}

export default App