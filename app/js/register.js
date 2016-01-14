'use strict';

angular.module('myApp.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'views/register.html',
    controller: 'RegisterCtrl'
  });
}])

.controller('RegisterCtrl', ['$scope', '$http', '$location',
	function($scope, $http, $location) {
		var validateEmail = function(email)
		{
		    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return re.test(email);
		}

		$scope.register = function(email, password, confirmPassword) {
			var error = false;
			$('.error').hide();

			if(typeof email == 'undefined' || email.length == 0)
			{
				$('#email_error').html('Please enter an email.');
				$('#email_error').show();
				error = true;
			} else if(!validateEmail(email))
			{
				$('#email_error').html('Please enter a valid email address.');
				$('#email_error').show();
				error = true;
			}

			if(typeof password == 'undefined' || password.length == 0)
			{
				$('#password_error').show();
				error = true;
			}

			if(typeof confirmPassword == 'undefined' || confirmPassword.length == 0)
			{
				$('#confirm_password_error').html('Please confirm your password.');
				$('#confirm_password_error').show();
				error = true;
			} else if(confirmPassword != password)
			{
				$('#confirm_password_error').html('Passwords do not match.');
				$('#confirm_password_error').show();
				error = true;
			}

			if(error)
				return;

			// Create user in Parse
			var user = new Parse.User();
			user.set('username', email);
			user.set('password', password);
			user.set('email', email);
			user.set('log_count', 0);

			user.signUp(null, {
				success: function(user) {

					$location.path('/login');
				}, 
				error: function(user, error) {
					alert("Something went wrong.");
					console.log(error);
				}
			})
		}

		$('.error').hide();
	}
]);