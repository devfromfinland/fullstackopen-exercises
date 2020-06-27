import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import { removeBlog, updateBlog } from '../reducers/blogReducer'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs ? state.blogs.sort((a, b) => b.likes - a.likes) : null)
  const dispatch = useDispatch()

  const handleRemove = async (id) => {
    dispatch(removeBlog(id))
  }

  const handleUpdate = async (blog, updatedData) => {
    dispatch(updateBlog(blog, updatedData))
  }

  return (
    <div>
      { blogs
        ? blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              handleRemove={handleRemove}
              handleUpdate={handleUpdate}
            />
          )
        : <div>Loading...</div>
      }
    </div>
  )
}

export default Blogs