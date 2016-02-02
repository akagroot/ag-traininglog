'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add_log', {
    templateUrl: 'views/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', ['$scope','$location','ExerciseService',
	function($scope, $location, ExerciseService) {
		$scope.add = function() {
			if(typeof $scope.date == 'undefined' || $scope.date.length == 0)
			{
				alert('Date is empty');
				return;
			}

			ExerciseService.assignExercisesToScope($scope, function() {

			});

			// ExerciseService.addLog($scope, function(successful) {
			// 	if(successful)
			// 	{
			// 		$location.path('/view1');
			// 		$scope.$apply();
			// 	}
			// 	else
			// 		alert("Something went wrong.");
			// });
		}

		var letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",];
		$scope.addSuperset = function(key) {
			var exercise = $scope.exercises[key];
			var newSuperset = new Object();
			newSuperset.doMeasure = true;
			exercise.supersets.push(newSuperset);
		}

		var getExercise = function(group) {
			return $scope.exercises[group];
		}

		var getSuperset = function(group, superset) {
			var exercise = getExercise(group);
			return exercise.supersets[superset];
		}

		$scope.removeExerciseGroup = function(group) {
			$scope.exercises.splice(group, 1);
		}

		$scope.removeSuperset = function(group, superset) {
			var exercise = getExercise(group);
			exercise.supersets.splice(superset, 1);
		}

		$scope.dontMeasureClicked = function(group, superset) {
			var superset = getSuperset(group, superset);
			superset.doMeasure = false;
		}

		$scope.addMeasureClicked = function(group, superset) {
			var superset = getSuperset(group, superset);
			superset.doMeasure = true;	
		}

		$scope.setsChanged = function(group, superset, sets) {
			if(!(sets >>> 0 === parseFloat(sets)))
				return;

			var mSuperset = getSuperset(group, superset);
			mSuperset.repsCompleted = new Array();

			for(var i = 0; i < mSuperset.sets; i++)
			{
				var newRepsCompleted = new Object();
				newRepsCompleted.reps = "";
				newRepsCompleted.measurement = "";
				mSuperset.repsCompleted.push(newRepsCompleted);	
			}
		}

		$scope.repsChanged = function(group, superset, reps) {
			if(!(reps >>> 0 === parseFloat(reps)))
				return;

			var mSuperset = getSuperset(group, superset);

			for(var i = 0; i < mSuperset.sets; i++)
			{
				var repsCompleted = mSuperset.repsCompleted[i];

				if(repsCompleted.reps > reps)
				{
					repsCompleted.manuallyChanged = false;
					repsCompleted.reps = reps;
				}
				else if(!repsCompleted.manuallyChanged)
					repsCompleted.reps = reps;	
			}
		}

		$scope.repsCompleteRepsChanged = function(group, superset, repsCompletedKey) {
			var mSuperset = getSuperset(group, superset);
			var repsCompleted = mSuperset.repsCompleted[repsCompletedKey];

			repsCompleted.manuallyChanged = true;
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
			newExercise.supersets = new Array();
			var key = $scope.exercises.push(newExercise)-1;
			$scope.addSuperset(String(key));
		}

		$scope.showExerciseQuicklist = false;
		$scope.selectedExerciseKey = null;
		$scope.selectedSupersetKey = null;
		$scope.letters = letters;

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

		$scope.exercisePicked = function(item) {
			var superset = getSuperset($scope.selectedExerciseKey, $scope.selectedSupersetKey);

			superset.exercise = item;
			superset.name = item.name;

			$scope.showExerciseQuicklist = false;

			$scope.selectedExerciseKey = null;
			$scope.selectedSupersetKey = null;
		}

		$scope.exerciseListFilter = "";

		$scope.exerciseList = ExerciseService.getExercises(function(entries) {
			$scope.exerciseList = entries;
			$scope.$apply();
		});

		$scope.exercises = new Array();
		$scope.addExercise();

		$scope.description="";
		$scope.date = new Date();
	}
]);