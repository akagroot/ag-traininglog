angular.module('myAppQuickList', []) 
.directive('myQuickList', function() {
	return {
		scope: {
			items: '=', 
			filter: '=', 
			itemPicked: '&', 
			closePressed: '&',
			noItemsFound: '&', 
			itemsFound: '&'
		}, 
		templateUrl: 'directives/quicklist.html'
	};
});