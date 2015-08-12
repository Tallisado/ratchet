'use strict';

// Vms controller
angular.module('vms').controller('VmsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Vms',
	function($scope, $stateParams, $location, Authentication, Vms) {
		$scope.authentication = Authentication;

		// Create new Vm
		$scope.create = function() {
			// Create new Vm object
			var vm = new Vms ({
				name: this.name
			});

			// Redirect after save
			vm.$save(function(response) {
				$location.path('vms/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Vm
		$scope.remove = function(vm) {
			if ( vm ) { 
				vm.$remove();

				for (var i in $scope.vms) {
					if ($scope.vms [i] === vm) {
						$scope.vms.splice(i, 1);
					}
				}
			} else {
				$scope.vm.$remove(function() {
					$location.path('vms');
				});
			}
		};

		// Update existing Vm
		$scope.update = function() {
			var vm = $scope.vm;

			vm.$update(function() {
				$location.path('vms/' + vm._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Vms
		$scope.find = function() {
			$scope.vms = Vms.query();
		};

		// Find existing Vm
		$scope.findOne = function() {
			$scope.vm = Vms.get({ 
				vmId: $stateParams.vmId
			});
		};
	}
]);