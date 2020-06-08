import React, { useState } from 'react'
import Notification from './Notification'

const PersonForm = ({ handleSubmit }) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ alertMessage, setAlertMessage ] = useState(null)

  const notify = (type, message) => {
    setAlertMessage({
      type: type,
      message: message
    })
    setTimeout(() => {
      setAlertMessage(null)
    }, 5000)
  }

  const doSubmit = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '') {
      notify('error', 'You need to input the data (name & number) first')
      return
    }

    handleSubmit(newName, newNumber)
      .then(result => {
        // console.log('submit result', result)
        if (result.type === 'success') {
          setNewNumber('')
          setNewName('')
        }
        notify(result.type, result.message)
      })
      .catch(error => {
        // console.log('error', error)
        notify('error', error.message)
      })
  }

  return (
    <>
      { alertMessage && <Notification type={alertMessage.type} message={alertMessage.message}/>}
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
    </>
  )
}

export default PersonForm