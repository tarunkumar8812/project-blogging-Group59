let axios = require("axios")
// //api key :-    4735f049d64442bdc4d985d3bb66d79c  ,
// //              df085f8e465387e45d9980607223850d  ,
// //              6f91f9f4673cc02e4c654c6c9c2680d0

const getWeather = async function (req, res) {
    try {
        const local = req.query.q
        const apiid = req.query.apiid
        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${local}&appid=${apiid}`
        }
        let result = await axios(options)
        // console.log(result.data.main)
        let data = result.data.main.temp
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

const getWeatherOfMultiCity = async function (req, res) {
    try {
        const cities = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        const tempOfCities = []
        for (let i = 0; i < cities.length; i++) {
            let obj = {}
            let options = {
                method: "get",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=4735f049d64442bdc4d985d3bb66d79c`
            }
            let result = await axios(options)
            obj["city"] = cities[i]
            obj["temp"] = result.data.main.temp
            // console.table(obj);
            tempOfCities.push(obj)
        }
        tempOfCities.sort(function (a, b) { return a.temp - b.temp })
        console.table(tempOfCities);
        return res.status(200).send({ msg: tempOfCities, status: true })
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

module.exports.getWeather = getWeather
module.exports.getWeatherOfMultiCity = getWeatherOfMultiCity