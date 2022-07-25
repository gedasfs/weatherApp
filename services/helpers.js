const meteoApiServices = require('./MeteoApi');
const meteoApi = new meteoApiServices();

const getReqForecastInfo = function (fullForecast) {
    // to do: validation of fullForecast
    let forecast = {
      code: fullForecast.place.code,
      name: fullForecast.place.name,
      coordinates: fullForecast.place.coordinates,
      createdAtUTC: fullForecast.forecastCreationTimeUtc,
    }
    // forecast['createdAtLocal'] = meteoApi.getLocalDateTimeFromUTC(forecast.createdAtUTC);
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
        return new Date(`${dateTimeUTC}`).toLocaleString();
    } else {
        return new Date(`${dateTimeUTC} UTC`).toLocaleString();
    }
}


module.exports = {getReqForecastInfo, getLocalDateTimeFromUTC};