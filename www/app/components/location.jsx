/** @jsx React.DOM */

var React = require('react');

var Location = React.createClass({
  render: function () {

    return (
        <div className={"location location-" + this.props.data.key}>
          <div className="location-part">
            <h1>{this.props.data.name}</h1>
          </div>
          <div className="location-part">
            <p>This is the bottom part of a location</p>
          </div>
        </div>
    );
  }
});

module.exports = Location;
