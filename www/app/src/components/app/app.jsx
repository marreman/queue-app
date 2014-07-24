/** @jsx React.DOM */

var React = require('react')
  , LocationStore = require('../../stores/location-store')
  , UserStore = require('../../stores/user-store')
  , BeaconStore = require('../../stores/beacon-store')
  , Location = require('../location/location.jsx')
  , Modal = require('../modal/modal.jsx')
  , events = require('../../shared/constants').events
  , Mediator = require('../../shared/mediator')
  , swipable = require('./swipable');


var App = React.createClass({

  mixins: [swipable],

  getInitialState: function () {
    return {
      locations: {}
    };
  },

  componentWillMount: function () {
    UserStore.onCurrentUserUpdated(this.handleCurrentUserUpdate);
    LocationStore.onLocationsUpdated(this.handleLocationsUpdate);
    BeaconStore.onNewClosestBeacon(this.handleNewClosestBeacon);
  },

  handleCurrentUserUpdate: function () {
    var currentUser = UserStore.getCurrentUser();

    if (!currentUser) {
      Mediator.emit(events.SHOW_MODAL);
    }
  },

  handleLocationsUpdate: function () {
    var locations = LocationStore.getLocations();

    if (!locations) {
      throw new Error('LocationStore returned no locations');
    } else {
      this.setState({
        locations: locations
      });
      this.switchToClosestLocation();
    }
  },

  handleNewClosestBeacon: function () {
    this.closestBeacon = BeaconStore.getCurrentBeacon();
    this.switchToClosestLocation();
  },

  switchToClosestLocation: function () {
    if (this.state.locations && this.closestBeacon) {
      var locationIndex = Object.keys(this.state.locations).indexOf(this.closestBeacon.id);
      this.moveTo(locationIndex);
    }
  },

  componentDidUpdate: function () {
    var locations = this.getDOMNode().querySelectorAll('.location');
    this.setNumberOfPanes(locations.length);
  },

  componentDidMount: function () {
    this.swipableInit();
  },

  render: function () {
    var locationKeys = Object.keys(this.state.locations);

    return (
      <div className="app">
        {locationKeys.map(this.createLocationComponent)}
        <Modal />
      </div>
    );
  },

  createLocationComponent: function (key, i) {
    var location = this.state.locations[key];
    return (<Location key={location.key} index={i} data={location} />);
  }

});

module.exports = App;
