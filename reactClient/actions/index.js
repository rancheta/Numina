var request = require('superagent')

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
	}
} 	
