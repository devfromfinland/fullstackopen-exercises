import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Blogs from './components/Blogs'
import Login from './components/Login'
import AlertMessage from './components/AlertMessage'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import Users from './components/Users'

import { getBlogs, newBlog } from './reducers/blogReducer'
import { setAuthedUser, loginUser, logoutUser } from './reducers/authedReducer'
import { setNotification } from './reducers/notificationReducer'
import { getUsers } from './reducers/userReducer'

import { getAuthedUser } from './utils/helpers'

const App = () => {
  const loginFormRef = React.createRef()
  const newBlogFormRef = React.createRef()
  const displayNewBlogRef = React.createRef()

  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const user = useSelector(state => state.authedUser)
  const blogs = useSelector(state => state.blogs ? state.blogs.sort((a, b) => b.likes - a.likes) : null)
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

  const handleLogout = () => {
    dispatch(logoutUser())
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

  // return (
  //   <div id='blogs'>
  //     <h1>blogs</h1>

  //     { alertMessage && <AlertMessage {...alertMessage}/> }

  //     <Router>

  //       <Switch>
  //         <Route path='/' exact>
  //           <div>
  //             <Togglable showLabel='create new blog' hideLabel='hide form' ref={displayNewBlogRef}>
  //               <NewBlog handleNewBlog={handleNewBlog} ref={newBlogFormRef} />
  //             </Togglable>
  //           </div>
  //           <Blogs />
  //         </Route>
  //       </Switch>
  //     </Router>
  //   </div>
    
  // )

  if (user) {
    return (
      <div id='blogs'>
        <h1>blogs</h1>

        { alertMessage && <AlertMessage {...alertMessage}/> }

        { user && 
          <div>
            {user.name} logged in
            { }
            <button onClick={handleLogout} className='btn-logout'>
              logout
            </button>
          </div>
        }

        <div>
          <Togglable showLabel='create new blog' hideLabel='hide form' ref={displayNewBlogRef}>
            <NewBlog handleNewBlog={handleNewBlog} ref={newBlogFormRef} />
          </Togglable>
        </div>

        <Blogs />

        <Users />
      </div>
    )
  } else {
    return (
      <div>
        <h1>log in to application</h1>
        { alertMessage && <AlertMessage {...alertMessage}/> }
        <Login handleLogin={handleLogin} ref={loginFormRef} />
      </div>
    )
  }
}

export default App