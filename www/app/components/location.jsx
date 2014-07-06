/** @jsx React.DOM */

var React = require('react');

var Location = React.createClass({
  render: function () {
    return (
        <div className="location">
          <div className={'pane pane-' + this.props.color}>
          </div>
          <div className="pane pane-blue">
          </div>
        </div>
    );
  }
});

module.exports = Location;
