const request = require('request');

forecast = (latitude,longitude,callback) =>{
  url = "https://api.darksky.net/forecast/b3d603a25d632afcca278e45c1fac230/" + latitude + ',' + longitude
  request({url: url, json: true},(error,response) => {

    callback(undefined,{
    current_status:{
      "WEATHER_STATUS": response.body.currently.summary,
      "CURRENTLY_TEMP":response.body.currently.temperature,
      "CURRENTLY_SUMMARY":response.body.currently.summary,
      "TIMEZONE":response.body.timezone,
      "WIND_SPEED":response.body.currently.windSpeed,
      "HUMIDITY":response.body.currently.humidity,
      "TIME":response.body.currently.time},
    hour_status:{
      "WEATHER_STATUS": response.body.hourly.summary,
      "HOURLY_TEMP":response.body.hourly.data[0].temperature,
      "WIND_SPEED":response.body.hourly.data[0].windSpeed,
      "HUMIDITY":response.body.hourly.data[0].humidity,
      "ICON":response.body.hourly.icon
    },
    daily_status:{
      "SUMMARY": response.body.daily.data[0].summary,
      "ICON":response.body.daily.data[0].icon,
      "HUMIDITY":response.body.daily.data[0].humidity,
      "WIND_SPEED":response.body.daily.data[0].windSpeed,

    }
    })
  })
}




module.exports = forecast
