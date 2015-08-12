'use strict';

//Setting up route
angular.module('vms').config(['$stateProvider',
	function($stateProvider) {
		// Vms state routing
		$stateProvider.
		state('listVms', {
			url: '/vms',
			templateUrl: 'modules/vms/views/list-vms.client.view.html'
		}).
		state('createVm', {
			url: '/vms/create',
			templateUrl: 'modules/vms/views/create-vm.client.view.html'
		}).
		state('viewVm', {
			url: '/vms/:vmId',
			templateUrl: 'modules/vms/views/view-vm.client.view.html'
		}).
		state('editVm', {
			url: '/vms/:vmId/edit',
			templateUrl: 'modules/vms/views/edit-vm.client.view.html'
		});
	}
]);