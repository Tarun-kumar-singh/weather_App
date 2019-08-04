var form =  document.querySelector('form')
var message1 = document.querySelector("#message-1")
var message2 = document.querySelector("#message-2")

 form.addEventListener('submit',(e) => {
   var address = document.querySelector('input').value

  fetch('http://localhost:3000/w?address=' + address).then((response) =>{

    response.json().then((data) =>{
      if (data.error) {
        console.log(data.error)
        document.querySelector("#message-error").textContent = data.error
        return
      }
      else {
       document.querySelector("#loadingmessage").textContent = " Loading..."
       document.querySelector('#datadisplay').style.display  = "block"
       message1.textContent = data.location
       message2.textContent = "Current status"
       document.querySelector("#message-4").textContent ="Time: "+ new Date(data.forecast.current_status.TIME)
       document.querySelector("#message-5").textContent ="Weather status: "+ data.forecast.current_status.WEATHER_STATUS
       document.querySelector("#message-6").textContent ="Temperature: "+ data.forecast.current_status.CURRENTLY_TEMP
       document.querySelector("#message-7").textContent ="Wind speed: "+ data.forecast.current_status.WIND_SPEED + " km/h"
       document.querySelector("#message-8").textContent ="Humidity: "+ data.forecast.current_status.HUMIDITY * (100) + "%"
       document.querySelector("#loadingmessage").style.display = "none"
}

    })
  })

    e.preventDefault()
})
