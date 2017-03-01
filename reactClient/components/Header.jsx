var React = require('react')

var Header = React.createClass({

	shouldComponentUpdate : function (nextProps, nextState) {
		return this.props.autoSync != nextProps.autoSync ? true : false
	},

	render : function() {
		return (
			<div className="row nav">
				<div className="container">
					<div className="col-xs-12 col-md-8 center">
						<h3>Numina Heartbeats</h3>
					</div>
					<div className="col-xs-12 col-md-4 center">
						<button className="btn button btn-default" onClick={() => this.props.toggleSync()}>
							Turn {this.props.autoSync ? "Off" : "On"} Auto Sync
						</button>
					</div>
				</div>
			</div>
		)
	}
})

module.exports = Header