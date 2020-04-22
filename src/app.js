//server side javascript
//setting up the web server
const path = require('path')// no need to install since this is a built in module from node
const express = require('express') //express library is actually a single function and not an object
const hbs = require('hbs')// hbs is a library to integrate express with handlebars
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()// assigning the express function to app constant
const port = process.env.PORT || 3000 // port 3000 is used as default if environment variable PORT doesn't exist,
//process.env.PORT will be used by heroku

// Define paths for Express config
// using the path module from nodejs. this module has the join method
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')//partials contains the headers and footers that we can reuse in the webpages

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))//using the express.static function

//app constant uses the get method which contains the request and response object
app.get('', (req, res) => {
    //use .render to render our handlebar templates
    res.render('index', {
        //you can use the properties of this object for the index.hbs file
        title: 'Weather',
        name: 'Jhun Doyogan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jhun Doyogan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Jhun Doyogan'
    })
})

//looking for the weather data when given a location
app.get('/weather', (req, res) => {
    //query string
    //checks if there's address in the query string
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    
    //set up a default object for the object we're destructuring ({lat,long,loc} = {}) so that the
    //code still works even if no data was provided
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jhun Doyogan',
        errorMessage: 'Help article not found.'
    })
})

// * symbol is wildcard character that shows something not included in our files, thus will show a 404 error
// this must be located at last part because the wildcard will match anything
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jhun Doyogan',
        errorMessage: 'Page not found.'
    })
})

// from const port
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})