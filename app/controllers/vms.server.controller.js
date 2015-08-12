'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Vm = mongoose.model('Vm'),
	_ = require('lodash');

/**
 * Create a Vm
 */
exports.create = function(req, res) {
	var vm = new Vm(req.body);
	vm.user = req.user;

	vm.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vm);
		}
	});
};

/**
 * Show the current Vm
 */
exports.read = function(req, res) {
	res.jsonp(req.vm);
};

/**
 * Update a Vm
 */
exports.update = function(req, res) {
	var vm = req.vm ;

	vm = _.extend(vm , req.body);

	vm.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vm);
		}
	});
};

/**
 * Delete an Vm
 */
exports.delete = function(req, res) {
	var vm = req.vm ;

	vm.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vm);
		}
	});
};

/**
 * List of Vms
 */
exports.list = function(req, res) { 
	Vm.find().sort('-created').populate('user', 'displayName').exec(function(err, vms) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vms);
		}
	});
};

/**
 * Vm middleware
 */
exports.vmByID = function(req, res, next, id) { 
	Vm.findById(id).populate('user', 'displayName').exec(function(err, vm) {
		if (err) return next(err);
		if (! vm) return next(new Error('Failed to load Vm ' + id));
		req.vm = vm ;
		next();
	});
};

/**
 * Vm authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.vm.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
