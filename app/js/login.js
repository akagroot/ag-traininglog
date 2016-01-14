'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope', '$location',
	function($scope, $location) {
		$scope.login = function(username, password) {
			var error = false;
			$('.error').hide();

			if(typeof username == 'undefined' || username.length == 0)
			{
				$('#username_error').show();
				error = true;
			}

			if(typeof password == 'undefined' || password.length == 0)
			{
				$('#password_error').show();
				error = true;
			}

			if(error)
				return;

			Parse.User.logIn(username, password, {
				success: function(user) {
					$location.path('/view1');
				},
				error: function(user, error) {
					alert('Something went wrong.  Check your username and password and try again.');
					console.log(error);
				}
			});
		}

		$('.error').hide();
	}
]);