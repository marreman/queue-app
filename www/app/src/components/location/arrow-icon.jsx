/** @jsx React.DOM */

var React = require('react')
  , assetsPathMixin = require('./assets-path-mixin');

var ArrowIcon = React.createClass({
  mixins: [assetsPathMixin],
  render: function () {
    var style = {};

    if (this.props.direction === 'up') {
      style['-webkit-transform'] = 'rotate(180deg)';
    }

    return (
      <img width="32" style={style} src={this.getIconPath('arrow')} />
    );
  }
});

module.exports = ArrowIcon;
