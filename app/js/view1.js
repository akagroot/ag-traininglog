'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'views/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', '$location',
	function($scope, $http, $location) {
		// $http.get('data/log_data.json').success(function(data) {
		// 	$scope.entries = data;
		// });

		$scope.logout = function(form) {
			Parse.User.logOut();
			$location.path('/login');
		}
		
		var currentUser = Parse.User.current();

		var Log = Parse.Object.extend("Log");
		var query = new Parse.Query(Log)
			.limit(14)
			.equalTo("user", currentUser)
			.select("description", "date")
			.find()
			.then(function(results) {
				var entries = new Array();
				$.each(results, function(i, e) {
					entries.push(e.toJSON());
				});
				console.log(entries);
				$scope.entries = entries;

				$scope.$apply();
			});
	}
]);