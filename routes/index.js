var React 			= require('react')
var ReactDomServer 	= require('react-dom/server')
var request 		= require('superagent')
var actions 		= require('../reactClient/actions')
var Dashboard 		= require('../reactClient/pages/Dashboard.jsx')

module.exports = function(app) {

	app.get('/', function(req, res){
		// This is here to instatiate count data on server
		// instead of calling remote api could call directly to DB on prod server a little cleaner
		var countUrl = "https://api.numina.co/a/counts"
		request
			.get(countUrl)
			.set('Accept', 'application/json')
			.end(function(err, countsRes){
				var reactDashboard = React.createFactory(Dashboard) ;
				var props = {
					counts: actions.sortDataByDate(countsRes.body.result),
					meta: countsRes.body.meta
				}
				var reactHtml = ReactDomServer.renderToString(reactDashboard(props));
	    		res.render('index.handlebars', {reactOutput: reactHtml, appFile: 'dashboard', serverProps: JSON.stringify(props)});
		});
	});

	app.get('*', function(req, res) {
	    res.json({
	        'route': 'Sorry this page does not exist!'
	    })
	})


};