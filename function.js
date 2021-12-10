const config = require('./config.js')
const axios = require('axios')

const req = require('express/lib/request')
const { response } = require('express')
const res = require('express/lib/response')
const dotenv = require('dotenv').config()
const moment = require('moment')


//CHECK WEATHER DETAILS
const weatherDetails = async(req, res) => {
        await axios.get(config.weatherApiUrl(process.env.APIKEY, req.query.weatherLocation)
        ).then(weatherApiResponse => {
            const location = {'LOCATION': weatherApiResponse.data.location}
            
            if(req.query.weatherLocation.includes('forecast')){
                const forecast = {'FORECAST': weatherApiResponse.data.forecast}
                                return res.status(200).send(Object.assign(location, forecast))
                
            } else {
                const weather = {'WEATHER': weatherApiResponse.data.current}
                return res.status(200).send(Object.assign(location, weather))

            }
        }).catch( ()=> {
            return res.status(400).send({"text": "request error"})
        })
}

//CHECK COVID DETAILS
const covidDetails = async (req, res) => {
    if(!req.query.date) {
        return res.status(400).send({"text": "empty value date error"})

    } else {
        let userDate = validDate(req.query.date)
       const rapidApiConfig = {
        method: 'GET',
        url: config.rapidCovidUrl,
        params: {date: userDate, 'date-format': 'YYYY-MM-DD'}, //API DATA limit until 2020-july
        headers: {
          'x-rapidapi-host': process.env.RAPIDHOST,
          'x-rapidapi-key': process.env.RAPIDKEY
        }
      };
    await axios.request(rapidApiConfig).then(rapidApiResponse => {
        return res.status(200).send(rapidApiResponse.data) 
    }).catch(() => {
        return res.status(400).send({"text": "date error"})
     })
    }  
}

//VALIDATE USER DATE
const validDate = (date) => {
    if(moment(date, "YYYY-MM-DD").isValid) {
    return moment(date).format('YYYY-MM-DD')
    }
}

module.exports = {
    covidDetails,
    weatherDetails
}
