/** @jsx React.DOM */

var React = require('react')
  , LocationStore = require('../../stores/location-store')
  , UserStore = require('../../stores/user-store')
  , actions = require('../../shared/actions')
  , Location = require('../location/location.jsx')
  , Modal = require('../modal/modal.jsx')
  , events = require('../../shared/constants').events
  , Mediator = require('../../shared/mediator')
  , swipable = require('./swipable');


UserStore.onCurrentUserUpdated(function () {
  var currentUser = UserStore.getCurrentUser();

  if (!currentUser) {
    Mediator.emit(events.SHOW_MODAL);
  } else {
    console.log('Current user is: ', currentUser);
  }
});

var App = React.createClass({

  mixins: [swipable],

  getInitialState: function () {
    return {
      locations: {}
    };
  },

  componentWillMount: function () {
    LocationStore.onLocationsUpdated(function () {
      var locations = LocationStore.getLocations();

      if (!locations) {
        throw new Error('LocationStore returned no locations');
      } else {
        this.setState({
          locations: locations
        });
      }
    }.bind(this));
  },

  componentDidUpdate: function () {
    var locations = this.getDOMNode().querySelectorAll('.location');
    this.setNumberOfPanes(locations.length);
  },

  componentDidMount: function () {
    this.swipableInit();
  },

  render: function () {
    var locations = Object.keys(this.state.locations).map(function (key, i) {
        return (<Location index={i} data={this.state.locations[key]} />);
    }.bind(this));

    return (
      <div className="app">
        {locations}
        <Modal />
      </div>
    );
  }

});

module.exports = App;
