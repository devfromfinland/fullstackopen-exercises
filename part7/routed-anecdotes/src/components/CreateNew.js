import React from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const content = useField('text')
  const mainContent = Object.assign({}, content)
  delete mainContent.reset

  const author = useField('text')
  const mainAuthor = Object.assign({}, author)
  delete mainAuthor.reset

  const info = useField('text')
  const mainInfo = Object.assign({}, info)
  delete mainInfo.reset

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.showNotification(`a new anecdote '${content.value}' created`, 10)
    history.push('/')
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content <input name='content' {...mainContent} />
        </div>
        <div>
          author <input name='author' {...mainAuthor} />
        </div>
        <div>
          url for more info <input name='info' {...mainInfo} />
        </div>
        <button type='submit'>create</button>
      </form>
      <button onClick={handleReset}>reset</button>
    </div>
  )
}

export default CreateNew