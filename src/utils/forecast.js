const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5b9f0f779f400e964dbc47f29b2050bc&query='+latitude+','+longitude+'&units=m'
    request({ url: url, json: true }, (error, {body}) => {
        if (error){
            callback('Unable to connect weather service', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                humidity: body.current.humidity
            })
        }   
    })
}


module.exports = forecast