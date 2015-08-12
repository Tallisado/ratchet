'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var vms = require('../../app/controllers/vms.server.controller');

	// Vms Routes
	app.route('/vms')
		.get(vms.list)
		.post(users.requiresLogin, vms.create);

	app.route('/vms/:vmId')
		.get(vms.read)
		.put(users.requiresLogin, vms.hasAuthorization, vms.update)
		.delete(users.requiresLogin, vms.hasAuthorization, vms.delete);

	// Finish by binding the Vm middleware
	app.param('vmId', vms.vmByID);
};
