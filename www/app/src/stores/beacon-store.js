var device = require('../shared/device')
  , firebase = require('../shared/firebase')
  , EventEmitter = require('events').EventEmitter;

var currentBeacon = {}
  , events = new EventEmitter()
  , ref = firebase.getReference('queueSessions')
  , NEW_CLOSEST_BEACON_EVENT = 'NEW_CLOSEST_BEACON_EVENT';

if (!window.EstimoteBeacons) {
  var EstimoteMock = require('./beacon-store.mock');
  EstimoteMock.mockApi();
}

var beaconList = {}
  , SESSION_END_THRESHOLD = 1.5;

function Beacon() {
  this.enteredZoneAt = new Date().getTime();
}

Beacon.prototype.update = function (data) {
  this.id = data.major + '-' + data.minor;
  this.distance = data.distance;

  if (!this.sessionRef && this.distance < SESSION_END_THRESHOLD) {
    this.endSession();
  }

  return this;
};

Beacon.prototype.endSession = function () {
  this.sessionRef = ref.child(this.id).push({
    start: this.enteredZoneAt,
    end: new Date().getTime()
  });
};

function handleGetBeacons(beaconsData) {
  if (!beaconsData[0]) {
    return null;
  }

  var beacons = beaconsData.map(function (data) {
    var id = data.major + '-' + data.minor
      , beacon = beaconList[id] || new Beacon();

    beaconList[id] = beacon;
    return beacon.update(data);
  }).sort(function (b1, b2) {
    return b1.distance - b2.distance;
  });

  var closestBeacon = beacons[0]
    , currentBeaconId = currentBeacon.id;

  currentBeacon = closestBeacon;

  if (closestBeacon.id !== currentBeaconId) {
    events.emit(NEW_CLOSEST_BEACON_EVENT);
  }
}

device.onReady(function () {
  window.EstimoteBeacons.startRangingBeaconsInRegion(function () {
    window.setInterval(function () {
      window.EstimoteBeacons.getBeacons(handleGetBeacons);
    }, 1000);
  });
});

module.exports = {
  onNewClosestBeacon: function (callback) {
    events.on(NEW_CLOSEST_BEACON_EVENT, callback);
  },
  getCurrentBeacon: function () {
    return currentBeacon;
  }
};
