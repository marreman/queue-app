/** @jsx React.DOM */

var React = require('react')
  , assetsPathMixin = require('../assets-path-mixin');

var CloseIcon = React.createClass({
  mixins: [assetsPathMixin],
  render: function () {
    return (
      <img width="22" src={this.getIconPath('close')} />
    );
  }
});

module.exports = CloseIcon;
