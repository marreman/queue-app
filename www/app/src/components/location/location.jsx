/** @jsx React.DOM */

var React = require('react')
  , config = require('../../shared/config')
  , LocationTop = require('./location-top.jsx')
  , LocationBottom = require('./location-bottom.jsx');

var Location = React.createClass({
  render: function () {
    var bgUrl = config.assetsPath + '/' +  this.props.data.key + '/background.jpg'
      , style = {
        backgroundImage: 'url(' + bgUrl + ')'
      };

    return (
      <div className="location" style={style}>
        <LocationTop key={this.props.data.key} index={this.props.index} />
        <LocationBottom />
      </div>
    );
  }
});

module.exports = Location;
