const express = require('express');
const router = express.Router();

const meteoApiServices = require('./../../../services/MeteoApi');
const meteoApi = new meteoApiServices();

const helpers = require('./../../../services/helpers');

router.get('/find/:placeName', async function(req, res, next) {
    try {
        let places = await meteoApi.getPlaces();
        places = places.filter(place => place.name.toLowerCase().includes(req.params.placeName.toLowerCase()));

        places = places.slice(0, 10);

        // res.render('cities', {places});
        res.json(places);
    }
    catch (err) {
        next(err);
        console.log(err);
    }
    
});

router.get('/forecast/:placeCode', async function(req, res, next) {
    try {
        let forecast = await meteoApi.getPlaceForecast(req.params.placeCode);
        console.log(forecast);

        for (let i = 0; i < forecast.forecastTimestamps.length; i++) {
            forecast.forecastTimestamps[i]['forecastTimeLocal'] = helpers.getLocalDateTimeFromUTC(forecast.forecastTimestamps[i]['forecastTimeUtc']);
        }

        res.render('forecast', {forecast});
        // res.json(forecast);
    }
    catch (err) {
        next(err);
        console.log(err);
    }
    
});

module.exports = router