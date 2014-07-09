/** @jsx React.DOM */

var React = require('react')
  , config = require('../../shared/config');

var ArrowIcon = React.createClass({
  render: function () {
    var style = {}
      , src = config.assetsPath + '/icon-arrow.png';

    if (this.props.direction === 'up') {
      style['-webkit-transform'] = 'rotate(180deg)';
    }

    return (
      <img width="32" style={style} src={src} />
    );
  }
});

module.exports = ArrowIcon;
