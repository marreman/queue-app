/** @jsx React.DOM */

var React = require('react')
  , InfoIcon = require('./info-icon.jsx')
  , ArrowIcon = require('./arrow-icon.jsx')
  , Logo = require('./logo.jsx');

var LocationTop = React.createClass({
  render: function () {
    return (
      <div className="location-part">
        <div className="location-top-bar">
          <span className="location-logo">
            <Logo locationKey={this.props.key} />
          </span>
          <span className="location-info">
            <InfoIcon />
          </span>
        </div>
        <div className="location-eta">
          <div className="location-eta-label">Ungefärlig kötid:</div>
          <div className="location-eta-value">00:14</div>
        </div>
        <div className="location-dots text-center">
          <span className="location-dot location-dot-current"></span>
          <span className="location-dot"></span>
          <span className="location-dot"></span>
        </div>
        <div className="location-bottom-bar">
          <div className="location-number-of-people text-center">
            46 st
            <span className="text-light"> sköna katter före dig</span>
            <div className="location-arrow">
              <ArrowIcon />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LocationTop;
