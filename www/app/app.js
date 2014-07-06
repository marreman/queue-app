/** @jsx React.DOM */

var Hammer = require('hammerjs')
  , Location = require('./components/location.jsx')
  , React = require('react');

var current = {
  x: 0,
  y: 0
};
var app = document.querySelector('.app');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Location color="red" />
        <Location color="green" />
        <Location color="blue" />
      </div>
    );
  }
});

React.renderComponent(<App />, app);

var min = app.querySelectorAll('.location').length * window.innerWidth * -1;
var max = 0;

function move(x, y) {
  if (x !== undefined && (x === min || x > max)) {
    return;
  }

  current.x = x !== undefined ? x : current.x;
  current.y = y !== undefined ? y : current.y;
  app.style.webkitTransform = 'translate3d(' + current.x + 'px, ' + current.y + 'px, 0)';
}

Hammer(document.body).on('dragend', function (event) {
  switch (event.gesture.direction) {
  case 'up':
    move(undefined, window.innerHeight * -1); break;
  case 'down':
    move(undefined, 0); break;
  case 'left':
    move(current.x - window.innerWidth, undefined); break;
  case 'right':
    move(current.x + window.innerWidth, undefined); break;
  }
});
