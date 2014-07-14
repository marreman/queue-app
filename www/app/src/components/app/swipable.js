var Hammer = require('hammerjs');

var current = { x: 0, y: 0 }
  , min = 0
  , max = 0;

module.exports = {
  swipableInit: function () {
    Hammer(document.body).on('dragend', this.handleDragend);
  },
  setNumberOfPanes: function (n) {
    min = n * window.innerWidth * -1;
  },
  handleDragend: function (event) {
    event.gesture.preventDefault();
    switch (event.gesture.direction) {
    case 'up':
      this.move(undefined, window.innerHeight * -1); break;
    case 'down':
      this.move(undefined, 0); break;
    case 'left':
      this.move(current.x - window.innerWidth, undefined); break;
    case 'right':
      this.move(current.x + window.innerWidth, undefined); break;
    }
  },
  move: function (x, y) {
    var tpl = 'translate3d(%xpx, %ypx, 0)';
    // don't move if we're about to move past the last
    // location or before the first
    if (x !== undefined && (x === min || x > max)) {
      return;
    }

    current.x = x !== undefined ? x : current.x;
    current.y = y !== undefined ? y : current.y;
    this.getDOMNode().style.webkitTransform = tpl
      .replace('%x', current.x)
      .replace('%y', current.y);
  }
};
