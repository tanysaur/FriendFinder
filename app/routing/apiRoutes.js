// Your apiRoutes.js file should contain two routes:
//
// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
// var path = require('path');
var friendsList = require("../data/friends.js");

// Routes
// =============================================================
module.exports = function(app) {

  // A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
  app.get("/api/friends", function(req, res){
    res.json(friendsList);
  });

  // app.get("/survey", function(req, res){
  //   res.send(userData);
  // });

  // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
  app.post("/api/friends", function(req, res){

    // We will use this object to hold the "best match". We will constantly update it as we
    // loop through all of the options
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };


// Here we take the result of the user"s survey POST and parse it.
    var userData = req.body;
    var userScores = userData.scores;

    // This variable will calculate the difference between the user"s scores and the scores of
    // each user in the database
    var totalDifference = 0;

    // Here we loop through all the friend possibilities in the database.
    for (var i = 0; i < friendsList.length; i++) {

      console.log(friendsList[i].name);
      totalDifference = 0;

      // We then loop through all the scores of each friend
      for (var j = 0; j < friendsList[i].scores[j]; j++) {

        // We calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friendsList[i].scores[j]));

        // If the sum of differences is less then the differences of the current "best match"
        if (totalDifference <= bestMatch.friendDifference) {

          // Reset the bestMatch to be the new friend.
          bestMatch.name = friendsList[i].name;
          bestMatch.photo = friendsList[i].photo;
          bestMatch.friendDifference = totalDifference;
        }
      }
    }

    // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
    // the database will always return that the user is the user's best friend).
    friendsList.push(userData);

    // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
    res.json(bestMatch);

  });
};
