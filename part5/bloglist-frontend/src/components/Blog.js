import React, { useState } from 'react'
import Togglable from './Togglable'
import { getAuthedUser } from '../utils/helpers'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleRemove, handleUpdate }) => {
  const [display, setDisplay] = useState(false)
  const displayDetailsRef = React.createRef()

  const toggle = () => {
    displayDetailsRef.current.toggleVisibility()
    setDisplay(!display)
  }

  const handleLike = async () => {
    handleUpdate(blog, { likes: blog.likes + 1 })
  }

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleRemove(blog.id)
    }
  }

  const authedUser = getAuthedUser()

  return (
    <div className='blog'>
      {blog.title} {blog.author} <button onClick={toggle}>{display ? 'hide' : 'view'}</button>
      <Togglable noButtonLabel={true} ref={displayDetailsRef}>
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={handleLike}>like</button></div>
        <div>{blog.user.name}</div>
        { authedUser.username === blog.user.username &&
          <div>
            <button onClick={remove} className='btn-remove'>remove</button>
          </div>
        }
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
}

export default Blog