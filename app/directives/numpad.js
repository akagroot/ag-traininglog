angular.module('myAppNumPad', []) 
.directive('myNumPad', function() {
	return {
		scope: {
			numberPressed: '&', 
			backspacePressed: '&', 
			enterPressed: '&'
		}, 
		templateUrl: 'directives/numpad.html'
	};
});