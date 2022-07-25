const axios = require('axios');
const moment = require('moment');
const API_BASE_URL = 'https://api.meteo.lt/v1/';
const API_BASE_PLACES = API_BASE_URL + 'places/';


class MeteoApi {

    getPlaces = function() {
        return axios.get(API_BASE_PLACES)
            .then(response => response.data)    //returns parsed json
            .catch(err => {
                let newError = this.transformResponseError(err);
                
                throw newError;
            });
    };

    getPlaceForecast = function(placeCode) {
        let forecastType = 'long-term';
        let apiUrlPlace = API_BASE_PLACES + `${placeCode}/forecasts/${forecastType}/`;

        return axios.get(apiUrlPlace)
            .then(response => response.data)    //returns parsed json (= object)
            .then(data => {

                // Adding local dateTimes to original data
                data = this.addLocalDateTimes(data);
                
                return data;
            })
            .catch(err => {
                let newError = this.transformResponseError(err);
                
                throw newError;
            });
    }

    getLocalDateTimeFromUTC = function(dateTimeStrUTC) {
        return moment.utc(dateTimeStrUTC).local().format('YYYY-MM-DD HH:mm:ss');
    }

    getDateFromDateTime = function(dateTime) {
        return moment(dateTime).format('YYYY-MM-DD');
    }

    getTimeFromDateTime = function(dateTime) {
        return moment(dateTime).format('HH:mm:ss');
    }

    addLocalDateTimes(data) {
        data.forecastCreationTimeLocal = this.getLocalDateTimeFromUTC(data.forecastCreationTimeUtc);

        data.forecastTimestamps.forEach(timeStamp => {
            timeStamp.forecastDateTimeLocal = this.getLocalDateTimeFromUTC(timeStamp.forecastTimeUtc);
            timeStamp.forecastDate = this.getDateFromDateTime(timeStamp.forecastDateTimeLocal);
            timeStamp.forecastTimeLocal = this.getTimeFromDateTime(timeStamp.forecastDateTimeLocal);
        });

        return data;
    }

    transformResponseError = function(error) {
        let newError = new Error();
    
        newError.status = error.status;
        newError.message = `Error name: ${error.name}. Message: ${error.message}`;
    
        return newError;
    }

}

module.exports = MeteoApi;
