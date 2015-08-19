'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Build = mongoose.model('Build'),
	_ = require('lodash');

	var Q = require("q");
	var gitlab = require('gitlab')({
	  url:   'http://nest.klipfolio.com',
	  token: 'AEJsvP37_SzPzUypfaz4'
	});







  var builddata;
	var projectList = [];
	var branchList = [];
	var branchLookup = [];
	var i = 0;

	var callback = function(project_name, d, branches) {7
	  //console.log('single branch listing ' +project_name + branches);
	  var branch_names = [];
	  for (var j = 0; j < branches.length; j++) {
	    branch_names.push(branches[j].name);
	  }
	  branchLookup.push({branch:project_name, names: branch_names});
	  if (branchLookup.length == projectList.length) {d.resolve(); console.log('last one')}
	}


	function getBranchData() {
		var deferred1 = Q.defer();
		console.log('start branch');
		for (i = 0; i < projectList.length; i++) {
			gitlab.projects.repository.listBranches(projectList[i].id, callback.bind(this, projectList[i].name, deferred1))
		}
		return deferred1.promise;
	}

	function getProjects() {
		var deferred = Q.defer();
		console.log('start getProjects');

		gitlab.projects.all(function(projects) {
				projectList = projects;
				console.log('getProjects');
				deferred.resolve();

				//console.log(projects);
		});
		return deferred.promise;
	};
	//
	// function fillData(res, builds) {
	// 	var deferred3 = Q.defer();
	// 	console.log('fill data')
	// 	//console.log(branchLookup);
	// 	var builddata = [{builds:builds},{gitdata:branchLookup}];
	// 	res.jsonp(builddata);
	// 	return deferred3.promise;
	// }


/**
 * Create a Build
 */
exports.create = function(req, res) {
	var build = new Build(req.body);
	build.user = req.user;

	build.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(build);
		}
	});
};

/**
 * Show the current Build
 */
exports.read = function(req, res) {
	res.jsonp(req.build);
};

/**
 * Update a Build
 */
exports.update = function(req, res) {
	var build = req.build ;

	build = _.extend(build , req.body);

	build.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(build);
		}
	});
};

/**
 * Delete an Build
 */
exports.delete = function(req, res) {
	var build = req.build ;

	build.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(build);
		}
	});
};


/**
 * List of Builds
 */
exports.list = function(req, res) {
	Build.find().sort('-created').populate('user', 'displayName').exec(function(err, builds) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			projectList = [];
			branchList = [];
			branchLookup = [];
			i = 0;


			var testme = function() {
				var builddata = {builds:builds,gitdata:branchLookup};
				res.jsonp(builds);
			}

			var get_branches = [getProjects, getBranchData, testme]
			// run the rpc commands
			return get_branches.reduce(function (soFar, f) {
			    return soFar.then(f);
			}, Q()).done();
		}
	});
};

exports.details = function(req, res) {
	console.log('DEETS');
	Build.find().sort('-created').populate('user', 'displayName').exec(function(err, builds) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			projectList = [];
			branchList = [];
			branchLookup = [];
			i = 0;


			var testme = function() {
				var builddata = {builds:builds,gitdata:branchLookup};
				res.jsonp(builddata);
			}

			var get_branches = [getProjects, getBranchData, testme]
			// run the rpc commands
			return get_branches.reduce(function (soFar, f) {
			    return soFar.then(f);
			}, Q()).done();
		}
	});
};

/**
 * Build middleware
 */
exports.buildByID = function(req, res, next, id) {
	Build.findById(id).populate('user', 'displayName').exec(function(err, build) {
		if (err) return next(err);
		if (! build) return next(new Error('Failed to load Build ' + id));
		req.build = build ;
		next();
	});
};

/**
 * Build authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.build.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
