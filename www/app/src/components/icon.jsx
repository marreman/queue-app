/** @jsx React.DOM */

var React = require('react')
  , assetsPathMixin = require('./assets-path-mixin');

var iconStyles = {
  close: {
    width: 22
  },
  gender: {
    width: 50
  },
  info: {
    width: 31
  },
  arrow: {
    width: 32
  }
};

var Icon = React.createClass({
  mixins: [assetsPathMixin],
  render: function () {
    var type = this.props.type
      , mod = this.props.mod ? '-' + this.props.mod : ''
      , src = this.getIconPath(type + mod)
      , style = iconStyles[type];

    if (this.props.direction === 'up') {
      style['-webkit-transform'] = 'rotate(180deg)';
    }

    return (
      <img style={style} src={src} />
    );
  }
});

module.exports = Icon;
