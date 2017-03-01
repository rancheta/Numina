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
      isPlainView: true,
      numinaId: null,
      numinaHeartRate: 5000
    }
  },

  componentDidMount: function() {
    this.heartbeat()
  },

  heartbeat: function(){
    var self = this
    var numinaId = setInterval(function(){
        self.getCountData()
    }, this.state.numinaHeartRate);
    this.setState({numinaId: numinaId});
  },

  // Instead of using an action/reducer or dispatcher implementation I kinda like
  // to update state by copying and creating a new state using the update addon or Object.assign for small projects
  getCountData : function() {
    var self = this
    if (this.state.isRendering) return;
    actions.loadCountData(function(err, countData) {
      if (err) {console.log(err); return;};
      var sortDataByDate = actions.sortDataByDate(countData.body.result)
      var updatedCountState = update(self.state, {$merge: { counts: sortDataByDate, meta: countData.body.meta || this.state.meta } });
      self.replaceState(updatedCountState)
    })
  },

  toggleNumina : function() {
    this.setState({ isPlainView: !this.state.isPlainView})
    window.clearInterval(this.state.numinaId)
    this.heartbeat()
  },

  render : function() {
    var allDataD3 = this.state.counts ? actions.secsToMinsD3Transform(this.state.counts) : []
    return (
      <main>

        <Header state={this.state} 
                toggleSync={() => this.toggleNumina() } 
                isPlainView={this.state.isPlainView} />

        <div className="container">
          <div className="row main">
            <div className="col-sm-12 col">
              {/* defining props versus droping in state and adding a shouldComponentUpdate is also a style thing */}
              <CombinedChart  title="# of bicyclists and pedestrians by minute"
                              meta={this.state.meta}
                              isPlainView={this.state.isPlainView}
                              syncId="CountsBaby" 
                              data={allDataD3}  />                  
            </div>
            <div className="col-md-6 col-sm-12 col">
              <LineChart      title="# of pedestrians by minute"
                              meta={this.state.meta}
                              syncId="CountsBaby" 
                              isPlainView={this.state.isPlainView}
                              stroke={ this.state.isPlainView ? "#4DB9E0" : "#ea3788" } 
                              dataKey="pedestrian" 
                              data={allDataD3}  />                  
            </div>
            <div className="col-md-6 col-sm-12 col">
              <LineChart      title="# of bicyclists by minute"
                              meta={this.state.meta}
                              syncId="CountsBaby" 
                              isPlainView={this.state.isPlainView}
                              stroke={ this.state.isPlainView ? "#49C983" : "#ea3788" } 
                              dataKey="bicyclists" 
                              data={allDataD3}  />                  
            </div>
            <div className="col-sm-12 col">
              <LineChart      title="Total # of pedestrians and bicyclists"
                              meta={this.state.meta}
                              syncId="CountsBaby" 
                              isPlainView={this.state.isPlainView}
                              stroke={ this.state.isPlainView ? "#222" : "#ea3788" } 
                              dataKey="total" 
                              data={allDataD3}  />                  
            </div>
          </div>
          <p className="hire-me" onClick={() => this.toggleNumina()}> Please hire me &#9825;</p>
        </div>
      </main>
    )
  }
})

module.exports = Dashboard

