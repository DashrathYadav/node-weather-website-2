const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { query } = require('express')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Dashraht Yadav'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Dashrath Yadav'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Dashraht Yadav'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            err: "Please provide a city name"
        });
    }
    geocode(req.query.location, (err, data) => {
        if (err) {
            return res.send({err})
        }
        forcast(data.lat,data.lon,(err,data)=>{
            if(err){
                return res.send({err});
            }
            return res.send(data)
        })

    })

})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dashrath Yadav',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})