var EventEmitter = require('events').EventEmitter
  , firebase = require('../shared/firebase')
  , dispatcher = require('../shared/dispatcher')
  , actionTypes = require('../shared/constants').actionTypes;

var events = new EventEmitter()
  , ref = firebase.getReference('users')
  , CURRENT_USER_UPDATED_EVENT = 'current-user-updated-event'
  , currentUser = {};

var currentUserId = 123; // should be device uuid or other

function createUser(gender) {
  ref.child(currentUserId).set({
    gender: gender
  });
}

ref.child(currentUserId).on('value', function (snap) {
  currentUser = snap.val();
  events.emit(CURRENT_USER_UPDATED_EVENT);
});

dispatcher.register(function (payload) {
  switch (payload.actionType) {
    case actionTypes.USER_CREATE:
      createUser(payload.gender);
      break;
  }
});

module.exports = {
  getCurrentUser: function () {
    return currentUser;
  },
  onCurrentUserUpdated: function (callback) {
    events.on(CURRENT_USER_UPDATED_EVENT, callback);
  }
};

