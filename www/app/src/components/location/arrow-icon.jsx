/** @jsx React.DOM */

var React = require('react');

var ArrowIcon = React.createClass({
  render: function () {
    var style = {};

    if (this.props.direction === 'up') {
      style['-webkit-transform'] = 'rotate(180deg)';
    }

    return (
      <img width="32" style={style} src="app/assets/icon-arrow.png" />
    );
  }
});

module.exports = ArrowIcon;
