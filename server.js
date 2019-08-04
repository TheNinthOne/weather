const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '7d0326c823085ee71f5249d462f23b5b';

app.use(express.static('public')); //accessing the css file
app.use(bodyParser.urlencoded({ extended: true })); ////idk y but i need this to use the req.body object
app.set('view engine', 'ejs')

app.get('/', function (req, res) { //first callback
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {  //second callback
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
     //third callback
    if(err)
    {
      res.render('index', {weather: null, error: 'Error, please try again'});
    }
    else
    {
      let weather = JSON.parse(body)
      if(weather.main == undefined)
      {
        res.render('index', {weather: null, error: 'Error, please try again'});
      }
      else
      {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  }); //end
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})