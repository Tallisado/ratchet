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
	data_connector: {
		type: String,
		default: 'develop'
	},
	data_formula: {
		type: String,
		default: 'develop'
	},
	saas_webui: {
		type: String,
		default: 'develop'
	},
	saas_refresh: {
		type: String,
		default: 'develop'
	},
	saas_data_provider: {
		type: String,
		default: 'develop'
	},
	artifacts : {
		type: [Schema.Types.Mixed]
	},
	containerdata: {
		type: [String]
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
