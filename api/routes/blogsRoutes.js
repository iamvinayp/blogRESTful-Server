'use strict';

var express = require('express');
var router = express.Router();

var blogsController = require('../controllers/blogsController.js');

//defining/mounting all the route handlers on the router instance

//get the list of blogs from the db
router.get('/blogs', blogsController.getAllBlogs);
//create a blog
router.post('/blogs', blogsController.createBlog);
//load a particular blog
router.get('/blogs/:id', blogsController.loadBlog);
//update a blog
router.put('/blogs/:id', blogsController.updateBlog);
//delete a blog
router.delete('/blogs/:id', blogsController.deleteBlog);

module.exports = router;