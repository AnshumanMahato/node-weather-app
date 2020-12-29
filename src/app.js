//jshint esversion:6
const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const express = require('express');
const hbs = require('hbs');

//Paths

const publicDirectory = path.join(__dirname,'../public');
const viewsDirectory = path.join(__dirname,'../templates/views');
const partialsDirectory = path.join(__dirname,'../templates/partials');

const app = express();
const port = process.env.PORT || 3000;

// Views and hbs setup
app.set('view engine','hbs');
app.set('views', viewsDirectory);
hbs.registerPartials(partialsDirectory);

// Express Public Directory
app.use(express.static(publicDirectory));

//Routes

app.get('',(req,res) => {
    res.render('index', {
       title : 'Weather',
       name: 'Anshuman Mahato' 
    });
});

app.get('/about',(req,res) => {
    res.render('about', {
       title : 'About',
       name: 'Anshuman Mahato' 
    });
});

app.get('/help',(req,res) => {
    res.render('help', {
       title : 'Help',
       name: 'Anshuman Mahato' 
    });
});

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'No search query found.'
        });
    }

    geocode(req.query.address,(error,{longitude,latitude,location} = {}) => {
        if(error){
            return res.send({error});
        }

        forecast(longitude,latitude,(error,forecastData) => {
            if(error){
                return res.send({error});
            }

            res.send({
                address: req.query.address,
                forecast: forecastData,
                location
            });

        });
            
    });
});

//404 routes

app.get('/help/*',(req,res) => {
    res.render('404', {
        title : "404",
        text : "Help Not Found",
        name : "Anshuman Mahato"
    });
});

app.get('*',(req,res) => {
    res.render('404', {
        title : "404",
        text : "Page Not Found",
        name : "Anshuman Mahato" 
    });
});

app.listen(port, () => {
    console.log("Server is running at " + port);
});