import authService from '../services/authentication'
import blogService from '../services/blogs'
import { saveAuthedUser, removeAuthedUser } from '../utils/helpers'
import { setNotification } from './notificationReducer'
import { getUsers } from './userReducer'
import { getBlogs } from './blogReducer'

export const loginUser = (username, password) => {
  return async dispatch => {

    try {
      const authedUser = await authService.login(username, password)
      saveAuthedUser(authedUser)
      blogService.setToken(authedUser.token)

      dispatch(getBlogs())
      
      dispatch({
        type: 'LOGIN',
        user: authedUser
      })

      dispatch(getUsers())
    } catch (error) {
      // console.log('login error', error)
      dispatch(setNotification({
        type: 'error',
        content: 'wrong username or password'
      }))
    }
  }
}

export const setAuthedUser = (user) => {
  blogService.setToken(user.token)
  return async dispatch => {
    dispatch({
      type: 'SET_AUTHED_USER',
      user
    })
  }
}

export const logoutUser = () => {
  return async dispatch => {
    removeAuthedUser()
    dispatch({
      type: 'LOGOUT'
    })
  }
}

const authedReducer = (state = null, action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {
    case 'LOGIN':
      return action.user
    case 'LOGOUT':
      return null
    case 'SET_AUTHED_USER':
      return action.user
    default:
      return state
  }
}

export default authedReducer