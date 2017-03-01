var React = require('react')

var Header = React.createClass({

	shouldComponentUpdate : function() {
		// Can be rendered on init page but keeping for future implementations
		return false
	},

	render : function() {
		return (
			<div className="row nav">
				<div className="container">
					<div className="col-xs-12 col-md-8">
						<h5>Numina</h5>
					</div>
				</div>
			</div>
		)
	}
})

module.exports = Header