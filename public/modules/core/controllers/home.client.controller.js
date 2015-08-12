'use strict';


angular.module('core').controller('HomeController', ['$scope', '$stateParams', '$location', 'Authentication', 'Vms',
	function($scope, $stateParams, $location, Authentication, Vms) {
		// This provides Authentication context.
		$scope.authentication = Authentication;


				// Find a list of Groups
		$scope.findVms = function() {
			$scope.vms = Vms.query();
		};

	}
]);
