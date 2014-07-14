var dispatcher = require('./dispatcher')
  , actionTypes = require('./constants').actionTypes;

module.exports = {

  createUser: function (gender) {
    dispatcher.dispatch({
      actionType: actionTypes.USER_CREATE,
      gender: gender
    });
  }

};

