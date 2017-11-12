'use strict';

//importing the required modules/packages
var blogsModel = require('../models/blogsModel.js');

//declaring a module
var exports = module.exports = {};

//definitions of all the route handlers

exports.getAllBlogs = function (req, res){
	blogsModel.find({}, function(err, blogs){
		if (err) {
			console.log(err);
			var response = { data: null, status: 500, error: true, message: 'Failed to fetch blogs details'};
			res.send(response);
		}
		else if (blogs.length == 0) {
			console.log('No blogs found in db');
			var response = { data: blogs, status: 404, error: true, message: 'No blogs found in db'};
			res.send(response);
		}
		else {
			console.log('Fetching blogs successfull');
			var response = { data: blogs, status: 200, error: false, message: 'Fetching blogs successfull'};
			res.send(response);
		}
	});
}// end getBlogs()

exports.createBlog = function (req, res){

	var newBlog = new blogsModel({
		title: req.body.title,
		subTitle: req.body.subTitle,
		body: req.body.body,
		author: req.body.author
	});

	if (!newBlog.title || !newBlog.body || !newBlog.author) {
		console.log('Syntax invalid in the request');
		var response = { data: null, status: 403, error: true, message: 'Syntax invalid in the request'};
		res.send(response);
	}
	else {
		newBlog.save(function(err, blog){
			if (err) {
				console.log(err);
				var response = { data: null, status: 500, error: true, message: 'Failed to create a blog'};
				res.send(response);
			}
			else {
				console.log('Blog creation successfull');
				var response = { data: blog, status: 201, error: false, message: 'Blog creation successfull'};
				res.send(response);
			}
		});
	}
}

exports.loadBlog = function (req, res){
		blogsModel.findOne({'_id': req.params.id}, function(err, blog){
			if (err) {
				console.log(err);
				var response = { data: null, status: 500, error: true, message: 'Failed to fetch the blog'};
				res.send(response);
			}
			else if (!blog) {
				console.log('Requested blog not found in db');
				var response = { data: null, status: 404, error: true, message: 'Requested blog not found in db'};
				res.send(response);
			}
			else {
				console.log('Fetched the blog successfully');
				var response = { data: blog, status: 200, error: false, message: 'Fetched the blog successfully'};
				res.send(response);
			}
		});
}

exports.updateBlog = function (req, res){
		var updates = req.body;
		updates.lastModified = new Date();
		if (!updates.title || !updates.body || !updates.author) {
			console.log('Syntax invalid in the request');
			var response = { data: null, status: 403, error: true, message: 'Syntax invalid in the request'};
			res.send(response);
		}
		else {
			blogsModel.findOneAndUpdate({'_id': req.params.id}, updates, { new: true }, function(err, blog){
				if (err) {
					console.log(err);
					var response = { data: null, status: 500, error: true, message: 'Failed to edit the blog'};
					res.send(response);
				}
				else if (!blog) {
					console.log('Requested blog not found in db');
					var response = { data: null, status: 404, error: true, message: 'Requested blog not found in db'};
					res.send(response);
				}
				else {
					console.log('Updated the blog successfully');
					var response = { data: blog, status: 200, error: false, message: 'Updated the blog successfully'};
					res.send(response);
				}
			});
		}
}

exports.deleteBlog = function (req, res){
		blogsModel.remove({'_id': req.params.id}, function(err, blog){
			if (err) {
				console.log(err);
				var response = { data: null, status: 500, error: true, message: 'Failed to delete the blog'};
				res.send(response);
			}
			else if (!blog) {
				console.log('Requested blog not found in db');
				var response = { data: null, status: 404, error: true, message: 'Requested blog not found in db'};
				res.send(response);
			}
			else {
				console.log('Deleted the blog successfully');
				var response = { data: blog, status: 200, error: false, message: 'Deleted the blog successfully'};
				res.send(response);
			}
		});
}