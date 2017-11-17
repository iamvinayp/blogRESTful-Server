'use strict';

//initialising the port no
var port = process.env.PORT || 3000;

//loading mongoose module
var mongoose = require('mongoose');

//configuring the database
//defining database path
var dbPath = "mongodb://localhost/myblogapp";

//connecting to database
var db = mongoose.connect(dbPath, { useMongoClient: true });

mongoose.connection.once('open', function(){
    console.log("Database connection established !!");
});