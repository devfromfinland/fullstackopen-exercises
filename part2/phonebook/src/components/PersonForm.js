import React, { useState } from 'react'

const PersonForm = ({ handleSubmit }) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const doSubmit = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '') {
      alert('You need to input the data (name & number) first')
      return
    }

    if (handleSubmit(newName, newNumber) === 'success') {
      setNewNumber('')
      setNewName('')
    } else {
      console.log('Something is wrong and it is taken care in the handleSubmit function')
    }
  }

  return (
    <form onSubmit={doSubmit}>
      <div>
        name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm