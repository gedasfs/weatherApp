const meteoApiServices = require('./MeteoApi');
const meteoApi = new meteoApiServices();
const lodash = require('lodash');
const { groupBy } = require('lodash');

const getReqForecastInfo = function (fullForecast) {
    // to do: validation of fullForecast
    let forecast = {
      code: fullForecast.place.code,
      name: fullForecast.place.name,
      coordinates: fullForecast.place.coordinates,
      createdAtUTC: fullForecast.forecastCreationTimeUtc,
    }
    
    forecast['createdAtLocal'] = getLocalDateTimeFromUTC(forecast.createdAtUTC);
  
    let currentLocal = getLocalDateTimeFromUTC(new Date()); //new Date().toLocaleString();
    let hoursDiff = (new Date(currentLocal) - new Date(forecast.createdAtLocal)) / (1000 * 60 * 60);
  
    forecast['currentDateTimeLocal'] = currentLocal;
    forecast['hourdDiff'] = +hoursDiff.toFixed(2);
  
    let firstForecastDataIndex = Math.floor(forecast['hourdDiff'])
  
    forecast['forecastData'] = fullForecast.forecastTimestamps[firstForecastDataIndex];
  
    return forecast;
  }

const getLocalDateTimeFromUTC = function(dateTimeUTC) {
  dateTimeUTC = dateTimeUTC.toString();
  if (dateTimeUTC.includes('Z') || dateTimeUTC.includes('UTC')) {
      return new Date(`${dateTimeUTC}`).toLocaleString('lt-LT');
  } else {
      return new Date(`${dateTimeUTC} UTC`).toLocaleString('lt-LT');
  }
}

const groupForecastsByDays = function(timestamps) {
  timestamps =  groupBy(timestamps, timeStamp => timeStamp.forecastDateTimeLocal.split(' ')[0]);
  timestamps = Object.values(timestamps);

  return timestamps;
}


module.exports = {getReqForecastInfo, getLocalDateTimeFromUTC, groupForecastsByDays};