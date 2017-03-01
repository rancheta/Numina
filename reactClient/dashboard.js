var React = require('react')
var ReactDOM = require('react-dom')
var Dashboard = require('./pages/Dashboard.jsx')

var mountNode = document.getElementById('app');

ReactDOM.render(<Dashboard />, mountNode);