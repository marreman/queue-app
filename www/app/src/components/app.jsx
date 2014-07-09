/** @jsx React.DOM */

var Hammer = require('hammerjs')
  , React = require('react')
  , LocationStore = require('../shared/location-store')
  , Location = require('./location/location.jsx');

var current = { x: 0, y: 0 }
  , min = 0
  , max = 0;

var App = React.createClass({

  getInitialState: function () {
    return {
      locations: {}
    };
  },

  componentWillMount: function () {
    LocationStore.onLocationsUpdated(function () {
      this.setState({
        locations: LocationStore.getLocations()
      });
    }.bind(this));
  },

  componentDidUpdate: function () {
    var locations = this.getDOMNode().querySelectorAll('.location');
    min = locations.length * window.innerWidth * -1;
  },

  componentDidMount: function () {
    Hammer(document.body).on('dragend', function (event) {
      event.gesture.preventDefault();
      switch (event.gesture.direction) {
      case 'up':
        this.move(undefined, window.innerHeight * -1); break;
      case 'down':
        this.move(undefined, 0); break;
      case 'left':
        this.move(current.x - window.innerWidth, undefined); break;
      case 'right':
        this.move(current.x + window.innerWidth, undefined); break;
      }
    }.bind(this));
  },

  render: function () {
    var locations = Object.keys(this.state.locations).map(function (key) {
        return (<Location data={this.state.locations[key]} />);
    }.bind(this));

    return (
      <div className="app">{locations}</div>
    );
  },

  move: function (x, y) {
    var tpl = 'translate3d(%xpx, %ypx, 0)';
    // don't move if we're about to move past the last
    // location or before the first
    if (x !== undefined && (x === min || x > max)) {
      return;
    }

    current.x = x !== undefined ? x : current.x;
    current.y = y !== undefined ? y : current.y;
    this.getDOMNode().style.webkitTransform = tpl
      .replace('%x', current.x)
      .replace('%y', current.y);
  }

});

module.exports = App;
