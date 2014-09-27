'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Vote Schema
 */
var VoteSchema = new Schema({
	answer: {
		type: Schema.ObjectId,
		ref: 'Answer'
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Vote', VoteSchema);
