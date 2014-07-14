var keyMirror = require('react/lib/keyMirror');

module.exports = {
  assetsPath: 'app/assets',
  actionTypes: keyMirror({
    USER_CREATE: null
  }),
  events: keyMirror({
    SHOW_MODAL: null
  })
};
