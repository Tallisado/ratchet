'use strict';

//var clone = require('nodegit').Clone.clone;

// Builds controller
angular.module('builds').controller('BuildsController', ['$scope', '$resource', '$stateParams', '$location', 'Authentication', 'Builds', "Vms",
	function($scope, $resource, $stateParams, $location, Authentication, Builds, Vms) {
		$scope.authentication = Authentication;
		// // Clone a given repository into a specific folder.
		// clone('https://github.com/nodegit/nodegit', 'tmp', null)
		//   // Look up this known commit.
		//   .then(function(repo) {
		//     // Use a known commit sha from this repository.
		//     return repo.getCommit('59b20b8d5c6ff8d09518454d4dd8b7b30f095ab5');
		//   })

		$scope.project_branches = {
		};

		// Find a list of Builds
		$scope.getDefaultPeg = function(branch_name) {
				console.log('getDefaultPeg' + branch_name);
				for (var i=0; i<$scope.builds.pegs.length; i++) {
					//console.log($scope.builds.pegs[i]);
					if ($scope.builds.pegs[i].name === branch_name) {
						console.log(branch_name  + ' |pegged| ' + $scope.builds.pegs[i].pegged);
						return $scope.builds.pegs[i].pegged;
					}
				}
				return $scope.builds.pegs[i].pegged;
		};

		// Remove existing Build
		$scope.deploy = function(build) {
			console.log("DEPLOYING");
			console.log($scope.build);
			Vms.
		};

		// Create new Build
		$scope.create = function() {
			console.log('client create (with):' );
			//console.log($scope.BranchSelection['data_connector'].name);
			console.log($scope.project_branches['data-connector'].selected);
		//	console.log(this.project_branches.data_connector.selected);
			//console.log(this.name);
			// Create new Build object
			var build = new Builds ({
				name: this.name,
				version: this.version,
				devnotes: this.devnotes,
				created: this.created,
				project_branches: this.project_branches,
				tc_artifacts: this.tc_artifacts
			});

			this.devnotes = 'ADSASD';
			console.log('client create sending (obj):' );
			console.log(build);
			// Redirect after save
			build.$save(function(response) {
				console.log('after redirecting: ');
				console.log(build);
				$location.path('builds/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Build
		$scope.remove = function(build) {
			if ( build ) {
				build.$remove();

				for (var i in $scope.builds) {
					if ($scope.builds [i] === build) {
						$scope.builds.splice(i, 1);
					}
				}
			} else {
				$scope.build.$remove(function() {
					$location.path('builds');
				});
			}
		};

		// Update existing Build
		$scope.update = function() {
			var build = $scope.build;

			build.$update(function() {
				$location.path('builds/' + build._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Builds
		$scope.find = function() {
			console.log('find');
			$scope.builds = Builds.query();
		};

		// Find a list of Builds
		$scope.findGit = function() {
			console.log('findGit');
			//var build = new Builds()
			Builds.get(function(response) {
				console.log('GET');
				$scope.builds = response;
			});
		};

		// Find existing Build
		$scope.findOne = function() {
			$scope.build = Builds.get({
				buildId: $stateParams.buildId
			});
		};
	}
]);
