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
		$scope.add = function() {
			if(typeof $scope.date == 'undefined' || $scope.date.length == 0)
			{
				alert('Date is empty');
				return;
			}

			if(typeof $scope.description == 'undefined' || $scope.description.length == 0)
			{
				alert('Description is empty');
				return;
			}

			var currentUser = Parse.User.current();
			var logCount = currentUser.get('log_count');
			currentUser.increment('log_count');

			var Log = Parse.Object.extend("Log");
			var newLog = new Log();

			newLog.set("description", $scope.description);
			newLog.set("user", currentUser);
			newLog.set("date", $scope.date);
			newLog.save(null, {
				success: function(newLogAgain) {
					$location.path('/view1');
				}, 
				error: function(newLogAgain, error) {
					alert("Something went wrong.");
					console.log(error);
				}
			});
		}

		$scope.description="";
		$scope.date = new Date();
	}
]);