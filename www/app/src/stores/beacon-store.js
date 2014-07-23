var device = require('../shared/device');


module.exports = {
  searchForBeacon: fun
  getClosestBeacon: function () {
    return {
      id: 123
    };
  }
};

device.onReady(function () {
  window.EstimoteBeacons.startRangingBeaconsInRegion(function () {
    window.setInterval(function () {
      window.EstimoteBeacons.getBeacons(function (data) {
        console.log(data);
      });
    }, 1000);
  });
});
