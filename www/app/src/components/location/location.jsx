/** @jsx React.DOM */

var React = require('react')
  , assetsPathMixin = require('../assets-path-mixin')
  , LocationTop = require('./location-top.jsx')
  , LocationBottom = require('./location-bottom.jsx');

var Location = React.createClass({
  mixins: [assetsPathMixin],
  render: function () {
    var currentStatus = this.props.data.currentStatus || {}

      , estimatedQueueTime = currentStatus.estimatedQueueTime
      , numberOfMales = currentStatus.numberOfMales
      , numberOfFemales = currentStatus.numberOfFemales
      , numberOfTrans = currentStatus.numberOfTrans
      , numberOfVisitors = numberOfMales + numberOfFemales

      , style = {
        backgroundImage: 'url(' + this.getLocationPath(this.props.data.key) + '/background.jpg' + ')'
      };

    return (
      <div className="location" style={style}>

        <LocationTop key={this.props.data.key}
                     index={this.props.index}
                     eta={estimatedQueueTime}
                     numberOfVisitors={numberOfVisitors} />

        <LocationBottom males={numberOfMales}
                        females={numberOfFemales}
                        trans={numberOfTrans}
                        total={numberOfVisitors} />

      </div>
    );
  }
});

module.exports = Location;
