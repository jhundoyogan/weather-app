const request = require('request')

//to get the weather forecast from the given longitude and latitude
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=19665478e798b83a35698d111d4427f8&query=' + latitude + ',' + longitude + '&units=f'

    // to refactor code (the body): (getting the body.current instead of response.body.current)
    // use the Object Property Shorthand and Destructuring syntax 
    request({ url, json: true }, (error, { body }) => {   
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 
                     body.current.weather_descriptions[0] + 
                     '. It is currently ' + body.current.temperature + ' degrees Fahrenheit. It feels like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '%.')
        }
    })
}

module.exports = forecast