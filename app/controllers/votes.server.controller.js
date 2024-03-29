'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Vote = mongoose.model('Vote'),
	_ = require('lodash');

/**
 * Create a Vote
 */
exports.create = function(req, res) {
	var vote = new Vote(req.body);
	vote.user = req.user;

	vote.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vote);
		}
	});
};

/**
 * Show the current Vote
 */
exports.read = function(req, res) {
	res.jsonp(req.vote);
};

/**
 * Update a Vote
 */
exports.update = function(req, res) {
	var vote = req.vote ;

	vote = _.extend(vote , req.body);

	vote.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vote);
		}
	});
};

/**
 * Delete an Vote
 */
exports.delete = function(req, res) {
	var vote = req.vote ;

	vote.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vote);
		}
	});
};

/**
 * List of Votes
 */
exports.list = function(req, res) { Vote.find().sort('-created').populate('user', 'displayName').exec(function(err, votes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(votes);
		}
	});
};

exports.forAnswer = function(req, res) {
	Vote.find({ answer: req.answer }).sort('-created').populate('user', 'username').exec(function(err, votes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(votes);
		}
	});
};

/**
 * Vote middleware
 */
exports.voteByID = function(req, res, next, id) { Vote.findById(id).populate('user', 'displayName').exec(function(err, vote) {
		if (err) return next(err);
		if (! vote) return next(new Error('Failed to load Vote ' + id));
		req.vote = vote ;
		next();
	});
};

/**
 * Vote authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.vote.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
