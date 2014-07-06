var $app = $('.app'),
  hApp = Hammer($app.get(0)),
  current = {
    position: {
      x: 0,
      y: 0
    },
    axis: null
  },
  xAndYRegex = /,\s([\-\d]*),\s([\-\d]*)\)$/;


function move(x, y) {
  x = x || current.position.x + 'px';
  y = y || current.position.y + 'px';
  $app.css('-webkit-transform', 'translate3d(' + x + ', ' + y + ', 0)');
}

hApp.on('dragstart', function (event) {
  var match = $app.css('-webkit-transform').match(xAndYRegex), // returns "matrix(1, 0, 0, 1, 0, 0)"
    dir = event.gesture.direction;

  current.position.x = match ? parseInt(match[1]) : 0
  current.position.y = match ? parseInt(match[2]) : 0
  current.axis = dir === 'up' || dir === 'down' ? 'vertical' : 'horizontal';

  $app.removeClass('app-transition');
});

hApp.on('dragdown dragup', function (event) {
  if (current.axis === 'vertical') {
    var value = event.gesture.deltaY + current.position.y;
    move(null, value + 'px');
  }
});

hApp.on('dragleft dragright', function (event) {
  if (current.axis === 'horizontal') {
    var value = event.gesture.deltaX + current.position.x;
    move(value + 'px', null);
  }
});

hApp.on('dragend', function (event) {
    $app.addClass('app-transition');

    switch (event.gesture.direction) {
      case 'up':
        move(null, '-100%'); break;
      case 'down':
        move(null, '0px'); break;
      case 'left':
        move('-100%', null); break;
      case 'right':
        move('0px', null); break;
    }
});
