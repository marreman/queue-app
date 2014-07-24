var moment = require('moment');

module.exports = {
  millisecondsToHoursAndMinutes: function (milliseconds) {
    var time = moment.duration(parseInt(milliseconds))
      , hours = time.get('hours').toString()
      , minutes = time.get('minutes').toString();

    hours = hours.length === 1 ? '0' + hours : hours;
    minutes = minutes.length === 1 ? '0' + minutes : minutes;

    return hours + ':' + minutes;
  }
};
