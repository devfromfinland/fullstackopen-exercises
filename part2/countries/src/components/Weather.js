import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
  const [ weatherData, setWeatherData ] = useState({})
  const api_key = process.env.REACT_APP_API_KEY
  const query=`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`

  useEffect(() => {
    axios
      .get(query)
      .then(response => {
        setWeatherData(response.data)
      })
  }, [query])

  const temperature = weatherData.current ? weatherData.current.temperature : null
  const iconURL = weatherData.current ? weatherData.current.weather_icons[0] : null
  const windSpeed = weatherData.current ? weatherData.current.wind_speed : null
  const windDirection = weatherData.current ? weatherData.current.wind_dir : null
  
  return (
    <div>
      <h3>Weather in {city}</h3>

      { weatherData.current 
        ? <>
            <div>
              <strong>temperature:</strong> {temperature} Celcius
            </div>
            <div>
              <img src={iconURL} alt={city} />
            </div>
            <div>
              <strong>wind:</strong> {windSpeed} kmph direction {windDirection}
            </div>
          </>
        : <p>no data</p>
      }
      
    </div>
  )
} 

export default Weather