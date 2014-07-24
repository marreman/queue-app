var device = require('../shared/device')
  , EventEmitter = require('events').EventEmitter;

var currentBeacon = {}
  , events = new EventEmitter()
  , NEW_CLOSEST_BEACON_EVENT = 'NEW_CLOSEST_BEACON_EVENT';

if (!window.EstimoteBeacons) {
  mockEstimoteBeaconsForDesktop();
}


function mockEstimoteBeaconsForDesktop() {
  var beacons = [
    {
      "isConnected":false,
      "proximity":2,
      "description":"<ESTBeacon: 0x165d1860>",
      "debugDescription":"<ESTBeacon: 0x165d1860>",
      "rssi":-77,
      "proximityUUID":"B9407F30-F5F8-466E-AFF9-25556B57FE6D",
      "distance":1.32927555957745,
      "minor":33634,
      "major":61693
    },
    {
      "isConnected":false,
      "proximity":2,
      "description":"<ESTBeacon: 0x165bd940>",
      "debugDescription":"<ESTBeacon: 0x165bd940>",
      "rssi":-70,
      "proximityUUID":"B9407F30-F5F8-466E-AFF9-25556B57FE6D",
      "distance":2.6300233029461665,
      "minor":26692,
      "major":30262
    },
    {
      "isConnected":false,
      "proximity":3,
      "description":"<ESTBeacon: 0x165c9e90>",
      "debugDescription":"<ESTBeacon: 0x165c9e90>",
      "rssi":-78,
      "proximityUUID":"B9407F30-F5F8-466E-AFF9-25556B57FE6D",
      "distance":2.106791487321135,
      "minor":43187,
      "major":7866
    }
  ];
  window.EstimoteBeacons = {
    startRangingBeaconsInRegion: function (callback) {
      callback();
    },
    getBeacons: function (callback) {
      callback(beacons);
    }
  };
}

function handleGetBeacons(beaconsData) {
  if (!beaconsData[0]) {
    return null;
  }

  var beacons = beaconsData.map(function (beacon) {
    return {
      id: beacon.major + '-' + beacon.minor,
      distance: beacon.distance
    };
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
