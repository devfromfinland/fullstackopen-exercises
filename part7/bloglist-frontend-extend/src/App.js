import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Blogs from './components/Blogs'
import BlogDetails from './components/BlogDetails'
import Login from './components/Login'
import AlertMessage from './components/AlertMessage'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import MenuBar from './components/MenuBar'

import { getBlogs, newBlog } from './reducers/blogReducer'
import { setAuthedUser, loginUser } from './reducers/authedReducer'
import { setNotification } from './reducers/notificationReducer'
import { getUsers } from './reducers/userReducer'

import { getAuthedUser } from './utils/helpers'

const App = () => {
  const loginFormRef = React.createRef()
  const newBlogFormRef = React.createRef()
  const displayNewBlogRef = React.createRef()

  const dispatch = useDispatch()
  const user = useSelector(state => state.authedUser)
  const alertMessage = useSelector(state => state.notification)

  useEffect(() => {
    const authedUser = getAuthedUser()
    if (authedUser) {
      dispatch(setAuthedUser(authedUser))
      dispatch(getBlogs())
      dispatch(getUsers())
    }
  }, [dispatch])

  const handleLogin = async (username, password) => {
    if (username === '' || password === '') {
      dispatch(setNotification({
        type: 'error',
        content: 'Username and password must be filled'
      }))
      return
    }

    dispatch(loginUser(username, password))

    if (user) {
      loginFormRef.current.reset()
    }
  }

  const handleNewBlog = async ({ title, author, url }) => {
    // const { title, author, url } = blog
    if (title === '' || author === '' || url === '') {
      dispatch(setNotification({
        type: 'error',
        content: 'please fill in all fields'
      }))
      return
    }

    const authedUser = getAuthedUser()
    dispatch(newBlog({ title, author, url }, authedUser))
    newBlogFormRef.current.reset()
    displayNewBlogRef.current.toggleVisibility()
  }

  return ( 
    <Router>
      { !user
        ? <div>
          <h1>log in to application</h1>
          { alertMessage && <AlertMessage {...alertMessage}/> }
          <Login handleLogin={handleLogin} ref={loginFormRef} />
        </div>
        : <div id='blogs'>
          <MenuBar />
          <h1>blog app</h1>
          { alertMessage && <AlertMessage {...alertMessage}/> }
            <Switch>
              <Route path={['/', '/blogs']} exact>
                <div>
                  <Togglable showLabel='create new blog' hideLabel='hide form' ref={displayNewBlogRef}>
                    <NewBlog handleNewBlog={handleNewBlog} ref={newBlogFormRef} />
                  </Togglable>
                </div>
                <Blogs />
              </Route>
              <Route path='/users' exact component={Users} />
              <Route path='/blogs/:id' component={BlogDetails} />
              <Route path='/users/:id' component={User} />
              <Route path='*'>
                Page not found (error 404)
              </Route>
            </Switch>
        </div>
      }
    </Router>
  )
}

export default App