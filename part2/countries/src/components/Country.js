import React, { useState } from 'react'
import CountryDetails from './CountryDetails'

const Country = ({ country }) => {
  const [ show, setShow ] = useState(false)

  return (
    <div>
      {country.name}
      <button onClick={() => setShow(!show)}>
        {show ? 'hide' : 'show'}
      </button>

      { show && <CountryDetails country={country}/> }
    </div>
  )
}

export default Country