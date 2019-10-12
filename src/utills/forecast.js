const request = require('request');
const forecast = (latitute, longitute, callback) => { 
    const url = `https://api.darksky.net/forecast/93075364cce320babb7a26feb764e33f/${latitute},${longitute}` 
    
    request({url, json: true}, (error, {body}) => { 
        if (error){ 
            callback(undefined, 'Unable to connect to weather service!') 
        }else if (body.code){ 
            if (body.code === 400){ 
                callback(undefined, 'Unable to find location') 
            }else { 
                callback(undefined, body.error) 
            } 
        }else { 
            callback(`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability} chance of rain.`,undefined) 
        } 
    });
}
module.exports = forecast