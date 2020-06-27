import React, { useState } from 'react'
import Togglable from './Togglable'
import { getAuthedUser } from '../utils/helpers'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  const [display, setDisplay] = useState(false)
  const displayDetailsRef = React.createRef()

  const dispatch = useDispatch()

  const toggle = () => {
    displayDetailsRef.current.toggleVisibility()
    setDisplay(!display)
  }

  const handleLike = () => {
    dispatch(updateBlog(blog, { likes: blog.likes + 1 }))
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id))
    }
  }

  const authedUser = getAuthedUser()

  return (
    <div className='blog'>
      <span className='blog-title'>{blog.title}</span>{' '}
      <span className='blog-author'>{blog.author}</span>{' '}
      <button onClick={toggle} className='btn-toggle'>
        {display ? 'hide' : 'view'}
      </button>
      <Togglable noButtonLabel={true} ref={displayDetailsRef}>
        <div className='blog-url'>{blog.url}</div>
        <div className='blog-likes' data-likes={blog.likes}>{blog.likes} <button onClick={handleLike} className='btn-likes'>like</button></div>
        <div className='blog-user'>{blog.user.name}</div>
        { authedUser
          ? (authedUser.username === blog.user.username
            ? <div><button onClick={handleRemove} className='btn-remove'>remove</button></div>
            : null
          )
          : null
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