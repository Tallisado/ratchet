'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Vm = mongoose.model('Vm'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, vm;

/**
 * Vm routes tests
 */
describe('Vm CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Vm
		user.save(function() {
			vm = {
				name: 'Vm Name'
			};

			done();
		});
	});

	it('should be able to save Vm instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Vm
				agent.post('/vms')
					.send(vm)
					.expect(200)
					.end(function(vmSaveErr, vmSaveRes) {
						// Handle Vm save error
						if (vmSaveErr) done(vmSaveErr);

						// Get a list of Vms
						agent.get('/vms')
							.end(function(vmsGetErr, vmsGetRes) {
								// Handle Vm save error
								if (vmsGetErr) done(vmsGetErr);

								// Get Vms list
								var vms = vmsGetRes.body;

								// Set assertions
								(vms[0].user._id).should.equal(userId);
								(vms[0].name).should.match('Vm Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Vm instance if not logged in', function(done) {
		agent.post('/vms')
			.send(vm)
			.expect(401)
			.end(function(vmSaveErr, vmSaveRes) {
				// Call the assertion callback
				done(vmSaveErr);
			});
	});

	it('should not be able to save Vm instance if no name is provided', function(done) {
		// Invalidate name field
		vm.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Vm
				agent.post('/vms')
					.send(vm)
					.expect(400)
					.end(function(vmSaveErr, vmSaveRes) {
						// Set message assertion
						(vmSaveRes.body.message).should.match('Please fill Vm name');
						
						// Handle Vm save error
						done(vmSaveErr);
					});
			});
	});

	it('should be able to update Vm instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Vm
				agent.post('/vms')
					.send(vm)
					.expect(200)
					.end(function(vmSaveErr, vmSaveRes) {
						// Handle Vm save error
						if (vmSaveErr) done(vmSaveErr);

						// Update Vm name
						vm.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Vm
						agent.put('/vms/' + vmSaveRes.body._id)
							.send(vm)
							.expect(200)
							.end(function(vmUpdateErr, vmUpdateRes) {
								// Handle Vm update error
								if (vmUpdateErr) done(vmUpdateErr);

								// Set assertions
								(vmUpdateRes.body._id).should.equal(vmSaveRes.body._id);
								(vmUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Vms if not signed in', function(done) {
		// Create new Vm model instance
		var vmObj = new Vm(vm);

		// Save the Vm
		vmObj.save(function() {
			// Request Vms
			request(app).get('/vms')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Vm if not signed in', function(done) {
		// Create new Vm model instance
		var vmObj = new Vm(vm);

		// Save the Vm
		vmObj.save(function() {
			request(app).get('/vms/' + vmObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', vm.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Vm instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Vm
				agent.post('/vms')
					.send(vm)
					.expect(200)
					.end(function(vmSaveErr, vmSaveRes) {
						// Handle Vm save error
						if (vmSaveErr) done(vmSaveErr);

						// Delete existing Vm
						agent.delete('/vms/' + vmSaveRes.body._id)
							.send(vm)
							.expect(200)
							.end(function(vmDeleteErr, vmDeleteRes) {
								// Handle Vm error error
								if (vmDeleteErr) done(vmDeleteErr);

								// Set assertions
								(vmDeleteRes.body._id).should.equal(vmSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Vm instance if not signed in', function(done) {
		// Set Vm user 
		vm.user = user;

		// Create new Vm model instance
		var vmObj = new Vm(vm);

		// Save the Vm
		vmObj.save(function() {
			// Try deleting Vm
			request(app).delete('/vms/' + vmObj._id)
			.expect(401)
			.end(function(vmDeleteErr, vmDeleteRes) {
				// Set message assertion
				(vmDeleteRes.body.message).should.match('User is not logged in');

				// Handle Vm error error
				done(vmDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Vm.remove().exec();
		done();
	});
});