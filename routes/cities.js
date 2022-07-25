const express = require('express');
const router = express.Router();

const MAJOR_CITIES_CODES = [
  {
    code: 'vilnius',
    name: 'Vilnius'
  },
  {
    code: 'kaunas',
    name: 'Kaunas'
  },
  {
    code: 'klaipeda',
    name: 'Klaipėda'
  },
  {
    code: 'siauliai',
    name: 'Šiauliai'
  },
  {
    code: 'panevezys',
    name: 'Panevėžys'
  },
  {
    code: 'alytus',
    name: 'Alytus'
  },
  {
    code: 'marijampole',
    name: 'Marijampolė'
  },
  {
    code: 'mazeikiai',
    name: 'Mažeikiai'
  },
  {
    code: 'jonava',
    name: 'Jonava'
  }
];


router.get('/', function(req, res, next) {
  res.render('cities', {MAJOR_CITIES_CODES});
});

module.exports = router;
