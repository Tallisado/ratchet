'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Vm Schema
 */
var VmSchema = new Schema({
	name: {
		type: String,
		default: 'VM Name',
		trim: true
	},
	locked: {
		type: Boolean,
		default: false
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

mongoose.model('Vm', VmSchema);
