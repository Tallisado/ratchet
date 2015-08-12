'use strict';

// Configuring the Articles module
angular.module('builds').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Builds', 'builds', 'dropdown', '/builds(/create)?');
		Menus.addSubMenuItem('topbar', 'builds', 'List Builds', 'builds');
		Menus.addSubMenuItem('topbar', 'builds', 'New Build', 'builds/create');
	}
]);