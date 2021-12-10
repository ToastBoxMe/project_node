const dotenv = require('dotenv').config()
const weatherApiUrl = (weatherApiKey, cityName) =>
`http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${cityName}&days=1&aqi=no&alerts=no`

const rapidCovidUrl =`https://covid-19-data.p.rapidapi.com/report/totals`



module.exports = {
    weatherApiUrl,
    rapidCovidUrl
}