//Dependencies========================================================
var express = require("express");
var bodyParser = require("body-parser");
//var path = require('path');
var app = express();

// Sets initial port. 
var PORT = process.env.PORT || 8080;

// handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//allows public folder to serve static files
app.use(express.static('/app/public'));

//ROUTES=============================================================
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);



app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
  
});