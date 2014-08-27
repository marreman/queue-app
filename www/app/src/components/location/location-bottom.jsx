/** @jsx React.DOM */

var React = require('react')
  , Icon = require('../icon.jsx')
  , Mediator = require('../../shared/mediator')
  , events = require('../../shared/constants').events;

var LocationBottom = React.createClass({

  render: function () {
    return (
      <div className="location-part">
        <div className="location-number-of-people text-center"
             onTouchEnd={this.onLocationBarClick}>
          <div className="location-arrow">
            <Icon type="arrow" direction="up" />
          </div>
          {this.props.total} st
          <span className="text-light"> Mänskliga antenner</span>
        </div>
        <div className="location-gender-distribution">
          <div className="location-gender">
            {this.props.males} <Icon type="gender" mod="male" />
          </div>
          <div className="location-gender">
            {this.props.females} <Icon type="gender" mod="female" />
          </div>
          <div className="location-gender">
            {this.props.trans} <Icon type="gender" mod="trans" />
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
