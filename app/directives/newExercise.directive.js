angular.module('myApp.NewExerciseDirective', []) 
.directive('newExercise', function() {
	return {
		scope: {
			index: '=',
			exercise: '=', 
			showQuicklist: '=', 
			nameClicked: '&',
			nameChanged: '&', 
			removeExerciseGroup: '&'
		}, 
		templateUrl: 'directives/newExercise.html', 
		controller: function($scope, $element, $attrs) {
			$scope.hideQuicklist = function() {
				$scope.showQuicklist = false;
			}

			$scope.showQuicklist = function() {
				$scope.showQuicklist = true;
			}

			var getSuperset = function(superset) {
				return $scope.exercise.supersets[superset];
			}

			var letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",];
			$scope.addSuperset = function() {
				var newSuperset = new Object();
				newSuperset.doMeasure = true;
				$scope.exercise.supersets.push(newSuperset);
			}

			$scope.removeSuperset = function(superset) {
				$scope.exercise.supersets.splice(superset, 1);
			}

			$scope.dontMeasureClicked = function(superset) {
				var superset = getSuperset(superset);
				superset.doMeasure = false;
			}

			$scope.addMeasureClicked = function(superset) {
				var superset = getSuperset(superset);
				superset.doMeasure = true;	
			}

			$scope.setsChanged = function(superset, sets) {
				if(!(sets >>> 0 === parseFloat(sets)))
					return;

				var mSuperset = getSuperset(superset);
				mSuperset.repsCompleted = new Array();

				for(var i = 0; i < mSuperset.sets; i++)
				{
					var newRepsCompleted = new Object();
					newRepsCompleted.reps = "";
					newRepsCompleted.measurement = "";
					mSuperset.repsCompleted.push(newRepsCompleted);	
				}
			}

			$scope.repsChanged = function(superset, reps) {
				if(!(reps >>> 0 === parseFloat(reps)))
					return;

				var mSuperset = getSuperset(superset);

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

			$scope.repsCompleteRepsChanged = function(superset, repsCompletedKey) {
				var mSuperset = getSuperset(superset);
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
		}
	};
});