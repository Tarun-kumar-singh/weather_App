const forecast = require('./forcast')
const geocode = require('./geocode')
const chalk = require('chalk')

geocode(' Bengluru, Karnatka India',(error,{LATITUDE:latitude, LONGITUTDE:longitude, PLACENAME:location}) => {
  if(error){
    console.log(error)
    return
   }
  forecast(latitude,longitude,(error,forecast) =>{
    if (error) {
      console.log(error)
      return
    }
    console.log((chalk.green.inverse(location)))
    temp_in_c = (5/9) * (forecast.CURRENTLY_TEMP - 32)
    console.log(temp_in_c.toFixed(2) + " C")
    // console.log(forecast)//
  })
})
