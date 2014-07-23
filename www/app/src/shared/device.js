var DESKTOP_DEV_DEVICE_ID = 123;

module.exports = {
  onReady: function (callback) {
    if (window.cordova) {
      document.addEventListener('deviceready', function () {
        callback(window.device);
      }, false);
    } else {
      callback({ uuid: DESKTOP_DEV_DEVICE_ID });
    }
  }
};
