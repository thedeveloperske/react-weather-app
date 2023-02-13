import React, { useState } from 'react'
import './index.css'

const App = () => {

  const api = {
    API_KEY: "ec0092c49c7f0ac33e45abf77abad89c",
    BASE_URL: "https://api.openweathermap.org/data/2.5/"
  }

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.BASE_URL}weather?q=${query}&units=metric&APPID=${api.API_KEY}`)
      .then(res => res.json())
      .then(result=> {
        setWeather(result);
        setQuery('');
        console.log(result)
      })
    } 
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Novemeber", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={(
      typeof weather.main != "undefined") 
        ? ((weather.main.temp > 16) 
        ? 'app-warm' 
        : 'app') 
        : 'app'}>
      <main>
        <div className='search-box'>
          <input type='text' className='search-bar' placeholder='Search...' onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}⁰C</div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
        
      </main>
    </div>
  )
}

export default App