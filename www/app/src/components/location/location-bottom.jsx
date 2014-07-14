/** @jsx React.DOM */

var React = require('react')
  , Icon = require('../icon.jsx');

var LocationBottom = React.createClass({
  render: function () {
    return (
      <div className="location-part">
        <div className="location-number-of-people text-center">
          <div className="location-arrow">
            <Icon type="arrow" direction="up" />
          </div>
          46 st
          <span className="text-light"> sköna katter före dig</span>
        </div>
        <div className="location-gender-distribution">
          <div className="location-gender">
            18 <Icon type="sex" mod="male" />
          </div>
          <div className="location-gender">
            22 <Icon type="sex" mod="female" />
          </div>
          <div className="location-gender">
            4 <Icon type="sex" mod="trans" />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LocationBottom;
