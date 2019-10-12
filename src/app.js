const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geoLocation = require('./utills/geolocation')
const forecast = require('./utills/forecast')
const port = process.env.PORT || 3000
//define paths for express config
const publicPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPaths = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPaths)

//setup status directory to serve
app.use(express.static(publicPath))

app.get('',(req,res) => { 
    res.render('index',{ 
        title: 'Weather App', 
        name: 'Ranu Jain' })
})
app.get('/about',(req,res) => { 
    res.render('about',{ 
        title: 'About Cake', 
        name: 'Ranu Jain' })
})
app.get('/help',(req,res) => { 
    res.render('help',{ 
        title: 'Help', 
        name: 'Ranu Jain' })
})
app.get('/weather', (req, res) =>{ 
    let response 
    if(!req.query.address){ 
        return res.send({ 
            'error': 'You must provide an address' 
        }) 
    } 
    geoLocation(req.query.address,({latitude,longitude,place}, error) =>{
        if(error){ 
            return res.send({ 
                'error': error 
            }) 
        } 
        forecast(latitude,longitude, (response, error)=>{ 
            if(error){ 
                return res.send({ 
                    'error': error 
                }) 
            } 
            res.send({ 
                'forecast': response, 
                'location': place, 
                'address': req.query.address 
            }) 
        }) 
    })
})
app.get('/products',(req, res) =>{ 
    if (!req.query.search){ 
        return res.send({ 'error': 'You must provide search term' }) 
    } res.send({ "products": [] })
})
app.get('/help/*',(req, res) =>{ 
    res.render('404',{ 
        title:'404', 
        error:'Help article not found', 
        name: 'Ranu Jain' 
    })
})
app.get('*',(req, res) =>{ 
    res.render('404',{ 
        title:'404', 
        error:'Page not found', 
        name: 'Ranu Jain' 
    })
})

app.listen (port, () =>{ 
    console.log(`server is up on ${port} 3000`)
})