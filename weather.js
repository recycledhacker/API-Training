/* eslint-enable */
//  Make sure the document is loaded
document.addEventListener('DOMContentLoaded', updateWeather(false))

function updateWeather (value) {
  //  Establish the variables for the fetch operation
  //  let url = 'http://api.openweathermap.org/data/2.5/weather?lat=39.131942&lon=-121.100202&APPID=e81d1f9c935070173af5920db32d27cc&units=imperial')
  let getWeather = 'http://api.openweathermap.org/data/2.5/weather?'
  let key = 'e81d1f9c935070173af5920db32d27cc'
  //  let zip = 95949;
  let lat = 39.131942
  let lon = -121.100202
  let fahrenheit = '&units=imperial'  
  let celcius = '&units=metric'
  let units = fahrenheit
  //  let zip = '95949'
  //  let zipApi = getWeather + zip + '&APPID=' + key
  //  zipApi = zipApi.concat(fahrenheit)
  //  console.log(api)
    let geoApi = getWeather + 'lat=' + lat + '&lon=' + lon + '&APPID=' + key
    geoApi = geoApi.concat(units)
  //  console.log(geoApi)

  //  Get the variables from the website for replacement with data from the API

  let summary = document.getElementById('summary')
  let temperature = document.getElementById('temperature')
  let pressure = document.getElementById('pressure')
  let humidity = document.getElementById('humidity')
  let windSpeed = document.getElementById('windSpeed')
  let windDirection = document.getElementById('windDirection')

  //  Make a function to convert wind direction to compass headings

  function degToDir (deg) {
  //  Set the range to all 16 compass headings
    let range = 360 / 16
    let low = 360 - range / 2
    let high = (low + range) % 360
    let angles = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    //  This may have sreated a problem with wind direction.
    let i = 0
    for (i in angles) {
      if (deg >= low && deg < high)
        return angles[i]
      low = (low + range) % 360
      high = (high + range) % 360
    }
  }

  //  Make a function to convert pressure in millibars to Inches Mercury
  function mbarToInches (pressure) {
    return pressure * 0.029530
  }
  //  Use navigator geolocation to get user location
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition (fixPosition)
  } else { zip = window.prompt('Could not discover your location!  What is your Zip Code')}
  //  Make a function to update by Geolocation
  function fixPosition(position) {
    lat = position.coords.latitude
    lon = position.coords.longitude
  }
  
  //  fetch('http://api.openweathermap.org/data/2.5/weather?lat=39.131942&lon=-121.100202&APPID=e81d1f9c935070173af5920db32d27cc&units=imperial')
  //  update units function
    if (value === true) {
      units = celcius;
    } else { 
      units = fahrenheit;
    }
  geoApi = getWeather + 'lat=' + lat + '&lon=' + lon + '&APPID=' + key + units
  console.log(geoApi)
    //  Make the fetch request and convert to JSON   
    fetch(geoApi)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Bad HTTP!')
        }
      })
      .then((j) => {
        summary.innerHTML = j.weather[0].main,
        temperature.innerHTML = (j.main.temp).toFixed(1) + '° F',
        pressure.innerHTML = (mbarToInches(j.main.pressure)).toFixed(2) + ' inHg',
        humidity.innerHTML = j.main.humidity + ' %',
        windSpeed.innerHTML = j.wind.speed + ' MPH',
        windDirection.innerHTML = degToDir(j.wind.deg)
      })
      .catch((err) => {
        console.log('Error:', err.message)
      })
  
  //  if(navigator.geolocation){
  //  navigator.geolocation.getCurrentPosition(showPosition);
  //  } else {
  //  let zip = window.prompt("Could not discoveryour location
  //  what is your Zip Code?")
  //  }
}