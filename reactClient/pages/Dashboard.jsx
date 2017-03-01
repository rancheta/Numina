var React = require('react')
var Header = require('../components/Header.jsx')
var LineChart = require('../components/LineChart.jsx')
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
      counts: this.props.counts || [],
      meta: this.props.meta || {},
      renderingChart: false
    }
  },

  getCountData : function() {
    var self = this
    if (!this.renderingChart) {
      this.setState({renderingChart: true})
      actions.loadCountData(function(err, countData) {
        var updatedCountState = update(self.state, {$merge: { counts: countData.body.result }});
        self.replaceState(updatedCountState)
      })
    };
  },

  render : function() {
    return (
      <main>

        <Header state={this.state} />

        <div className="container">
          <div className="row main">
            <h1>Dashboard</h1>
            <div className="col-12">
              <LineChart data={this.state.counts}  />                  
            </div>
            <div className="col-12">
              <LineChart  />                  
            </div>
            <button onClick={() => this.getCountData()}>update</button>
          </div>
        </div>

      </main>
    )
  }
})

module.exports = Dashboard

