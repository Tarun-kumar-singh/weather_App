const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')

const publicDirectory = path.join('__dirname','../public')
const viewsPath = path.join('__dirname','../views')
const partialspath = path.join('__join','../views/partials')


app.use(express.static(publicDirectory))
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialspath)



const forecast = require('./forcast')
const geocode = require('./geocode')
const chalk = require('chalk')


app.get('/',(req,res) =>{
  // res.render('index',{
  //   title:'weather information',
  //   name:'Tarun Singh'
  // })

  if(!req.query.address){
    console.log('Provide address')
    return
  }
  geocode(' Bengluru, Karnatka India',(error,{LATITUDE:latitude, LONGITUTDE:longitude, PLACENAME:location} = {}) => {
   if(error){
     console.log(error)
     res.send({ error })
     return
    }
   forecast(latitude,longitude,(error,forecast) =>{
     if (error) {
       console.log(error)
       res.send({ error })
       return
     }
     console.log((chalk.green.inverse(location)))
     temp_in_c = (5/9) * (forecast.CURRENTLY_TEMP - 32)
     console.log(temp_in_c.toFixed(2) + " C")
     console.log(forecast);
     res.render('index',{
       forecast:forecast,
       title:'WEATHER FORECAST',
       name:'Tarun Singh',
       query_search:req.query.address
     })
    })
 })


})

app.get('/about',(req,res) =>{
  res.render('about')
})


app.get('*',(req,res) => {

res.render('404',{
  errormessage:'No conent find for this endpoint'
})
})


port = 3000
app.listen(port,()  =>{
  console.log("App is listening on port "+ port)
})

//  geocode(' Bengluru, Karnatka India',(error,{LATITUDE:latitude, LONGITUTDE:longitude, PLACENAME:location}) => {
//   if(error){
//     console.log(error)
//     return
//    }
//   forecast(latitude,longitude,(error,forecast) =>{
//     if (error) {
//       console.log(error)
//       return
//     }
//     console.log((chalk.green.inverse(location)))
//     temp_in_c = (5/9) * (forecast.CURRENTLY_TEMP - 32)
//     console.log(temp_in_c.toFixed(2) + " C")
//     // console.log(forecast)//
//   })
// })
