var _registry = [];

module.exports = {

  register: function (callback) {
    _registry.push(callback);
  },

  dispatch: function (payload) {
    _registry.forEach(function (callback) {
      callback(payload);
    });
  }

};

