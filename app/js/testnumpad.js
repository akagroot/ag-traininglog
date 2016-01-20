'use strict';

angular.module('myApp.testnumpad', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/testnumpad', {
    templateUrl: 'views/testnumpad.html',
    controller: 'TestNumPadCtrl'
  });
}])

.controller('TestNumPadCtrl', ['$scope', 
	function($scope) {
		$scope.showNumpad = true;
		$scope.number = 0;
	}
]);