document.addEventListener('deviceready', function () {
  window.EstimoteBeacons.startRangingBeaconsInRegion(function () {
    setInterval(function () {
      window.EstimoteBeacons.getBeacons(function (data) {
        console.log(data);
      });
    }, 1000);
  });
}, false);
