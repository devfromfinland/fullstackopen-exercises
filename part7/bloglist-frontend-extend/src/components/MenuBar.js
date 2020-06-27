import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/authedReducer'

const MenuBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.authedUser)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div style={{ backgroundColor: 'rgb(211, 211, 211)'}}>
      <Link to='/'>blogs</Link>{' '}
      <Link to='/users'>users</Link>{' '}
      {user && user.name} logged in{' '}
      <button onClick={handleLogout} className='btn-logout'>
        logout
      </button>
    </div>
  )
}

export default MenuBar