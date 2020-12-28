//jshint esversion:6

const request = require('request');

const forecast = (longitude,latitude,callback) => {
    const key ='6dbe94aaf7f55f91d97d96a5697544e3';
    const url = 'http://api.openweathermap.org/data/2.5/weather?lon=' + longitude + '&lat=' + latitude + '&units=metric&APPID=' + key;

    request({ url, json : true}, (e, { body }) => {
        try {
            callback(undefined,'Currently the temperature is ' + body.main.temp +'\xB0 C.');
        }
        catch (err) {
            if(e)
                callback("Unable to connect to weather service.",undefined);
            else
                callback("Unable to get data for this query.",undefined);
        }
    });
};

module.exports = forecast;