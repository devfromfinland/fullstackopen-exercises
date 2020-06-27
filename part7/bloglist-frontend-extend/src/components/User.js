import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  const user = useSelector(state => state.users ? state.users.find(a => a.id === id) : null)
  
  return user
    ? <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>
          {blog.title}
        </li>)}
      </ul>
    </div>
    : <div>Invalid link</div>
}

export default User