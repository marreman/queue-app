var EventEmitter = require('events').EventEmitter
  , firebase = require('./firebase');

var locations = {}
  , ref = firebase.getReference('locations')
  , events = new EventEmitter()
  , LOCATIONS_UPDATED_EVENT = 'locations-updated-event';

ref.on('value', function (snap) {
  locations = snap.val();
  events.emit(LOCATIONS_UPDATED_EVENT);
});

module.exports = {
  getLocations: function () {
    return locations;
  },
  onLocationsUpdated: function (callback) {
    events.on(LOCATIONS_UPDATED_EVENT, callback)
  }
};

