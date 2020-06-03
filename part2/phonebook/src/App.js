import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ searchValue, setSearchValue ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const isExist = (name) => persons.find(person => person.name.toUpperCase() === name.toUpperCase()) ? true : false

  const handleSubmit = (newName, newNumber) => {
    if (isExist(newName)) {
      alert(`${newName} is already added to phonebook`)
      return 'fail'
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      return 'success'
    }
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
      <Persons persons={searchValue === '' ? persons : findPersons(persons, searchValue)}/>
      
    </div>
  )
}

export default App