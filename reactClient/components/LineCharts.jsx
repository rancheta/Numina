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
var actions = require('../actions/index.js')

var NoDataFiller = React.createClass({
	render: function(){
		return (
			<h5>No Data</h5>
		)
	}
})

var NuLine = React.createClass({

	render: function() {
		if (this.props.data && this.props.data.length > 0){
			return (
				<ResponsiveContainer width="100%" height={250}>
					<LineChart
						sycnId={this.props.sycnId || null}
						data={this.props.data}
						width={2000} height={250}
						margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
						<XAxis dataKey="time" interval={20} />
						<YAxis />
						<Tooltip />
						<CartesianGrid stroke="#f5f5f5" />
						<Line type="monotone" dataKey={this.props.dataKey} stroke="#ff7300" />
						<Legend />
					</LineChart>
				</ResponsiveContainer>
			)
		} else {
			return <NoDataFiller  />
		}
	}
})

var NuCombinedLine = React.createClass({

	render: function() {
		if (this.props.data && this.props.data.length > 0){
			return (
				<ResponsiveContainer width="100%" height={300}>
					<LineChart
						sycnId={this.props.sycnId || null}
						data={this.props.data}
						margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
						<XAxis dataKey="time" interval={10} />
						<YAxis />
						<Tooltip />
						<CartesianGrid stroke="#f5f5f5" />
						<Line type="monotone" dataKey="pedestrian" stroke="#ff7300" />
						<Line type="monotone" dataKey="bicyclists" stroke="#565656" />
						<Legend />
					</LineChart>
				</ResponsiveContainer>
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