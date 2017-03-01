var React = require('react')
var LineChart = require('recharts').LineChart
var XAxis = require('recharts').XAxis
var YAxis = require('recharts').YAxis
var Tooltip = require('recharts').Tooltip
var CartesianGrid = require('recharts').CartesianGrid
var Line = require('recharts').Line
var exEnv = require('exenv')

var NuLineChart = React.createClass({

	render: function() {
		if (this.props.data){
			return (
				<LineChart
				  data={this.props.data}
				  width={730} height={250}
				  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
				>
				  <XAxis dataKey="time" />
				  <YAxis dataKey="count" />
				  <Tooltip />
				  <CartesianGrid stroke="#f5f5f5" />
				  <Line type="monotone" dataKey="bicyclists" stroke="#ff7300" yAxisId={0} />
				  <Line type="monotone" dataKey="pedestrian" stroke="#387908" yAxisId={1} />
				</LineChart>
			)
		} else {
			return (
				<h5>No Data</h5>
			)
		}
	}
})

module.exports = NuLineChart