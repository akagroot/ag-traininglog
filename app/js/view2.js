'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/log_details/:id', {
    templateUrl: 'views/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$routeParams', '$http', 
	function($scope, $routeParams, $http) {
		var currentUser = Parse.User.current();
		var logEntires = currentUser.get('log_data');
		console.log(logEntires);
		var selectedLog = logEntires.get(id);
		$scope.details = selectedLog;

		// $http.get('data/log_details_' + $routeParams.id + '.json').success(function(data) {
		// 	$scope.details = data;
		// });
	}
]);