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

		// Parse.User.current().clear();
		// Parse.User.current().save();
		
		var currentUser = Parse.User.current();

		// currentUser.set('log_count', 0);
		// console.log(Parse.User.current().get('log_count'));

console.log(currentUser);
		var Log = Parse.Object.extend("Log");
		var query = new Parse.Query(Log);
		query.equalTo("user", currentUser.getUsername())
		.select("description", "date")
		.limit(14)
		.find( {
			success: function(logs) {
				$scope.entries = logs;
				console.log(logs);

				$("html, body").animate({ scrollTop: $(document).height() }, "fast");
			}, 
			error: function(error) {
				console.log(error);
			}
		});

		$scope.orderBy = 'date';
	}
]);