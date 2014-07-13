var dispatcher = require('./dispatcher')
  , actionTypes = require('./constants').actionTypes;

module.exports = {

  createUser: function (sex) {
    dispatcher.dispatch({
      actionType: actionTypes.USER_CREATE,
      sex: sex
    });
  }

};

