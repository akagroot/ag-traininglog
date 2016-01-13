'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add_log', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', ['$scope',
	function(scope) {
		scope.add = function(description) {
			if(description == null)
				alert('The description is empty');
			else
				alert('This is a full description');
		}
	}
]);