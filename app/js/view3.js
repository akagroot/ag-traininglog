'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add_log', {
    templateUrl: 'views/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', ['$scope','$location',
	function($scope, $location) {
		$scope.add = function(description) {
			if(typeof description == 'undefined' || description.length == 0)
			{
				alert('Description is empty');
				return;
			}

			var currentUser = Parse.User.current();
			var logCount = currentUser.get('log_count');
			currentUser.increment('log_count');

			var NewLog = Parse.Object.extend("Log");
			var newLog = new NewLog();
			
			newLog.set("description", description);
			newLog.set("date", new Date());
			newLog.set("user", currentUser.getUsername());
			newLog.save();

			// currentUser.add('log_data', NewLog);
			// currentUser.save();
			$location.path('/view1');
		}
	}
]);