/** @jsx React.DOM */

var React = require('react')
  , Icon = require('../icon.jsx')
  , Mediator = require('../../shared/mediator')
  , events = require('../../shared/constants').events;

var LocationBottom = React.createClass({

  render: function () {
    var visitors = this.props.visitors
      , numberOfVisitors = visitors.males + visitors.females;

    return (
      <div className="location-part">
        <div className="location-number-of-people text-center"
             onTouchEnd={this.onLocationBarClick}>
          <div className="location-arrow">
            <Icon type="arrow" direction="up" />
          </div>
          {numberOfVisitors} st
          <span className="text-light"> sköna katter före dig</span>
        </div>
        <div className="location-gender-distribution">
          <div className="location-gender">
            {visitors.males} <Icon type="gender" mod="male" />
          </div>
          <div className="location-gender">
            {visitors.females} <Icon type="gender" mod="female" />
          </div>
        </div>
      </div>
    );
  },

  onLocationBarClick: function (event) {
    event.preventDefault();
    Mediator.emit(events.LOCATION_BAR_CLICK);
  }

});

module.exports = LocationBottom;
