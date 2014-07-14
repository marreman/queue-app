/** @jsx React.DOM */

var React = require('react')
  , assetsPathMixin = require('./assets-path-mixin');

var SexIcon = React.createClass({
  mixins: [assetsPathMixin],
  render: function () {
    return (
      <img width="50" src={this.getIconPath('sex-' + this.props.sex)} />
    );
  }
});

module.exports = SexIcon;
