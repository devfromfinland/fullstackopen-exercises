  
import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      // console.log('baseUrl', baseUrl)
      try {
        const response = await axios.get(baseUrl)
      // console.log('fetched data', response.data)
      setResources(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [baseUrl])

  const create = async (resource) => {
    try {
      const result = await axios.post(baseUrl, resource)
      // console.log('result', result)
      setResources([ ...resources, result.data ])
    } catch (error) {
      console.log(error)
    }
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const mainContent = Object.assign({}, content)
  delete mainContent.reset

  const name = useField('text')
  const mainName = Object.assign({}, name)
  delete mainName.reset

  const number = useField('text')
  const mainNumber = Object.assign({}, number)
  delete mainNumber.reset

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    content.reset()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    name.reset()
    number.reset()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...mainContent} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...mainName} /> <br/>
        number <input {...mainNumber} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App