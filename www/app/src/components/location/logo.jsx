/** @jsx React.DOM */

var React = require('react')
  , config = require('../../shared/config');

var Logo = React.createClass({
  render: function () {
    var url = config.assetsPath + '/' +  this.props.locationKey + '/logo.png';

    return (
      <img width="145" src={url} />
    );
  }
});

module.exports = Logo;
