var Hammer = require('hammerjs');

var current = { x: 0, y: 0, paneNumber: 0 }
  , win = { width: 0, height: 0 }
  , min = 0
  , max = 0;

module.exports = {

  swipableInit: function () {
    Hammer(document.body).on('dragend', this.handleDragend);
    win.width = window.innerWidth;
    win.height = window.innerHeight;
  },

  setNumberOfPanes: function (n) {
    min = n * win.width * -1;
  },

  handleDragend: function (event) {
    event.gesture.preventDefault();

    switch (event.gesture.direction) {
    case 'left':
      this.moveTo(current.paneNumber + 1, undefined); break;
    case 'right':
      this.moveTo(current.paneNumber - 1, undefined); break;
    case 'up':
      this.moveUp(); break;
    case 'down':
      this.moveDown(); break;
    }
  },

  moveTo: function (paneNumber) {
    var goal = win.width * paneNumber * -1;

    if (this.move(goal, undefined)) {
      current.paneNumber = paneNumber;
    }
  },

  toggleVertical: function () {
    this[this.isUp ? 'moveDown' : 'moveUp']();
  },

  moveUp: function () {
    this.move(undefined, win.height * -1);
    this.isUp = true;
  },

  moveDown: function () {
    this.move(undefined, 0);
    this.isUp = false;
  },

  move: function (x, y) {
    var tpl = 'translate3d(%xpx, %ypx, 0)';

    // don't move if we're about to move past the last
    // location or before the first
    if (x !== undefined && (x <= min || x > max)) {
      return false;
    }

    current.x = x !== undefined ? x : current.x;
    current.y = y !== undefined ? y : current.y;
    this.getDOMNode().style.webkitTransform = tpl
      .replace('%x', current.x)
      .replace('%y', current.y);

    return true;
  }

};
