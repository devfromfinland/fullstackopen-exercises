import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const NewBlog = React.forwardRef(({ handleNewBlog }, ref) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const reset = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  useImperativeHandle(ref, () => {
    return {
      reset
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    handleNewBlog({ title, author, url })
  }

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleSubmit} className='new-form'>
        <div className='new-title'>
          title: <input className='input-title' type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className='new-author'>
          author: <input className='input-author' type='text' value={author} onChange={(e) => setAuthor(e.target.value)}/>
        </div>
        <div className='new-url'>
          url: <input className='input-url' type='text' value={url} onChange={(e) => setUrl(e.target.value)}/>
        </div>
        <button type='submit' className='btn-submit'>create</button>
      </form>
    </div>
  )
})

NewBlog.displayName = 'NewBlog'

NewBlog.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
}

export default NewBlog