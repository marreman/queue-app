/** @jsx React.DOM */

var React = require('react')
  , Icon = require('../icon.jsx')
  , Logo = require('./logo.jsx')
  , Mediator = require('../../shared/mediator')
  , events = require('../../shared/constants').events;

var LocationTop = React.createClass({

  componentDidMount: function () {
    var dots = this.getDOMNode().querySelectorAll('.location-dot');
    dots[this.props.index].classList.add('location-dot-current');
  },

  render: function () {
    return (
      <div className="location-part">
        <div className="location-top-bar">
          <span className="location-logo">
            <Logo locationKey={this.props.key} />
          </span>
          <a href className="location-info" onClick={this.showModal}>
            <Icon type="info" />
          </a>
        </div>
        <div className="location-eta">
          <div className="location-eta-label">Ungefärlig kötid:</div>
          <div className="location-eta-value">00:14</div>
        </div>
        <div className="location-bottom-bar">
          <div className="location-dots text-center">
            <span className="location-dot"></span>
            <span className="location-dot"></span>
            <span className="location-dot"></span>
          </div>
          <div className="location-white-bar location-number-of-people text-center">
            46 st
            <span className="text-light"> sköna katter före dig</span>
            <div className="location-arrow">
              <Icon type="arrow" />
            </div>
          </div>
        </div>
      </div>
    );
  },

  showModal: function (event) {
    event.preventDefault();
    Mediator.emit(events.SHOW_MODAL);
  }

});

module.exports = LocationTop;
