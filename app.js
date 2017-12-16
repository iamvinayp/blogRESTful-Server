'use strict';

//importing/loading the express module/package
var express = require('express');

//setup/creating an instance of the express application
var app = express();

//initialising the port no
var port = process.env.PORT || 3000;

//loading required middlewares
//body parsing middleware
var bodyParser = require('body-parser');
//error handler middleware
var errorHandler = require('./api/middlewares/errorHandler.js');
//wrong route redirection middleware
var blogsWrongRoute = require('./api/middlewares/wrongRoute.js');

//parse application/json
app.use(bodyParser.json({limit:'10mb',extended:true}));

//parse as application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

//loading other required modules
var dbConnection = require('./api/config/dbConnection.js');
var blogsRoutes = require('./api/routes/blogsRoutes.js');

//initialize routes
app.use('/api', blogsRoutes);

//register/initialise middleware for redirection of wrong routes
app.use('*', blogsWrongRoute.checkRoute);

//register/initialise error handling middleware
app.use(errorHandler.handleError);

//listening on defined port no
app.listen(port, function(){
    console.log("blogs RESTful API server listening on port: " + port);
});