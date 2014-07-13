var React = require('react')
  , App = require('./components/app/app.jsx');

document.addEventListener('deviceready', function () {
  console.log(device);
}, false);

React.renderComponent(App(), document.querySelector('.wrapper'));
