const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)         
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vikas kumar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Vikas kumar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Vikas kumar'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'provide address for search'
        })
    }

    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            console.log(error)
            return res.send({error})
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                console.log(error)
                return res.send(error)
            }

            res.send({                
                forecastData: forecastData,
                location: location,
                address: address
            })
        })
    })

})


app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })        
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Vikas kumar',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        name: 'Vikas kumar',
        errorMessage: '404 : PAGE NOT FOUND'
    })
})
app.listen(3000, () => {
    console.log('server is running')
})