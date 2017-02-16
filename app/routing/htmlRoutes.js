// Your htmlRoutes.js file should include two routes:
//
// A GET Route to /survey which should display the survey page.
// A default USE route that leads to home.html which displays the home page.
// Routes
// =============================================================

var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.
  app.get("/", function(req, res){
    console.log('This is / (home)')
    res.sendFile(path.join(__dirname + "/../public/home.html"));
  })
  // index route loads survey.html
  app.get("/survey", function(req, res) {
    console.log('This is SURVEY')
    res.sendFile(path.join(__dirname + "/../public/survey.html"));
  });


  // app.use(function(req, res) {
  //   res.sendFile(path.join(__dirname, "/../public/home.html"));
  // });
};
