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

const port = process.env.PORT || 3000

app.get('/',(req,res) =>{
  res.render('index')
})

app.get('/w',(req,res) =>{

   if(!req.query.address){
    console.log('Provide address')
    res.send({error:'provide address'})
    return
  }
  geocode(req.query.address,(error,{LATITUDE:latitude, LONGITUTDE:longitude, PLACENAME:location} = {}) => {
   if(error){
     console.log(error)
     res.send({ error:error })
     return
    }
   forecast(latitude,longitude,(error,forecast) =>{
     if (error) {
       console.log(error)
       res.send({ error })
       return
     }
     res.send({
       forecast:forecast,
       location
     })
     console.log(forecast);
     console.log(location);
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


app.listen(port,()  =>{
  console.log("App is listening on port "+ port)
})

//
//
//
// Bugs spotted
//
// 1. on not matching the exact address server gets crashed
//
//
//
//
//
//
//
//
//
//
//
//
