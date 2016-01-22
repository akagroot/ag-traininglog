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

		var letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",];
		$scope.addSuperset = function(key) {
			var exercise = $scope.exercises[key];
			var newSuperset = new Object();
			newSuperset.supersetIndex = letters[exercise.supersets.length+1];
			exercise.supersets.push(newSuperset);
		}

		$scope.getNumber = function(num) {

			var x = new Array(); 
			for(var i = 0; i < num; i++) { 
				x.push(i+1); 
			} 
			return x;
		}

		$scope.addExercise = function() {
			var newExercise = new Object();
			newExercise.supersetIndex = "A";
			newExercise.supersets = new Array();
			$scope.exercises.push(newExercise);
		}

		$scope.showExerciseQuicklist = false;
		$scope.selectedExerciseKey = null;
		$scope.selectedSupersetKey = null;

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
		}

		$scope.supersetNameClicked = function(key, supersetKey) {
			$scope.selectedExerciseKey = key;
			$scope.selectedSupersetKey = supersetKey;

			$scope.exerciseListFilter = "";
			$scope.showExerciseQuicklist = true;
		}

		$scope.exerciseNameChanged = function(name) {
			$scope.exerciseListFilter = name;
		}

		$scope.exercisePicked = function(name) {
			var exercise = $scope.exercises[$scope.selectedExerciseKey];
			if($scope.selectedSupersetKey != null) {
				var superset = exercise.supersets[$scope.selectedSupersetKey];
				superset.name = name;
			} else {
				exercise.name = name;
			}
	
			$scope.showExerciseQuicklist = false;

			$scope.selectedExerciseKey = null;
			$scope.selectedSupersetKey = null;
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

		$scope.exercises = new Array();
		$scope.addExercise();

		$scope.description="";
		$scope.date = new Date();
	}
]);