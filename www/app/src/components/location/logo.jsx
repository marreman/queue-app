/** @jsx React.DOM */

var React = require('react')
  , assetsPathMixin = require('./assets-path-mixin');

var Logo = React.createClass({
  mixins: [assetsPathMixin],
  render: function () {
    var url = this.getLocationPath(this.props.locationKey) + '/logo.png';

    return (
      <img width="145" src={url} />
    );
  }
});

module.exports = Logo;
