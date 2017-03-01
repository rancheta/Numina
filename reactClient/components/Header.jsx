var React = require('react')

var Header = React.createClass({

	render : function() {
		return (
			<div className="row nav">
				<div className="container">
					<div className="col-xs-12 center">
						<h3 style={{ color: this.props.isPlainView ? "#333" : "#ea3788"}}>
							Numina Heartbeats
						</h3>
					</div>
				</div>
			</div>
		)
	}
})

module.exports = Header