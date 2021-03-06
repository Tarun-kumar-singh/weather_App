const request = require('request');


const reversegeocode =  (latitude,longitude,callback) => {

  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +latitude +"," + longitude + ".json?access_token=pk.eyJ1IjoidGFydW4yNSIsImEiOiJjanlwa2hha3ExYzl6M21ub2c5YmoyZDBvIn0.xnLuWdcM4lqGLzqgWNfgxA"
  request({url:url, json:true},(error,response) => {

    if (error) {
      callback('Unable to connect to geo location services',undefined)
    }
    else if (response.body.features.length === 0) {
      callback('Unable to find the geo location of the given address',undefined)
      return
    }
    callback(undefined,{"PLACENAME":response.body.features[0].place_name})
  })
}




module.exports = reversegeocode
