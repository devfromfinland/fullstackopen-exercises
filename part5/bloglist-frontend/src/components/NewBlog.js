import React, { useState, useImperativeHandle } from 'react'

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
      <form onSubmit={handleSubmit}>
        <div>
          title: <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div>
          author: <input type='text' value={author} onChange={(e) => setAuthor(e.target.value)}/>
        </div>
        <div>
          url: <input type='text' value={url} onChange={(e) => setUrl(e.target.value)}/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
})

export default NewBlog