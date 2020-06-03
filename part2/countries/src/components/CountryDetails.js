import React from 'react'
import Weather from './Weather'

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>

      <h3>languages</h3>
      <ul>
        {country.languages.map(language => 
          <li key={language.name}>
            {language.name}
          </li>)
        }
      </ul>

      <div>
        <img src={country.flag} alt={country.name} style={{height: '5rem'}}/>
      </div>

      <Weather city={country.capital}/>
    </div> 
  )
}

export default CountryDetails