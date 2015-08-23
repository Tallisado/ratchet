'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Build Schema
 */
var BuildSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Build name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	version: {
		type: String,
		default: '0.0'
	},
	project_branches: {
			type: Schema.Types.Mixed
	},
	tc_artifacts : {
		type: [Schema.Types.Mixed]
	},
	tc_info: {
		type: [Schema.Types.Mixed]
	},
	vm_status : {
		type: [Boolean]
	},
	vm_info : {
		type: [Schema.Types.Mixed]
	},
	devnotes: {
		type: [String]
	},
	testernotes: {
		type: [String]
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Build', BuildSchema);
