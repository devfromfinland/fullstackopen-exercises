import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ searchValue, setSearchValue ] = useState('')

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