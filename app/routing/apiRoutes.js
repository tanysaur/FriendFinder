// Your apiRoutes.js file should contain two routes:
//
// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

var path = require("path");
var express = require("express");
var app = express();

// Routes
// =============================================================
module.exports = function(app) {

  // A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
  app.get("/api/friends", function(req, res){
    res.json(res);
    console.log("Displaying friends list" + res.json());
  });

  // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
  app.post("/api/friends", function(req, res){
    res.sendFile(path.join(__dirname + "../public/home.html"));
  });


};
