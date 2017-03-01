var React = require('react')
var Header = require('../components/Header.jsx')
var LineChart = require('../components/LineCharts.jsx').LineChart
var CombinedChart = require('../components/LineCharts.jsx').CombinedLine
var update = require('react-addons-update')
var actions = require('../actions/index.js')

var Dashboard = React.createClass({

  // Initial State = singular state for this page
  // I've found that storing information in one singular isomorphic container per page
  // is simpler and easier to follow than a more complicated singular state across an 
  // entire application using routing, still actions are defined elsewhere and reducing is 
  // simply invoking this.setState/replaceState using the update addon
  getInitialState : function() {
    return {
      counts: [],
      meta: {},
      isRendering: false
    }
  },

  shouldComponentUpdate : function (nextProps, nextState) {
    if (this.state.counts !== nextState.counts) {
      return true
    } else {
      return false
    }
  },

  // Instead of using an action/reducer or dispatcher implementation I kinda like
  // to update state by copying and creating a new state using the update addon or Object.assign for small projects
  getCountData : function() {
    var self = this
    if (this.state.isRendering) return;
    this.setState({ isRendering : true })
    console.log('isrendering')
    actions.loadCountData(function(err, countData) {
      var sortDataByDate = actions.sortDataByDate(countData.body.result)
      var updatedCountState = update(self.state, {$merge: { counts: sortDataByDate, isRendering: false } });
      console.log('finished')
      self.replaceState(updatedCountState)
    })
  },

  render : function() {
    var allDataD3 = this.state.counts ? actions.secsToMinsD3Transform(this.state.counts) : []
    return (
      <main>

        <Header state={this.state} />

        <div className="container">
          <div className="row main">
            <h1>Dashboard</h1>
            <p style={this.state.isRendering ? {} : {display:'none'}}> Rendering </p>
            <div className="col-sm-12 col">
              <CombinedChart syncId={0} data={allDataD3}  />                  
            </div>
            <div className="col-md-6 col">
              <LineChart syncId={0} dataKey="pedestrian" data={allDataD3}  />                  
            </div>
            <div className="col-md-6 col">
              <LineChart syncId={0} dataKey="bicyclists" data={allDataD3}  />                  
            </div>
            <div className="col-sm-12 col">
              <LineChart syncId={0} dataKey="total" data={allDataD3}  />                  
            </div>
            <button onClick={() => this.getCountData()}>update</button>
          </div>
        </div>

      </main>
    )
  }
})

module.exports = Dashboard

