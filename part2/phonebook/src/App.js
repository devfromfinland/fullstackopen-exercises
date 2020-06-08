import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ searchValue, setSearchValue ] = useState('')
  const [ alertMessage, setAlertMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.warn(error)
      })
  }, [])

  const isExist = name => persons.findIndex(person => person.name.toUpperCase() === name.toUpperCase())

  const notify = (type, message) => {
    setAlertMessage({
      type: type,
      message: message
    })
    setTimeout(() => {
      setAlertMessage(null)
    }, 5000)
  }

  const handleSubmit = (newName, newNumber) => {
    return new Promise((resolve, reject) => {
      const pos = isExist(newName)
      if (pos >= 0) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number (${persons[pos].number}) with a new one (${newNumber})?`)) {
          const newPerson = { name: persons[pos].name, number: newNumber }
          personService
            .update(persons[pos].id, newPerson)
            .then (returnPerson => {
              setPersons(persons.map(person => 
                person.id !== persons[pos].id 
                ? person 
                : returnPerson))
  
              resolve({ 
                type: 'success', 
                message: `${newName}'s new phone number was updated` 
              })
            })
            .catch(error => {
              let msgToReturn = ''

              switch (error.message) {
                case 'Request failed with status code 404':
                  setPersons(persons.filter(person => person.name.toUpperCase() !== newName.toUpperCase()))
                  msgToReturn = `Information of ${newName} has been already removed from server`
                  break;

                case 'Request failed with status code 400':
                  msgToReturn = `Bad request (either because of the input or the person is not existed in the phonebook. Please refresh your browser.`
                  break;
              
                default:
                  break;
              }

              console.log(error)
              
              reject({ 
                type: 'error', 
                message: msgToReturn
              })
            })
        } else {
          resolve({ 
            type: 'warning', 
            message: 'Nothing happens yet'
          })
        }
      } else {
        personService
          .create({ name: newName, number: newNumber })
          .then(newPerson => {
            setPersons(persons.concat(newPerson))
            resolve({ 
              type: 'success', 
              message: `${newName} was added successfully to the phonebook` 
            })
          })
          .catch(error => {
            console.log(error)
            reject({ 
              type: 'error', 
              message: error.response.data.error
            })
          })
      }
    }) 
  }

  const handleRemove = (id) => {
    personService
      .remove(id)
      .then(setPersons(persons.filter(person => person.id !== id)))
      .then(notify('success', 'Remove successfully'))
      .catch(error => {
        console.log(error)
        notify('error', 'Error when trying to remove the person')
      })
  }

  const findPersons = (list, value) => {
    return list.filter(person => 
      person.name.toUpperCase()
      .search(value.toUpperCase()) >= 0
    )
  }

  const handleFilter = (value) => {
    setSearchValue(value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      { alertMessage && <Notification type={alertMessage.type} message={alertMessage.message}/>}

      <Filter handleFilter={handleFilter}/>

      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit}/>

      <h2>Numbers</h2>
      <Persons 
        persons={searchValue === '' 
          ? persons 
          : findPersons(persons, searchValue)}
        handleRemove={handleRemove}
      />
    </div>
  )
}

export default App