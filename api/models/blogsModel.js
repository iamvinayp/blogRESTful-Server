'use strict';

//importing/loading the express module/package
var mongoose = require('mongoose');

//declaring schema object.
var Schema = mongoose.Schema;

//defining mongoose schemas

var BlogSchema = new Schema({
	title: {
		type: String,
		required: [true, 'Kindly provide the blog title']
	},
	subTitle: {
		type: String,
		default: ''
	},
	body: {
		type: String,
		required: [true, 'Kindly fill in the blog body']
	},
	created: {
		type: Date,
		default: Date.now
	},
	lastModified : {
		type: Date,
		default: Date.now
	},
	author: {
		type: String,
		required: [true, 'Kindly provide the author name']
	}
});


module.exports = mongoose.model('Blogs',BlogSchema);