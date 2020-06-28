import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateBlog, addNewComment } from '../reducers/blogReducer'
import { v4 as uuidv4 } from 'uuid'

const BlogDetail = () => {
  const dispatch = useDispatch()
  const [data, setData ] = useState('')
  const { id } = useParams()
  const blog = useSelector(state => state.blogs
    ? state.blogs.find(a => a.id === id)
    : null
  )

  const handleLike = () => {
    dispatch(updateBlog(blog, { likes: blog.likes + 1 }))
  }

  const handleNewComment = (e) => {
    e.preventDefault()
    if (data !== '') {
      dispatch(addNewComment(id, data))
      setData('')
    }
  }

  return blog
  ? <div>
      <h1>{blog.title}</h1>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={handleLike} className='btn-likes'>like</button>
      </div>
      <div>added by {blog.user.name}</div>

      <h3>comments</h3>
      <form onSubmit={handleNewComment}>
        <input type='text' value={data} onChange={e => setData(e.target.value)} placeholder='add a comment'/>{' '}
        <button type='submit'>add comment</button>
      </form>

      { blog.comments.length > 0
        ? <ul>
          {blog.comments.map(comment => <li key={uuidv4()}>{comment}</li>)}
        </ul>
        : <p>No comment for this blog yet, feel free to add the first one.</p>
      }
      
    </div>
  : <div>Invalid URL</div>
}

export default BlogDetail