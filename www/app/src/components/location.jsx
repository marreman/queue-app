/** @jsx React.DOM */

var React = require('react')
  , ArrowIcon = require('./arrow-icon.jsx')
  , InfoIcon = require('./info-icon.jsx')
  , SexIcon = require('./sex-icon.jsx');

var Location = React.createClass({
  render: function () {
    var assetsUrl = 'app/assets'
      , locationAssetsUrl = assetsUrl + '/' +  this.props.data.key
      , logoUrl = locationAssetsUrl + '/logo.png'
      , bgUrl = locationAssetsUrl + '/background.jpg'
      , style = {
        backgroundImage: 'url(' + bgUrl + ')'
      };

    return (
      <div className={"location location-" + this.props.data.key}
           style={style}>
        <div className="location-part">
          <div className="location-top-bar">
            <img className="location-logo" src={logoUrl} />
            <span className="location-info">
              <InfoIcon />
            </span>
          </div>
          <div className="location-eta">
            <div className="location-eta-label">Ungefärlig kötid:</div>
            <div className="location-eta-value">00:14</div>
          </div>
          <div className="location-dots text-center">
            <span className="location-dot location-dot-current"></span>
            <span className="location-dot"></span>
            <span className="location-dot"></span>
          </div>
          <div className="location-bottom-bar">
            <div className="location-number-of-people text-center">
              46 st
              <span className="text-light"> sköna katter före dig</span>
              <div className="location-arrow">
                <ArrowIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="location-part">
          <div className="location-number-of-people text-center">
            <div className="location-arrow">
              <ArrowIcon direction="up" />
            </div>
            46 st
            <span className="text-light"> sköna katter före dig</span>
          </div>
          <div className="location-gender-distribution">
            <div className="location-gender">
              18 <SexIcon sex="male" />
            </div>
            <div className="location-gender">
              22 <SexIcon sex="female" />
            </div>
            <div className="location-gender">
              4 <SexIcon sex="trans" />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Location;
