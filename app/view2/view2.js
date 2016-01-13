'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/log_details/:id', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$routeParams', '$http', 
	function($scope, $routeParams, $http) {
		$http.get('data/log_details_' + $routeParams.id + '.json').success(function(data) {
			$scope.details = data;
		});
	}
]);