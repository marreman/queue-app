/** @jsx React.DOM */

var React = require('react')
  , assetsPathMixin = require('../assets-path-mixin')
  , LocationTop = require('./location-top.jsx')
  , LocationBottom = require('./location-bottom.jsx');

var Location = React.createClass({
  mixins: [assetsPathMixin],
  render: function () {
    var bgUrl = this.getLocationPath(this.props.data.key) + '/background.jpg'
      , visitors = this.props.data.visitors
      , numberOfVisitors = visitors.males + visitors.females
      , style = {
        backgroundImage: 'url(' + bgUrl + ')'
      };

    return (
      <div className="location" style={style}>
        <LocationTop key={this.props.data.key}
                     index={this.props.index}
                     eta={this.props.data.eta}
                     numberOfVisitors={numberOfVisitors} />
        <LocationBottom visitors={this.props.data.visitors} />
      </div>
    );
  }
});

module.exports = Location;
