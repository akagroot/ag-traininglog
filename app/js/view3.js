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

		$scope.addExercise = function() {
			$scope.exercises.push(new Object());
		}

		var selectedQuickListElement = null;

		$scope.itemPicked = function(name) {
			$scope.quickListFilter = "";
			console.log(name);
			$('#quickList').hide();

			if(selectedQuickListElement != null) {
				$(selectedQuickListElement).attr('value', name);
			}
		}

		$scope.selectedElementForQuickList = null;
		$scope.showQuickList = function(element) {
			$('#quickList').show();
			selectedQuickListElement = element;
			console.log(element);
		}

		$scope.quickListFilter = "";
		$scope.quickList = [ {
				"name":"Back Squat"
			}, {
				"name":"Deadlifts"
			}, {
				"name":"Front Squat"
			}, {
				"name":"Overhead Squat"
			}, {
				"name":"Bench Press"
			}, {
				"name":"Overhead Press"
			}, {
				"name":"Clean"
			}, {
				"name":"Snatch"
			}
		];

		$scope.exercises = new Array();
		$scope.description="";
		$scope.date = new Date();

		$('.hideOnStart').hide();
	}
]);