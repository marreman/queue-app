/** @jsx React.DOM */

var React = require('react')
  , LocationTop = require('./location-top.jsx')
  , LocationBottom = require('./location-bottom.jsx');

var Location = React.createClass({
  render: function () {
    var bgUrl = 'app/assets/' +  this.props.data.key + '/background.jpg'
      , style = {
        backgroundImage: 'url(' + bgUrl + ')'
      };

    return (
      <div className="location" style={style}>
        <LocationTop key={this.props.data.key} />
        <LocationBottom />
      </div>
    );
  }
});

module.exports = Location;
