/** @jsx React.DOM */

var React = require('react')
  , assetsPathMixin = require('./assets-path-mixin');

var InfoIcon = React.createClass({
  mixins: [assetsPathMixin],
  render: function () {
    return (
      <img width="31" src={this.getIconPath('info')} />
    );
  }
});

module.exports = InfoIcon;
