'use strict';

// Configuring the Articles module
angular.module('vms').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Vms', 'vms', 'dropdown', '/vms(/create)?');
		Menus.addSubMenuItem('topbar', 'vms', 'List Vms', 'vms');
		Menus.addSubMenuItem('topbar', 'vms', 'New Vm', 'vms/create');
	}
]);