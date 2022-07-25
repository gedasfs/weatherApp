const axios = require('axios');
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
            .then(response => response.data)    //returns parsed json
            .catch(err => {
                let newError = this.transformResponseError(err);
                
                throw newError;
            });

    }

    transformResponseError = function(error) {
        let newError = new Error();
    
        newError.status = error.status;
        newError.message = `Error name: ${error.name}. Message: ${error.message}`;
    
        return newError;
    }

}

module.exports = MeteoApi;
