'use strict';

//Vms service used to communicate Vms REST endpoints
angular.module('vms').factory('Vms', ['$resource',
	function($resource) {
		return $resource('vms/:vmId', { vmId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);