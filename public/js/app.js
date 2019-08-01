

var form =  document.querySelector('form')
var message1 = document.querySelector("#message-1")


form.addEventListener('submit',(e) => {

  var address = document.querySelector('input').value
  message1.textContent = 'Loding...'
  fetch('http://localhost:3000/w?address=' + address).then((response) =>{

    response.json().then((data) =>{
      if (data.error) {
        console.log(data.error)
      }
      else {
      message1.textContent = data.forecast.CURRENTLY_TEMP
      }
    })
  })

    e.preventDefault()
})
