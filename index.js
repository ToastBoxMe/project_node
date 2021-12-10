const express = require ('express')
const dotenv = require('dotenv').config()
const theMethod = require('./function.js')
const app = express()
app.use(express.json())

//SET PORT
app.listen(process.env.PORT, () => {
    console.log(`localhost: ${process.env.PORT} started`)
})

//GET ROUTER & USER REQUEST
app.get('/data', (req, res) => {
    if(!req.query){
        return res.status(400).send({"text": "error no request"})

    } else if (req.query.date){
        theMethod.covidDetails(req, res)

    } else if (req.query.weatherLocation) {
        theMethod.weatherDetails(req, res)
    } 
})
