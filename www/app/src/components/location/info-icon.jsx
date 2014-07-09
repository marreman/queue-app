/** @jsx React.DOM */

var React = require('react')
  , config = require('../../shared/config');

var InfoIcon = React.createClass({
  render: function () {
    var src = config.assetsPath + '/icon-info.png';

    return (
      <img width="31" src={src} />
    );
  }
});

module.exports = InfoIcon;
