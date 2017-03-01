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
							<YAxis />
							<Tooltip />
							<CartesianGrid stroke="#f5f5f5" />
							<Line type="monotone" dataKey={this.props.dataKey} stroke={this.props.stroke} dot={false} />
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
							<YAxis />
							<Tooltip />
							<CartesianGrid stroke="#f5f5f5" />
							<Line type="monotone" dataKey="pedestrian" stroke="#4DB9E0" dot={false} />
							<Line type="monotone" dataKey="bicyclists" stroke="#49C983" dot={false} />
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