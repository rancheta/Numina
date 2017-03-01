var React 			= require('react')
var ReactDomServer 	= require('react-dom/server')
var request 		= require('superagent')
var actions 		= require('../reactClient/actions')

module.exports = function(app) {

	app.get('/', function(req, res){
		var Dashboard = React.createFactory( require('../reactClient/pages/Dashboard.jsx') );
		// This is here to instatiate count data on server
		// instead of calling remote api could call directly to DB on prod server a little cleaner
		var countUrl = "https://api.numina.co/a/counts"
		request
			.get(countUrl)
			.set('Accept', 'application/json')
			.end(function(err, countsRes){
				var reactHtml = ReactDomServer
								.renderToString(Dashboard({ counts: actions.sortDataByDate(countsRes.body.result), 
															meta: countsRes.body.meta}));
	    		res.render('index.handlebars', {reactOutput: reactHtml, appFile: 'dashboard'});
		});
	});

	app.get('*', function(req, res) {
	    res.json({
	        'route': 'Sorry this page does not exist!'
	    })
	})


};