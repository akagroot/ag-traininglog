'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/log_details/:id', {
    templateUrl: 'views/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$routeParams', '$http', 
	function($scope, $routeParams, $http) {
		var currentUser = Parse.User.current();

		var Log = new Parse.Object.extend("Log");
		var query = new Parse.Query(Log);
		var loadedObj = null;

		query.get($routeParams.id)
			.then(function(obj) {
				console.log(obj);
				loadedObj = obj;
				$scope.log = obj.toJSON();
				$scope.$apply();
			});

		$scope.edit = function(name) {
			$('#static-' + name).hide();
			$('#edit-' + name).show();
		}

		$scope.save = function(name, value) {
			if(loadedObj != null) {
				console.log(value);
				loadedObj.set(name, value);
				loadedObj.save()
					.then(function(successful) {
						$('#edit-' + name).hide();
						$('#static-' + name).show();			
					}, function(error) {
						alert('An error occured.');
						console.log(error);
					});
			}
		}

		$('.edit').hide();
	}
]);