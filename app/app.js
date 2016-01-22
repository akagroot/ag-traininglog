'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.login',
  'myApp.register',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.version', 
  'myAppFilters', 
  'myApp.testquicklist', 
  'myApp.selectOnClick',
  'myAppQuickList',
  'myApp.testnumpad', 
  'myAppNumPad'
]).
config(['$routeProvider', function($routeProvider, $locationProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]).
run(function($rootScope, $location) {
	Parse.initialize("d2FMmUDfUwLIMSOxSFPMZqclQnOEzIiAmg8nb488", "S0NEGQu6u2iisEtIxC3qd0wWfGlDiuHMC7U2GI8B");
	
	// console.log('Run function');
	// console.log($location.url());
	// if(typeof Parse.User.current() != 'undefinded') {
	// 	$location.path('#/view1');
	// } else if($location.url() !== '/register') {
	// 	$location.path('#/login');
	// }
});