var React = require('react')
var LineChart = require('recharts').LineChart
var XAxis = require('recharts').XAxis
var YAxis = require('recharts').YAxis
var Tooltip = require('recharts').Tooltip
var CartesianGrid = require('recharts').CartesianGrid
var ResponsiveContainer = require('recharts').ResponsiveContainer
var Legend = require('recharts').Legend
var Line = require('recharts').Line
var exEnv = require('exenv')
var moment = require('moment')
var actions = require('../actions/index.js')

var heartSettings = function(isPlainView) {
	return {
		domain : isPlainView ? null : [ 0, 15],
		animLnth : isPlainView ? 1500 : 2000
	}
}

var NoDataFiller = React.createClass({
	render: function(){
		return (
			<div className="chart-container text-center">
				<br  />
				<h3>Loading Data...</h3>
				<br  />
			</div>
		)
	}
})

var NuLine = React.createClass({

	render: function() {
		if (this.props.data && this.props.data.length > 0 && exEnv.canUseDOM){
			return (
				<div className="chart-container text-center">
					<h4>{this.props.title}</h4>
					<p>{"from " + moment(this.props.meta.start).format("MMM DD HH:mm a") + " to " + moment(this.props.meta.end).format("MMM DD HH:mm a")}</p>
					<ResponsiveContainer width="100%" height={250} className="chart-container">
						<LineChart
							syncId={this.props.syncId || null}
							data={this.props.data}>
							<XAxis dataKey="time" interval={20} />
							<YAxis domain={heartSettings(this.props.isPlainView).domain} />
							<Tooltip />
							<CartesianGrid stroke="#f5f5f5" />
							<Line animationDuration={heartSettings(this.props.isPlainView).animLnth} type="monotone" dataKey={this.props.dataKey} stroke={this.props.stroke} dot={false} />
							<Legend />
						</LineChart>
					</ResponsiveContainer>
				</div>
			)
		} else {
			return <NoDataFiller  />
		}
	}
})

var NuCombinedLine = React.createClass({

	render: function() {
		if (this.props.data && this.props.data.length > 0  && exEnv.canUseDOM){
			return (
				<div className="chart-container text-center">
					<h4>{this.props.title}</h4>
					<p>{"from " + moment(this.props.meta.start).format("MMM DD HH:mm a") + " to " + moment(this.props.meta.end).format("MMM DD HH:mm a")}</p>
					<ResponsiveContainer width="100%" height={270} className="chart-container">
						<LineChart
							syncId={this.props.syncId || null}
							data={this.props.data}>
							<XAxis dataKey="time" interval={10} />
							<YAxis domain={heartSettings(this.props.isPlainView).domain} />
							<Tooltip />
							<CartesianGrid stroke="#f5f5f5" />
							<Line animationDuration={heartSettings(this.props.isPlainView).animLnth + 100} type="monotone" dataKey="pedestrian" stroke={ this.props.isPlainView ? "#4DB9E0" : "#ea3788"} dot={false} />
							<Line animationDuration={heartSettings(this.props.isPlainView).animLnth} type="monotone" dataKey="bicyclists" stroke={ this.props.isPlainView ? "#49C983" : "#ea3788"} dot={false} />
							<Legend />
						</LineChart>
					</ResponsiveContainer>
				</div>
			)
		} else {
			return <NoDataFiller  />
		}
	}
})

module.exports = {
	LineChart: NuLine,
	CombinedLine: NuCombinedLine
}