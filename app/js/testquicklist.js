'use strict';

angular.module('myApp.testquicklist', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/testquicklist', {
    templateUrl: 'views/testquicklist.html',
    controller: 'TestQuickListCtrl'
  });
}])

.controller('TestQuickListCtrl', ['$scope', 
	function($scope) {
		$scope.myItems = ["Item 1", "Another 2", "Then 3", "Select 4", "Item 5"];
		$scope.theItem = "Item";
		$scope.theItem2 = "Another 2";
		$scope.myFilter = "";
		$scope.selectedModel = null;

		$scope.log = function(item)
		{
			console.log(item);
		}

		$scope.myItemPicked = function(name) {
			console.log("From testquicklist.js");
			console.log(name);
			$scope.myFilter = "";
		}

		$scope.sayMessage = function() {
			console.log('here');
		}

		$scope.showQuickList = true;
	}
]);