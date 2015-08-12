'use strict';

(function() {
	// Vms Controller Spec
	describe('Vms Controller Tests', function() {
		// Initialize global variables
		var VmsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Vms controller.
			VmsController = $controller('VmsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Vm object fetched from XHR', inject(function(Vms) {
			// Create sample Vm using the Vms service
			var sampleVm = new Vms({
				name: 'New Vm'
			});

			// Create a sample Vms array that includes the new Vm
			var sampleVms = [sampleVm];

			// Set GET response
			$httpBackend.expectGET('vms').respond(sampleVms);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.vms).toEqualData(sampleVms);
		}));

		it('$scope.findOne() should create an array with one Vm object fetched from XHR using a vmId URL parameter', inject(function(Vms) {
			// Define a sample Vm object
			var sampleVm = new Vms({
				name: 'New Vm'
			});

			// Set the URL parameter
			$stateParams.vmId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/vms\/([0-9a-fA-F]{24})$/).respond(sampleVm);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.vm).toEqualData(sampleVm);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Vms) {
			// Create a sample Vm object
			var sampleVmPostData = new Vms({
				name: 'New Vm'
			});

			// Create a sample Vm response
			var sampleVmResponse = new Vms({
				_id: '525cf20451979dea2c000001',
				name: 'New Vm'
			});

			// Fixture mock form input values
			scope.name = 'New Vm';

			// Set POST response
			$httpBackend.expectPOST('vms', sampleVmPostData).respond(sampleVmResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Vm was created
			expect($location.path()).toBe('/vms/' + sampleVmResponse._id);
		}));

		it('$scope.update() should update a valid Vm', inject(function(Vms) {
			// Define a sample Vm put data
			var sampleVmPutData = new Vms({
				_id: '525cf20451979dea2c000001',
				name: 'New Vm'
			});

			// Mock Vm in scope
			scope.vm = sampleVmPutData;

			// Set PUT response
			$httpBackend.expectPUT(/vms\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/vms/' + sampleVmPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid vmId and remove the Vm from the scope', inject(function(Vms) {
			// Create new Vm object
			var sampleVm = new Vms({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Vms array and include the Vm
			scope.vms = [sampleVm];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/vms\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleVm);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.vms.length).toBe(0);
		}));
	});
}());