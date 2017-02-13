// Includes Node's built-in path module,Express,Zippity-do-ah, and ForecastIO

var path = require("path");
var express = require("express");
var zipdb = require("zippity-do-dah");
//var Forecast = require('forecast.io');
var DarkSky = require("dark-sky");
var forecast = new DarkSky("a0ff92480a56c23f6a8ab208161ad33d");
// creates an Express application
var app = express();

//Creates an ForecastIO object with your API key
//var weather = new ForecastIO("a0ff92480a56c23f6a8ab208161ad33d");

// Serves static files out of public
app.use(express.static(path.resolve(__dirname,"public")));

//use EJS as the view engine, and serves the views out of a views folder
app.set("views", path.resolve(__dirname,"views"));
app.set("view engine" ,"ejs");

//Renders the index view if you hit the homepage
app.get("/", function(req, res){
    res.render("index");
});

// Captures the specified ZIP code and passes it as req.params[0]
app.get(/^\/(\d{5})$/, function(req, res, next){
    var zipcode = req.params[0];
// Grabs the location data with the ZIP code    
    var location = zipdb.zipcode(zipcode);
    
// Return {} when no results are found.Continues if the object isn't empty.    
    if(!location.zipcode) {
        next();
        return;
    }
    var latitude = location.latitude;
    var longitude = location.longitude;
    
    weather.forecast(latitude, longitude, function(err,data){
        if(err) {
          next();
          return;
        }
// Sends this JSON object with Express's Json method
        res.json({
            zipcode: zipcode,
            temperature: data.currently.temperaure
        });
    });
});
   
//Shows a 404 error if no other routes are matched
app.use(function(req,res) {
    res.status(404).render("404");
});

// Start the app on port 3000
app.listen(3000);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
