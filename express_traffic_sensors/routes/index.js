// routes/index.js
var express = require('express');
var app = express();

app.set('view engine', 'pug');

// Mongoose import
var mongoose = require('mongoose');

// Mongoose connection to MongoDB
mongoose.connect('mongodb://optimum.euprojects.net:3368/leaflet_map', function (error) {
    if (error) {
        console.log(error);
    }
});

// Mongoose Schema definition
var Schema = mongoose.Schema;
var JsonSchema = new Schema({
    highway: String,
    type: Schema.Types.Mixed
});
 
// Mongoose Model definition
var Json = mongoose.model('JString', JsonSchema, 'roads');
 
/* GET home page. */
app.get('/', function(req, res) {
  res.render('index', { title: 'Birmingham Network of Traffic Sensors' });
});

/* GET json data for  */
app.get('/mapjson/:highway', function (req, res) {
    if (req.params.highway) {
        highway = req.params.highway;
        Json.find({ highway: highway },{}, function (err, docs) {
            res.json(docs);
        });
    }
});

/* GET distinct highways json data. */
app.get('/maphighways', function (req, res) {
    Json.find().distinct('highway', function (err, docs) {
        res.json(docs);
    });
});

/* GET Map page and send the distinct highways and map coordinates */
app.get('/map', function(req,res) {
    var db = req.db;
    Json.find().distinct('highway', function(e,docs){
        res.render('map', {
            "jmap" : docs,
            lat : 52.482755,
            lng : -1.893621
        });
    });
});

 
module.exports = app;