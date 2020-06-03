import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import CountryDetails from './components/CountryDetails'

function App() {
  const [ searchValue, setSearchValue ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (e) => {
    const newCountries = countries.filter(country => country.name
      .toUpperCase()
      .search(e.target.value.toUpperCase()) >= 0)
    
    setSearchValue(e.target.value)
    setFilteredCountries(newCountries)
  }

  return (
    <div>
      find countries <input value={searchValue} onChange={handleSearch}/>

      { filteredCountries.length > 10 && <div>Too many matches, specify another filter</div> }

      { filteredCountries.length === 1 && <CountryDetails country={filteredCountries[0]}/> }

      { (filteredCountries.length > 1 && filteredCountries.length <= 10) && 
        <Countries countries={filteredCountries}/>
      } 
    </div>
  )
}

export default App