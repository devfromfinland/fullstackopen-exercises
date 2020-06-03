import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ searchValue, setSearchValue ] = useState('')

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

  const handleSubmit = (newName, newNumber) => {
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
          })
          .catch(error => {
            console.warn(error)
            return 'fail'
          })
        return 'success'
      }
    } else {
      personService
        .create({ name: newName, number: newNumber })
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
        })
        .catch(error => {
          console.warn(error)
          return 'fail'
        })
      return 'success'
    }
  }

  const handleRemove = (id) => {
    personService
      .remove(id)
      .then(setPersons(persons.filter(person => person.id !== id)))
      .catch(error => {
        console.warn(error)
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