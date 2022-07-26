const express = require('express');
const router = express.Router();

const MeteoApiServices = require('./../../../services/MeteoApi');
const meteoApi = new MeteoApiServices();

const helpers = require('../../../helpers/mainHelper');

router.get('/cities/:placeName', async function(req, res, next) {
    try {
        let places = await meteoApi.getPlaces();
        places = places.filter(place => place.name.toLowerCase().includes(req.params.placeName.toLowerCase()));
        places = places.slice(0, 10);

        res.json(places);
    }
    catch (err) {
        next(err);
        console.log(err);
    }
    
});

router.get('/forecasts/:placeCode', async function(req, res, next) {
    try {
        let forecast = await meteoApi.getPlaceForecast(req.params.placeCode);

        forecast['groupedTimestamps'] = helpers.groupForecastsByDays(forecast.forecastTimestamps);

        res.render('forecast', {forecast});
        // res.json(forecast);
    }
    catch (err) {
        next(err);
        console.log(err);
    }
    
});

module.exports = router