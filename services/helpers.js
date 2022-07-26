const { groupBy } = require('lodash');
const moment = require('moment');

const getReqForecastInfo = function (fullForecast) {
  
  let currTime = moment(moment().format('YYYY-MM-DD HH:mm:ss'));
  let forecastCreated = moment(fullForecast.forecastCreationTimeLocal);
  let hoursDiff = +moment.duration(currTime.diff(forecastCreated)).asHours().toFixed(0);
  
  let forecast = {
      code: fullForecast.place.code,
      name: fullForecast.place.name,
  }

  // Selects the next closest forecast data from fullForecast
  forecast.forecastData = fullForecast.forecastTimestamps[hoursDiff];
  
  return forecast;
}

const groupForecastsByDays = function(timestamps) {
  timestamps =  groupBy(timestamps, timeStamp => timeStamp.forecastDateTimeLocal.split(' ')[0]);
  timestamps = Object.values(timestamps);

  return timestamps;
}

const getClassnameFromCondition = function(conditionCode) {
  let className = 'wi wi-na';

  switch (conditionCode) {
    case 'clear':
      className = 'wi wi-day-sunny';
      break;
    case 'isolated-clouds':
      className = 'wi wi-day-sunny-overcast';
      break;
    case 'scattered-clouds':
      className = 'wi wi-day-cloudy-high';
      break;
    case 'overcast':
      className = 'wi wi-cloudy';
      break;
    case 'light-rain':
      className = 'wi wi-day-sprinkle';
      break;
    case 'moderate-rain':
      className = 'wi wi-showers';
      break;
    case 'heavy-rain':
      className = 'wi wi-rain';
      break;
    case 'sleet':
      className = 'wi wi-sleet';
      break;
    case 'light-snow':
      className = 'wi wi-day-snow';
      break;
    case 'moderate-snow':
      className = 'wi wi-snow';
      break;
    case 'heavy-snow':
      className = 'wi wi-snow-wind';
      break;
    case 'fog':
      className = 'wi wi-fog';
      break;
    case 'na':
    default:
      className = 'wi wi-na';
      break;
  }

  return className;
}


module.exports = {getReqForecastInfo, groupForecastsByDays, getClassnameFromCondition};