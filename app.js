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

//parse application/json
app.use(bodyParser.json({limit:'10mb',extended:true}));

//parse as application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

//loading other required modules
var dbConnection = require('./api/config/dbConnection.js')
var blogsRoutes = require('./api/routes/blogsRoutes.js');

//initialize routes
app.use('/api', blogsRoutes);

//middleware - redirect and respond for wrong routes
app.use('*', function(req, res){
    res.status(404).send({url: req.originalUrl + ' not found'});
});

//listening on defined port no
app.listen(port, function(){
    console.log("blogs RESTful API server listening on port: " + port);
});