/** @jsx React.DOM */

var React = require('react')
  , assetsPathMixin = require('./assets-path-mixin');

var SexIcon = React.createClass({
  mixins: [assetsPathMixin],
  render: function () {
    var style = {
      'vertical-align': 'top',
      'margin-left': '-15px'
    };

    return (
      <img width="50" style={style} src={this.getIconPath('sex-' + this.props.sex)} />
    );
  }
});

module.exports = SexIcon;
