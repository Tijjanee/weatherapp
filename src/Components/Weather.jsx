import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Weather.css'
import { faEnvelope, faSun } from '@fortawesome/free-regular-svg-icons'
import { faCloud, faCloudSun, faCloudSunRain, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faSoundcloud } from '@fortawesome/free-brands-svg-icons'

const Weather = () => {

  const [data, setData] = useState([])
  const inputRef = useRef()
  const imgIcon = `https://openweathermap.org/img/wn/${data.icon}@2x.png`
  
  const weatherData = async (city)=>{

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      const response = await fetch(url)
      const record = await response.json()
      console.log(record)
      setData({
        temperature: record.main.temp,
        windspeed: record.wind.speed,
        humidity: record.main.humidity,
        location: record.name,
        country: record.sys.country,
        icon: record.weather[0].icon,
        description: record.weather[0].description
    })
    } catch (error) {
      setData('')
      // alert('Sorry problem occur while fetching data')
    }
  
  }

  useEffect(()=>{
    weatherData()
  }, [])

  return (
    <div className='container'>
        <div className="weather-app">
            <div className="search-container">
              <input type="text" ref={inputRef} placeholder='Search by city name..'/>
              <button className='btn-container' onClick={()=>{
                weatherData(inputRef.current.value)
                inputRef.current.value = ''
                }}>
                <FontAwesomeIcon icon={faSearch} className='icon-search'/>
              </button>
            </div>

            {data?<>
              
            <h2 className="country">Country: {data.country}</h2>

            <div className="body-container">
              <img src={imgIcon} alt="weather-icon" className='icon-sun' />
              <h1 className="heading">{Math.floor(data.temperature)}℃</h1>
              <p>{data.location}</p>
              <span className="description">Description: {data.description}</span>
            </div>

            <div className="bottom-container">
              <div className="humidity">
                <p>Humidity</p>
                <h2>{data.humidity}%</h2>
              </div>
              <div className="wind-speed">
                <p>Wind Speed</p>
                <h2>{data.windspeed} km/hr</h2>
              </div>
            </div>
            </>:<></>}


        </div>
    </div>
  )
}

export default Weather