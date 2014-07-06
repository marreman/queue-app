var EventEmitter = require('events').EventEmitter
  , merge = require('react/lib/merge')
  , constants = require('./constants')
  , ref = require('./firebase').getReference('locations');

var locations = {}
  , api;

api = merge(EventEmitter.prototype, {
  getLocations: function () {
    return locations;
  }
});

ref.on('value', function (snap) {
  locations = snap.val();
  api.emit(constants.LOCATIONS_UPDATED_EVENT)
});

module.exports = api;
