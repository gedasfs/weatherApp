const express = require('express');
const router = express.Router();
const MAJOR_CITIES_CODES = require('./../configs/majorCities');

router.get('/', function(req, res, next) {
  res.render('cities', {MAJOR_CITIES_CODES});
});

module.exports = router;
