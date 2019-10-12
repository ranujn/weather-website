const request = require('request');

const geolocation = (city, callback) => { 
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoicmFudWpuIiwiYSI6ImNqemNtbjZuMTAwNzYzbnBsdDVsOWxmOGcifQ.J8L77vzpg6lBRNot44HlnQ&limit=1`
    request({url, json: true}, (error, {body}) => { 
        console.log('logging features length ', body.features.length) 
        if (error){ 
            callback(undefined,'Unable to access Geolocation Service!') 
        } else if (body.features.length === 0){ 
            callback(undefined,'Unable to find location, Try another Search.') 
        } else { 
            callback({ 
                latitude: body.features[0].center[1], 
                longitude:body.features[0].center[0], 
                place:body.features[0].place_name 
            }, undefined) } 
    });
}
module.exports = geolocation