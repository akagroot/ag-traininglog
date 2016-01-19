angular.module('myAppQuickList', []) 
.directive('myQuickList', function() {
	return {
		scope: {
			items: '=', 
			filter: '=', 
			itemPicked: '&itemPicked'
		}, 
		templateUrl: 'directives/quicklist.html'
	};
});