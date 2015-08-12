'use strict';

//var clone = require("nodegit").Clone.clone;

// Builds controller
angular.module('builds').controller('BuildsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Builds',
	function($scope, $stateParams, $location, Authentication, Builds) {
		$scope.authentication = Authentication;

		// // Clone a given repository into a specific folder.
		// clone("https://github.com/nodegit/nodegit", "tmp", null)
		//   // Look up this known commit.
		//   .then(function(repo) {
		//     // Use a known commit sha from this repository.
		//     return repo.getCommit("59b20b8d5c6ff8d09518454d4dd8b7b30f095ab5");
		//   })

		$scope.git_branches = ['Branch_0123123A', 'LatestDevelop', 'LatestMaster', 'AA'];

		$scope.update_dataconnector = function() {
				console.log('update data connector');
		};

		// Update existing Build
		$scope.initGitClient = function(k) {
			console.log('initGit client....');
			// Create new Build object
			
		};

		// Create new Build
		$scope.create = function() {
			// Create new Build object
			var build = new Builds ({
				name: this.name
			});

			// Redirect after save
			build.$save(function(response) {
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
			$scope.builds = Builds.query();
		};

		// Find existing Build
		$scope.findOne = function() {
			$scope.build = Builds.get({
				buildId: $stateParams.buildId
			});
		};
	}
]);
