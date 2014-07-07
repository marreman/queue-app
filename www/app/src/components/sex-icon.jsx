/** @jsx React.DOM */

var React = require('react');

var SexIcon = React.createClass({
  render: function () {
    var src = "app/assets/icon-sex-" + this.props.sex + ".png"
      , style = {
        'vertical-align': 'top',
        'margin-left': '-15px'
      };
    return (
      <img width="50" style={style} src={src} />
    );
  }
});

module.exports = SexIcon;
