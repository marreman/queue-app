/** @jsx React.DOM */

var React = require('react')
  , ArrowIcon = require('./arrow-icon.jsx')
  , SexIcon = require('../sex-icon.jsx');

var LocationBottom = React.createClass({
  render: function () {
    return (
      <div className="location-part">
        <div className="location-number-of-people text-center">
          <div className="location-arrow">
            <ArrowIcon direction="up" />
          </div>
          46 st
          <span className="text-light"> sköna katter före dig</span>
        </div>
        <div className="location-gender-distribution">
          <div className="location-gender">
            18 <SexIcon sex="male" />
          </div>
          <div className="location-gender">
            22 <SexIcon sex="female" />
          </div>
          <div className="location-gender">
            4 <SexIcon sex="trans" />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LocationBottom;
