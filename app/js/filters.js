angular.module('myAppFilters', [])

.filter('relativeTime', function() {
	var switchDay = function(day)
	{
		switch(day)
		{
			case 0:
				return "Sunday";
			case 1:
				return "Monday";
			case 2:
				return "Tuesday";
			case 3:
				return "Wednesday";
			case 4:
				return "Thursday";
			case 5:
				return "Friday";
			case 6:
				return "Saturday";
		}
	}

	var formatDate = function(date)
	{
		var monthNames = [
			"January", "Febuary", "March", "April", 
			"May", "June", "July", "August", 
			"September", "October", "November", "December"
		];

		return monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
	}

	return function(input) {
		var today = new Date();
		today.setHours(0);
		today.setMinutes(0);
		today.setSeconds(0);
		today.setMilliseconds(0);

		var inputDate = new Date(input);
		inputDate.setHours(0);
		inputDate.setMinutes(0);
		inputDate.setSeconds(0);
		inputDate.setMilliseconds(0);

		var difference = today.getTime() - inputDate.getTime();

		if(difference == 0)
			return "Today (" + formatDate(inputDate) + ")";

		if(difference == 86400000)
			return "Yesterday (" + formatDate(inputDate) + ")";

		if(difference < 604800000)
			return switchDay(inputDate.getDay()) + " (" + formatDate(inputDate) + ")";

		if(difference < 1209600000 && inputDate.getDay() <= today.getDay())
			return "Last " + switchDay(inputDate.getDay()) + " (" + formatDate(inputDate) + ")";

		return formatDate(inputDate) + " (" + switchDay(inputDate.getDay()) + ")";
	};
});