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
      blogService.setToken(user.token)
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

  const getAuthedUser = () => {
    const authedUser = window.localStorage.getItem('authedUser')
    return authedUser
      ? JSON.parse(authedUser)
      : null
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
      blogService.setToken(result.token)
      // set logged in token
    } catch(exception) {
      notify('error', `wrong username or password`)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('authedUser')
  }

  const handleNewBlog = async (blog) => {
    const { title, author, url } = blog
    try {
      const savedBlog = await blogService.create(blog)
      console.log('result', savedBlog)
      const authedUser = getAuthedUser()
      setBlogs([
        ...blogs,
        {
          title,
          author,
          url,
          id: savedBlog.id,
          user: {
            username: authedUser.username,
            name: authedUser.name,
            id: savedBlog.user
          },
          likes: savedBlog.likes
        }
      ])
      notify('success', `a new blog ${title} by ${author} was added`)
      // todo: update state
    } catch (exception) {
      notify('error', `fail adding a new blog`)
      console.log(exception)
    }
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