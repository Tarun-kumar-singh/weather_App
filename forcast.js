const request = require('request');

forecast = (latitude,longitude,callback) =>{
  url = "https://api.darksky.net/forecast/b3d603a25d632afcca278e45c1fac230/" + latitude + ',' + longitude
  request({url: url, json: true},(error,response) => {

    callback(undefined,{
      "WEATHER_STATUS": response.body.hourly.summary,
      "CURRENTLY_TEMP":response.body.currently.temperature,
      "CURRENTLY_SUMMARY":response.body.currently.summary,
      "TIMEZONE":response.body.timezone,
      "WIND_SPEED":response.body.currently.windSpeed,
      "HUMIDITY":response.body.currently.humidity,
      "TIME":response.body.currently.time
    })
  })
}




module.exports = forecast
