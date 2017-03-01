var request = require('superagent')
var moment = require('moment')

module.exports = {
	loadCountData: function (callback) {
		var countUrl = "https://api.numina.co/a/counts"
		request
			.get(countUrl)
			.set('Accept', 'application/json')
			.end(function(err, res){
				if (err) { callback(true, "Could Not Load Data"); return; }
				callback(false, res)
			});
	},

	sortDataByDate: function(countData) {
		return countData.sort(function(a,b){
		  return new Date(a.time) - new Date(b.time);
		});
	},

	secsToMinsD3Transform: function (countData, nClass) {
		if (countData.length === 0 ) {return []};
		var newCountData = new Array()
		var currentMinute = moment(countData[0].time).endOf('minute').format("HH:mm");
		var secCountBy5 = 0
		var minPedCount = 0
		var minBicyCount = 0
		for (var i = 0; i < countData.length; i++) {
			var crntItem = countData[i]
			// just count secs by 5, 12 to a minute, operation to compare dates is too costly/slow
			if (secCountBy5 === 12) {
				newCountData.push({time: currentMinute, pedestrian: minPedCount, bicyclists: minBicyCount, total: minPedCount + minBicyCount})
				var nextTimePoint = moment(countData[i].time).endOf('minute')
				currentMinute = nextTimePoint.format("HH:mm");
				minPedCount = 0
				minBicyCount = 0
				secCountBy5 = 0
			} else {
				minPedCount = crntItem.class === "pedestrian" ? minPedCount + crntItem.count : minPedCount
				minBicyCount = crntItem.class === "bicyclists" ? minBicyCount + crntItem.count : minBicyCount
				secCountBy5++
			}
		};
		return newCountData
	}
} 	
