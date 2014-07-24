/** @jsx React.DOM */

var React = require('react')
  , assetsPathMixin = require('../assets-path-mixin')
  , LocationTop = require('./location-top.jsx')
  , LocationBottom = require('./location-bottom.jsx');

var Location = React.createClass({
  mixins: [assetsPathMixin],
  render: function () {
    var bgUrl = this.getLocationPath(this.props.data.key) + '/background.jpg'
      , style = {
        backgroundImage: 'url(' + bgUrl + ')'
      };

    return (
      <div className="location" style={style}>
        <LocationTop key={this.props.data.key}
                     index={this.props.index}
                     eta={this.props.data.eta} />
        <LocationBottom />
      </div>
    );
  }
});

module.exports = Location;
