//jshint esversion:6

const request = require('request');

const geocode = (address,callback) => {

    const key = 'pk.eyJ1IjoiYW5zaHVtYW5tYWhhdG8wOTM1IiwiYSI6ImNraWVsemlsdzF1NHIyeG81dHAwdm81MTAifQ.G3UTR4O2Wed8YhRAuy5xWg';
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?limit=1&access_token=' + key;

    request({ url, json : true}, (e,{body}) => {
        try {
            callback(undefined,{
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            });
        }
        catch (err) {
            if(e)
                callback("Unable to connect to location service.",undefined);
            else
                callback("Unable to get data for this query.",undefined);
    }});
};

module.exports = geocode;