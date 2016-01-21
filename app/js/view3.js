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

		$scope.getNumber = function(num) {

			var x = new Array(); 
			for(var i = 0; i < num; i++) { 
				x.push(i+1); 
			} 
			return x;
		}

		$scope.addExercise = function() {
			$scope.exercises.push(new Object());
		}

		$scope.showExerciseQuicklist = false;
		$scope.selectedExerciseKey = "";

		$scope.exerciseNameLostFocus = function() {
			$scope.showExerciseQuicklist = false;
		}

		$scope.closeExerciseQuicklist = function() {
			$scope.showExerciseQuicklist = false;
		}

		$scope.exerciseNameClicked = function(key) {
			$scope.selectedExerciseKey = key;
			$scope.exerciseListFilter = "";
			$scope.showExerciseQuicklist = true;
			console.log(key);
		}

		$scope.exerciseNameChanged = function(name) {
			$scope.exerciseListFilter = name;
		}

		$scope.exercisePicked = function(name) {
			console.log('here');
			console.log($scope.selectedExerciseKey);
			var exercise = $scope.exercises[$scope.selectedExerciseKey];
			console.log(exercise);
			exercise.name = name;
			$scope.showExerciseQuicklist = false;
		}

		$scope.exerciseListFilter = "";
		$scope.exerciseList = [
			"Back Squat", 
			"Deadlifts", 
			"Front Squat", 
			"Overhead Squat", 
			"Bench Press", 
			"Overhead Press", 
			"Clean", 
			"Snatch"
		];

		$scope.exercises = [ new Object() ];
		$scope.description="";
		$scope.date = new Date();
	}
]);