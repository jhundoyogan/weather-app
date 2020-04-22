const request = require('request') //request package from npmjs modules

//gets the address and obtains the longitude & latitude of that address
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoianVuZG95b2dhbiIsImEiOiJjazk5bzMzcjQwOHo2M25tbzBuMWx6ZXlmIn0.fBYo6Zex8FLAp4XN9kRgkA&limit=1'

    // to refactor code (url & body): (getting the body.features)
    // use the Object Property Shorthand and Destructuring syntax
    request({ url, json: true }, (error, { body }) => {  
        if (error) {
            callback('Unable to connect to location services!', undefined) //low level error i.e there's no internet connection
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined) //there's no address being given or incomplete/wrong address
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode