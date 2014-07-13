var constants = require('../../shared/constants');

module.exports = {
  getIconPath: function (iconName) {
    return constants.assetsPath + '/icon-' + iconName + '.png';
  },
  getLocationPath: function (locationName) {
    return constants.assetsPath + '/' + locationName;
  }
};
