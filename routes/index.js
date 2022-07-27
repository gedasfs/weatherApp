const express = require('express');
const router = express.Router();

const meteoApiServices = require('./../services/MeteoApi');
const meteoApi = new meteoApiServices();

const helpers = require('../helpers/mainHelper');
const DEFAULT_CITIES_CODES = require('./../configs/defaultCities');


router.get('/', async function(req, res, next) {
  try {
    let forecasts = [];

    for await (cityCode of DEFAULT_CITIES_CODES) {
      let fullForecast = await meteoApi.getPlaceForecast(cityCode);
      forecasts.push(helpers.getReqForecastInfo(fullForecast));
    }

    // res.json(forecasts);
    res.render('index', {forecasts});
  }
  catch (err) {
      next(err);
      console.log(err);
  }
});

module.exports = router;
