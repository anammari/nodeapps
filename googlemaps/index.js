var express = require("express");
var app = express();
var geohash = require("geohash").GeoHash;
 
// route routing is very easy with express, this will handle the request for root directory contents.
// :id is used here to pattern match with the first value after the forward slash.
app.get("/:id",function (req,res)
    {
        //decode the geohash with geohash module
        //var latlon = geohash.decodeGeoHash(req.params["id"]);
        //console.log("latlon : " + latlon);
        var lat = 52.482755;
        console.log("lat : " + lat);
        var lon = -1.893621;
        console.log("lon : " + lon);
        zoom = req.params["id"].length + 2;
        console.log("zoom : " + zoom);
        // now we use the templating capabilities of express and call our template to render the view, and pass a few parameters to it
        res.render("index.ejs", { layout: false, lat:lat, lon:lon, zoom:zoom, geohash:req.params["id"]});
    });
 
app.listen(9999);