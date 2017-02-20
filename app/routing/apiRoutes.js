// Your apiRoutes.js file should contain two routes:
//
// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
var path = require('path');
var friendsList = require("../data/friends.js");

// var userResultArray = [];
// var totalDifference;

// Compare array of newUser with all users in friendsList array
// console.log(JSON.stringify(absoluteDifference));

// Take absoluteDifference of the two arrays, let score = sum of absoluteDifference

// highestScore = higest value of score

// The modal should display both the name and picture of the closest match.


// Finds the new user's match
function findNewBff(friendsArray) {
  var diffArray = [];
  var matches = [];

  // Loops through friendsList data
  for(var i = 0; i < friendsList.length; i++) {

    var comparisonArray = friendsList[i].scores;

    // Sum of the absolute difference of the array
    var sumOfAbsDiff = comparisonArray.reduce(function(acc, elem, index) {
      return acc + Math.abs(elem - friendsArray[index]);
    },0);
    console.log(comparisonArray);
    //push differences and sum value to diffArray
    diffArray.push(sumOfAbsDiff);
  }

  // Then loop through the new diffArray and look for the lowest number to find the match
  var arrayIndex = 0;
  var value = diffArray[0];
  for (var p = 1; p < diffArray.length - 1; p++) {
    if (diffArray[p] < value) {
      value = diffArray[p];
      arrayIndex = p;
    }
  }

  // Push the new BFF to the matches array
  matches.push(friendsList[arrayIndex]);

  console.log(matches);

  return matches;
  }
// Routes
// =============================================================
module.exports = function(app) {

  // A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
  app.get("/api/friends", function(req, res){
    res.json(friendsList);
  });

  app.get("/survey", function(req, res){
    res.send(userData);
  });

  // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
  app.post("/api/friends", function(req, res){

    var data = req.body;
    //find friend matches for user
    var matches = findNewBff(data.scores);

    friendsList.push(data);

    console.log(req.body);
    console.log(req.body.scores);
    //add user's info to database (push into array of objects)
    friendsList.push(data);
    //send back to front-end the array of matches
    res.send(matches);

  });
};
