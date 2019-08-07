var form =  document.querySelector('form')
var message1 = document.querySelector("#message-1")
var message2 = document.querySelector("#message-2")

 form.addEventListener('submit',(e) => {
   var address = document.querySelector('input').value
   document.querySelector('#loadingmessage').textContent = 'Loading...'
   document.querySelector("#message-error").textContent = ""

  fetch('/w?address=' + address).then((response) =>{

    response.json().then((data) =>{
      if (data.error) {
        document.querySelector('#loadingmessage').textContent = ""
        document.querySelector("#message-error").textContent = data.error
        return
      }
      else {
        document.querySelector('#loadingmessage').textContent = ""
       document.querySelector('#datadisplay').style.display  = "block"
       message1.textContent = data.location
       message2.textContent = "Current status"
       document.querySelector("#message-4").textContent ="Time: "+ new Date(data.forecast.current_status.TIME * 1000)
       document.querySelector("#message-5").textContent ="Weather status: "+ data.forecast.current_status.WEATHER_STATUS
       document.querySelector("#message-6").textContent ="Temperature: "+ data.forecast.current_status.CURRENTLY_TEMP + "F/ " + (((data.forecast.current_status.CURRENTLY_TEMP) - 32) * 5/9).toFixed(2) + "C"
       document.querySelector("#message-7").textContent ="Wind speed: "+ data.forecast.current_status.WIND_SPEED + " km/h"
       document.querySelector("#message-8").textContent ="Humidity: "+ data.forecast.current_status.HUMIDITY * (100) + "%"
       document.querySelector("#hour-message-1").textContent = data.forecast.hour_status.WEATHER_STATUS
       document.querySelector("#day-message-1").textContent = data.forecast.daily_status.SUMMARY

 }

    })
  })

    e.preventDefault()
})
