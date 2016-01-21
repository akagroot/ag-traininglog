angular.module('myAppQuickList', []) 
.directive('myQuickList', function() {
	return {
		scope: {
			items: '=', 
			filter: '=', 
			itemPicked: '&', 
			closePressed: '&'
		}, 
		templateUrl: 'directives/quicklist.html'
	};
});