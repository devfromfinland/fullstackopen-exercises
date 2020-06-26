import React, { useState, useEffect } from 'react'
import axios from 'axios'

const baseURL = 'https://restcountries.eu/rest/v2/name'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const fetchData = async (name) => {
      console.log('name', name)
      try {
        const response = await axios.get(`${baseURL}/${name}?fullText=true'`)
      console.log('fetched data', response.data)
      setCountry(response.data[0])
      } catch (error) {
        setCountry(null)
      }
    }

    name === ''
      ? setCountry(null)
      : fetchData(name)
  }, [name])

  const found = country ? true : false
  const data = country
    ? {
      name: country.name,
      capital: country.capital,
      population: country.population,
      flag: country.flag
    }
    : null

  return {
    found,
    data
  }
}

const Country = ({ country }) => {
  // console.log('country', country)
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = async (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type='submit'>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App