var Firebase = require('client-firebase');

var root = new Firebase('https://queue-app.firebaseio.com/');

var api = {
  getReference: function (path) {
    return root.child(path);
  }
};

module.exports = api;
