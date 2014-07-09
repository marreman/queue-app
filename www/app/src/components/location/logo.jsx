/** @jsx React.DOM */

var React = require('react');

var Logo = React.createClass({
  render: function () {
    var url = 'app/assets/' +  this.props.locationKey + '/logo.png';
    return (
      <img width="145" src={url} />
    );
  }
});

module.exports = Logo;
