const axios = require('axios');
const moment = require('moment');
const helpers = require('../helpers/mainHelper');
const API_BASE_URL = 'https://api.meteo.lt/v1/';
const API_BASE_PLACES = API_BASE_URL + 'places/';


class MeteoApi {

    getPlaces() {
        return axios.get(API_BASE_PLACES)
            .then(response => response.data)    //returns parsed json
            .catch(err => {
                // let newError = this.transformResponseError(err);
                
                // throw newError;
                throw err;
            });
    };

    getPlaceForecast (placeCode) {
        let forecastType = 'long-term';
        let apiUrlPlace = API_BASE_PLACES + `${placeCode}/forecasts/${forecastType}/`;

        return axios.get(apiUrlPlace)
            .then(response => response.data)    //returns parsed json (= object)
            .then(data => {
                // Adding local dateTimes to original data
                data = this.addLocalDateTimes(data);
                
                return data;
            })
            .then(data => {
                // adding weather icons class names and day name to original data
                data = this.addIconsClassNames(data);
                data = this.addDayName(data);

                return data;
            })
            .catch(err => {
                let newError = this.transformResponseError(err);
                
                throw newError;
            });
    }

    getLocalDateTimeFromUTC(dateTimeStrUTC) {
        return moment.utc(dateTimeStrUTC).local().format('YYYY-MM-DD HH:mm:ss');
    }

    getDateFromDateTime(dateTime) {
        return moment(dateTime).format('YYYY-MM-DD');
    }

    getTimeFromDateTime(dateTime) {
        return moment(dateTime).format('HH:mm');
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

    addIconsClassNames(data) {
        data.forecastTimestamps.forEach(timeStamp => {
            timeStamp.iconClassname = helpers.getClassnameFromCondition(timeStamp.conditionCode);
        });

        return data;
    }

    addDayName(data) {
        data.forecastTimestamps.forEach(timeStamp => {
            timeStamp.dayName = moment(timeStamp.forecastDateTimeLocal).format('dddd');
        });

        return data;
    }

    transformResponseError(error) {
        let newError = new Error();

        if (error.name == 'AxiosError') {
            newError.status = error.status;
            newError.message = error.message;
        } else {
            newError.status = 404;
            newError.message = 'Not Found.';
        }
    
        return newError;
    }

}

module.exports = MeteoApi;
