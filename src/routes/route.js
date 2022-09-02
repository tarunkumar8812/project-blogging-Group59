const express = require('express');
const router = express.Router();
const CowinController = require("../controllers/cowinController")
const weatherController = require("../controllers/weatherController")
const memeController = require("../controllers/memeController")


//  -------------------------------- Vaccine Axios API --------------------------------
router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)
router.get("/cowin/getByDistrict", CowinController.getByDistrict)
router.post("/cowin/getOtp", CowinController.getOtp)

// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date

//  -------------------------------- Weather Axios API --------------------------------
router.get("/weather/getWeather", weatherController.getWeather)
router.get("/weather/getWeatherOfMultiCity", weatherController.getWeatherOfMultiCity)

//  -------------------------------- Memes Axios API --------------------------------

router.get("/getAllMemes", memeController.getAllMemes)
router.post("/memeHandler", memeController.memeHandler)

module.exports = router;