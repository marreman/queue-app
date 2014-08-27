module.exports = {
  millisecondsToHoursAndMinutes: function (milliseconds) {
    var minutes = (milliseconds / 1000 / 60).toFixed().toString();
    return minutes.length === 1 ? '0' + minutes : minutes;
  }
};
