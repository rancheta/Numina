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
      counts: this.props.counts || [],
      meta: this.props.meta || {},
      isRendering: false,
      autoSync: true,
      syncId: null
    }
  },

  componentDidMount: function() {
    var self = this
    var syncId = setInterval(function(){
      if (self.state.autoSync) {
        self.getCountData()
      };
    }, 7000);
    this.setState({syncId: syncId});
  },

  // Instead of using an action/reducer or dispatcher implementation I kinda like
  // to update state by copying and creating a new state using the update addon or Object.assign for small projects
  getCountData : function() {
    var self = this
    if (this.state.isRendering) return;
    actions.loadCountData(function(err, countData) {
      var sortDataByDate = actions.sortDataByDate(countData.body.result)
      var updatedCountState = update(self.state, {$merge: { counts: sortDataByDate } });
      self.replaceState(updatedCountState)
    })
  },

  render : function() {
    var allDataD3 = this.state.counts ? actions.secsToMinsD3Transform(this.state.counts) : []
    return (
      <main>

        <Header state={this.state} 
                toggleSync={() => this.setState({ autoSync: !this.state.autoSync })} 
                autoSync={this.state.autoSync} />

        <div className="container">
          <div className="row main">
            <div className="col-sm-12 col">
              <CombinedChart  title="# of bicyclists and pedestrians by minute"
                              meta={this.state.meta}
                              syncId="CountsBaby" 
                              data={allDataD3}  />                  
            </div>
            <div className="col-md-6 col-sm-12 col">
              <LineChart      title="# of pedestrians by minute"
                              meta={this.state.meta}
                              syncId="CountsBaby" 
                              stroke="#4DB9E0" 
                              dataKey="pedestrian" 
                              data={allDataD3}  />                  
            </div>
            <div className="col-md-6 col-sm-12 col">
              <LineChart      title="# of bicyclists by minute"
                              meta={this.state.meta}
                              syncId="CountsBaby" 
                              stroke="#49C983" 
                              dataKey="bicyclists" 
                              data={allDataD3}  />                  
            </div>
            <div className="col-sm-12 col">
              <LineChart      title="Total # of pedestrians and bicyclists"
                              meta={this.state.meta}
                              syncId="CountsBaby" 
                              stroke="#222222" 
                              dataKey="total" 
                              data={allDataD3}  />                  
            </div>
          </div>
          <p style={{ color: '#FFF' }}> Please hire me</p>
        </div>
      </main>
    )
  }
})

module.exports = Dashboard

