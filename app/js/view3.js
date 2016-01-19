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
		var bindValue = null;

		$scope.itemPicked = function(name) {
			$scope.quickListFilter = "";
			console.log(name);
			$('#quickList').hide();

			bindValue = name;

			if(selectedQuickListElement != null) {
    // var input = $('input');
    // input.val('xxx');
    // input.trigger('input');

    			$(selectedQuickListElement).val(name);
    			$(selectedQuickListElement).trigger('input');

				// $(selectedQuickListElement).attr('value', name);
				// $(selectedQuickListElement).html(name);
			}
		}

		$scope.updateFilter = function() {
			$scope.quickListFilter = selectedQuickListElement.value;
		}

		$scope.showQuickList = function($event, bind) {
			var element = $event.target;
			console.log("Binding:");
			console.log(bind);

			selectedQuickListElement = element;
			bindValue = bind;
			$scope.quickListFilter = bind;

			$('#quickList').show();
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