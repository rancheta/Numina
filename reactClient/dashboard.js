var React = require('react')
var ReactDOM = require('react-dom')
var Dashboard = require('./pages/Dashboard.jsx')

var mountNode = document.getElementById('app');
var serverProps = JSON.parse(document.getElementById('serverProps').innerHTML);

ReactDOM.render(<Dashboard counts={serverProps.counts} meta={serverProps.meta} />, mountNode);