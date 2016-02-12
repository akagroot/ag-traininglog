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

			ExerciseService.assignExercisesToScope($scope, function(successful) {
				var notSuccessful = function() {
					alert("Something went wrong.");
				}
				
				if(successful) {
					ExerciseService.addLog($scope, function(successful) {

					if(successful) {
						$location.path('/view1');
						$scope.$apply();
					}
					else
						notSuccessful();
					});	
				} else 
					notSuccessful();
				
			});
		}

		var getExercise = function(group) {
			return $scope.exercises[group];
		}

		$scope.removeExerciseGroup = function(group) {
			$scope.exercises.splice(group, 1);
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

		$scope.closeExerciseQuicklist = function() {
			$scope.showExerciseQuicklist = false;
		}

		$scope.nameClicked = function(key, supersetKey) {
			$scope.selectedExerciseKey = key;
			$scope.selectedSupersetKey = supersetKey;

			$scope.exerciseListFilter = "";
			$scope.showExerciseQuicklist = true;
		}

		$scope.nameChanged = function(name) {
			$scope.exerciseListFilter = name;
		}

		$scope.exercisePicked = function(item) {
			var superset = getSuperset($scope.selectedExerciseKey, $scope.selectedSupersetKey);

			superset.exercise = item;
			superset.name = item.name;

			$scope.hideExerciseQuickList();
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