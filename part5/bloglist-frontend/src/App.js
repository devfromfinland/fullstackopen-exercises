import React, { useState, useEffect } from 'react'
import './App.css'

import Blog from './components/Blog'
import Login from './components/Login'
import AlertMessage from './components/AlertMessage'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
// import userService from './services/users'
import authService from './services/authentication'

import { saveAuthedUser, getAuthedUser, removeAuthedUser } from './utils/helpers'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)  // The token returned with a successful login is saved to user
  const [alertMessage, setAlertMessage] = useState(null)
  const loginFormRef = React.createRef()
  const newBlogFormRef = React.createRef()
  const displayNewBlogRef = React.createRef()

  useEffect(() => {
    const fetchInitialData = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    }

    const authedUser = getAuthedUser()
    if (authedUser) {
      setUser(authedUser)
      blogService.setToken(authedUser.token)
    }
    fetchInitialData()
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

  const handleLogin = async (username, password) => {
    if (username === '' || password === '') {
      notify('error', 'Username and password must be filled')
      return
    }

    try {
      const result = await authService.login(username, password)
      loginFormRef.current.reset()
      saveAuthedUser(result)
      setUser(result) // name, username, token
      blogService.setToken(result.token)
    } catch(exception) {
      notify('error', 'wrong username or password')
    }
  }

  const handleLogout = () => {
    setUser(null)
    removeAuthedUser()
  }

  const handleNewBlog = async ({ title, author, url }) => {
    // const { title, author, url } = blog
    if (title === '' || author === '' || url === '') {
      notify('error', 'please fill in all fields')
      return
    }

    try {
      const savedBlog = await blogService.create({ title, author, url })
      // console.log('result', savedBlog)
      newBlogFormRef.current.reset()
      displayNewBlogRef.current.toggleVisibility()
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
    } catch (exception) {
      notify('error', 'fail adding a new blog')
      console.log(exception)
    }
  }

  const handleRemove = async (id) => {
    try {
      await blogService.remove(id)
      const updatedBlogs = blogs.filter(blog => blog.id !== id)
      setBlogs(updatedBlogs)
      notify('success', 'the blog has been removed')
    } catch (exception) {
      notify('error', 'fail to remove the blog')
    }
  }

  const handleUpdate = async (blog, updatedData) => {
    // updatedData { title, author, url, likes }
    // console.log('blog', blog)
    try {
      let updatedBlog = await blogService.update(blog.id, updatedData)
      updatedBlog.user = { ...blog.user }
      // console.log('updatedBlog', updatedBlog)
      const updatedBlogs = blogs.map(item => item.id === blog.id ? updatedBlog : item)
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
    } catch (exception) {
      notify('error', 'fail to update the blog')
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
          <Togglable showLabel='create new blog' hideLabel='hide form' ref={displayNewBlogRef}>
            <NewBlog handleNewBlog={handleNewBlog} ref={newBlogFormRef} />
          </Togglable>
        </div>

        <div>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              handleRemove={handleRemove}
              handleUpdate={handleUpdate}
            />
          )}
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <h1>log in to application</h1>
        { alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message}/>}
        <Login handleLogin={handleLogin} ref={loginFormRef} />
      </div>
    )
  }
}

export default App