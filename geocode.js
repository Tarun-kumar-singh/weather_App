const request = require('request');


const geocode =  (address,callback) => {
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoidGFydW4yNSIsImEiOiJjanlwa2hha3ExYzl6M21ub2c5YmoyZDBvIn0.xnLuWdcM4lqGLzqgWNfgxA"
  request({url:url, json:true},(error,response) => {

    if (error) {
      callback('Unable to connect to geo location services',undefined)
    }
    else if (response.body.features.length === 0) {
      callback('Unable to find the geo location  of the given address',undefined)

    }
    callback(undefined,{"LONGITUTDE":response.body.features[0].center[0], "LATITUDE": response.body.features[0].center[1],"PLACENAME":response.body.features[4].place_name})
  })
}




module.exports = geocode
