'use strict';

//importing the required modules/packages
var blogsModel = require('../models/blogsModel.js');
var responseLib = require('../libs/responseLib.js');

//declaring a module
var exports = module.exports = {};

//definitions of all the route handlers

exports.getAllBlogs = function (req, res, next){
	blogsModel.find({}, function(err, blogs){
		if (err) {
			next(err);
			// console.log(err);
			// var response = responseLib.responseGenerate(null, 500, true, 'Failed to fetch blogs details');
			// // var response = { data: null, status: 500, error: true, message: 'Failed to fetch blogs details'};
			// res.status(500).send(response);
		}
		else if (blogs.length == 0) {
			console.log('No blogs found in db');
			var response = responseLib.responseGenerate(blogs, 404, true, 'No blogs found in db');
			// var response = { data: blogs, status: 404, error: true, message: 'No blogs found in db'};
			res.status(404).send(response);
		}
		else {
			console.log('Fetching blogs successfull');
			var response = responseLib.responseGenerate(blogs, 200, false, 'Fetching blogs successfull');
			// var response = { data: blogs, status: 200, error: false, message: 'Fetching blogs successfull'};
			res.send(response);
		}
	});
}// end getBlogs()

exports.createBlog = function (req, res, next){

	var newBlog = new blogsModel({
		title: req.body.title,
		subTitle: req.body.subTitle,
		body: req.body.body,
		author: req.body.author
	});

	if (!newBlog.title || !newBlog.body || !newBlog.author) {
		console.log('Syntax invalid in the request');
		var response = responseLib.responseGenerate(null, 400, true, 'Syntax invalid in the request');
		// var response = { data: null, status: 403, error: true, message: 'Syntax invalid in the request'};
		res.status(400).send(response);
	}
	else {
		newBlog.save(function(err, blog){
			if (err) {
				next(err);
				// console.log(err);
				// var response = responseLib.responseGenerate(null, 500, true, 'Failed to create a blog');
				// // var response = { data: null, status: 500, error: true, message: 'Failed to create a blog'};
				// res.status(500).send(response);
			}
			else {
				console.log('Blog creation successfull');
				var response = responseLib.responseGenerate(blog, 201, false, 'Blog creation successfull');
				// var response = { data: blog, status: 201, error: false, message: 'Blog creation successfull'};
				res.send(response);
			}
		});
	}
}// end createBlog()

exports.loadBlog = function (req, res, next){
		blogsModel.findOne({'_id': req.params.id}, function(err, blog){
			if (err) {
				next(err);
				// console.log(err);
				// var response = responseLib.responseGenerate(null, 500, true, 'Failed to fetch the blog');
				// // var response = { data: null, status: 500, error: true, message: 'Failed to fetch the blog'};
				// res.status(500).send(response);
			}
			else if (!blog) {
				console.log('Requested blog not found in db');
				var response = responseLib.responseGenerate(null, 404, true, 'Requested blog not found in db');
				// var response = { data: null, status: 404, error: true, message: 'Requested blog not found in db'};
				res.status(404).send(response);
			}
			else {
				console.log('Fetched the blog successfully');
				var response = responseLib.responseGenerate(blog, 200, false, 'Fetched the blog successfully');
				// var response = { data: blog, status: 200, error: false, message: 'Fetched the blog successfully'};
				res.send(response);
			}
		});
}// end loadBlog()

exports.updateBlog = function (req, res, next){
		var updates = req.body;
		updates.lastModified = new Date();
		if (!updates.title || !updates.body || !updates.author) {
			console.log('Syntax invalid in the request');
			var response = responseLib.responseGenerate(null, 400, true, 'Syntax invalid in the request');
			// var response = { data: null, status: 403, error: true, message: 'Syntax invalid in the request'};
			res.status(400).send(response);
		}
		else {
			blogsModel.findOneAndUpdate({'_id': req.params.id}, updates, { new: true }, function(err, blog){
				if (err) {
					next(err);
					// console.log(err);
					// var response = responseLib.responseGenerate(null, 500, true, 'Failed to edit the blog');
					// // var response = { data: null, status: 500, error: true, message: 'Failed to edit the blog'};
					// res.status(500).send(response);
				}
				else if (!blog) {
					console.log('Requested blog not found in db');
					var response = responseLib.responseGenerate(null, 404, true, 'Requested blog not found in db');
					// var response = { data: null, status: 404, error: true, message: 'Requested blog not found in db'};
					res.status(404).send(response);
				}
				else {
					console.log('Updated the blog successfully');
					var response = responseLib.responseGenerate(blog, 200, false, 'Updated the blog successfully');
					// var response = { data: blog, status: 200, error: false, message: 'Updated the blog successfully'};
					res.send(response);
				}
			});
		}
}// end updateBlog()

exports.deleteBlog = function (req, res, next){
		blogsModel.remove({'_id': req.params.id}, function(err, blog){
			if (err) {
				next(err);
				// console.log(err);
				// var response = responseLib.responseGenerate(null, 500, true, 'Failed to delete the blog');
				// // var response = { data: null, status: 500, error: true, message: 'Failed to delete the blog'};
				// res.status(500).send(response);
			}
			else if (!blog) {
				console.log('Requested blog not found in db');
				var response = responseLib.responseGenerate(null, 404, true, 'Requested blog not found in db');
				// var response = { data: null, status: 404, error: true, message: 'Requested blog not found in db'};
				res.status(404).send(response);
			}
			else {
				console.log('Deleted the blog successfully');
				var response = responseLib.responseGenerate(blog, 200, false, 'Deleted the blog successfully');
				// var response = { data: blog, status: 200, error: false, message: 'Deleted the blog successfully'};
				res.send(response);
			}
		});
}// end deleteBlog()