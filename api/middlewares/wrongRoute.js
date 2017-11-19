'use strict';

var exports = module.exports = {};

exports.checkRoute = function (req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'});
}