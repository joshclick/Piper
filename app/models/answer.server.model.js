'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Answer Schema
 */
var AnswerSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Answer name',
		trim: true
	},
	points: {
    type: Number,
    default: 0
  },
	created: {
		type: Date,
		default: Date.now
	},
	question: {
		type: Schema.ObjectId,
		ref: 'Question'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Answer', AnswerSchema);
