angular.module('myApp.ExerciseService', []) 
.service('ExerciseService', function() {
	// Get Exercises for all users and user specific exercises
	this.getExercises = function(callback) {
		var entries = new Array();
		var currentUser = Parse.User.current();

		var Exercise = Parse.Object.extend("Exercise");
		var standardExerciseQuery = new Parse.Query(Exercise)
			.equalTo('user', null);
		var customExerciseQuery = new Parse.Query(Exercise)
			.equalTo('user', currentUser);

		var query3 = Parse.Query.or(standardExerciseQuery, customExerciseQuery)
			.find()
			.then(function(results) {
				console.log(results);
				$.each(results, function(i, e) {
					entries.push(e.toJSON());
				});
				callback(entries);
			})
	};

	this.assignExercisesToScope = function(scope, callback) {
		$.each(scope.exercises, function(i, group) {
			$.each(group.supersets, function(j, superset) {
				if(typeof superset.name != 'undefined' 
					&& typeof superset.exercise == 'undefined') {
					console.log(superset);
				
					var Exercise = Parse.Object.extend("Exercise");
					var query = Parse.Query(Exercise)
					.equalTo('name_lowercase', superset.name.toLowerCase())
					.find()
					.then(function(results) {
						console.log(results);
					}, function(error) {
						console.log(error);
					});
				}
			});
		});
	}

	// Save the log to Parse
	this.addLog = function(scope, callback) {
		console.log(scope);
		var currentUser = Parse.User.current();

		var saveObjects = new Array();

		var Exercise = Parse.Object.extend("Exercise");

		var Log = Parse.Object.extend("Log");
		var newLog = new Log();
		newLog.set("date", scope.date);
		newLog.set("notes", scope.description);
		newLog.set("user", currentUser);

		saveObjects.push(newLog);

		var letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",];
		var logDescriptionEntries = new Array();
		var exerciseCount = 0;
		var supersetLetterIndex = 0;

		$.each(scope.exercises, function(i, group) {

			var validGroup = false;
			$.each(group.supersets, function(index, superset) {
				if(typeof superset.name != 'undefined' && superset.name.trim().length > 0)
					validGroup = true;
			});

			if(validGroup)
			{
				console.log(group);
				exerciseCount++;
				supersetLetterIndex = 0;

				var LogGroup = Parse.Object.extend("LogGroup");
				var newLogGroup = new LogGroup();
				newLogGroup.set("position", i);
				newLogGroup.set("log", newLog);
				saveObjects.push(newLogGroup);

				$.each(group.supersets, function(index, superset) {
					if(typeof superset.name != 'undefined') {
						console.log(superset);

						var LogGroupExercise = Parse.Object.extend("LogGroupExercise");
						var newLogGroupExercise = new LogGroupExercise();
						var selectedExercise = new Exercise({id:superset.exercise.objectId});

						var logDescription = "<b>(" 
							+ exerciseCount + letters[supersetLetterIndex] 
							+ ")</b>&nbsp;";

						if(typeof superset.sets != 'undefined' 
							&& typeof superset.reps != 'undefined')
						{
							logDescription += (superset.sets + "x" 
								+ superset.reps + "</b>&nbsp;");
						}
						logDescription += selectedExercise.name;

						if(typeof superset.notes != 'undefined') {
							logDescriptionEntries += ("<i>"
								+ superset.notes + "</i>");
						}

						logDescriptionEntries.push(logDescription);
						supersetLetterIndex++;

						newLogGroupExercise.set("LogGroup", newLogGroup);
						newLogGroupExercise.set("Exercise", selectedExercise);
						newLogGroupExercise.set("position", index);
						newLogGroupExercise.set("setCount", parseInt(superset.sets));
						newLogGroupExercise.set("repCount", parseInt(superset.reps));
						newLogGroupExercise.set("notes", superset.notes);
						saveObjects.push(newLogGroupExercise);

						if(superset.doMeasure) {
							$.each(superset.repsCompleted, function(ind, repsComplete) {
								console.log(repsComplete);
								var LogGroupExerciseSet = Parse.Object.extend("LogGroupExerciseSet");
								var newLogGroupExerciseSet = new LogGroupExerciseSet();
								newLogGroupExerciseSet.set("LogGroupExercise", newLogGroupExercise);
								newLogGroupExerciseSet.set("reps", parseInt(repsComplete.reps));
								newLogGroupExerciseSet.set("measurement", parseInt(repsComplete.measurement));
								newLogGroupExerciseSet.set("manuallyChanged", repsComplete.manuallyChanged);
								saveObjects.push(newLogGroupExerciseSet);
							});
						}
					}
				});
			}
		});

		newLog.set("description", logDescriptionEntries.join(", "));

		Parse.Object.saveAll(saveObjects, {
			success:function() {
				callback(true);
			}, 
			error: function(error) {
				console.log(error);
				callback(false);
			}
		});
	};
});