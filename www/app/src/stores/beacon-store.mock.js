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

module.exports = {
  mockApi: mockEstimoteBeaconsForDesktop
};
