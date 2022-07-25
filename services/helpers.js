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


module.exports = {getReqForecastInfo, groupForecastsByDays};