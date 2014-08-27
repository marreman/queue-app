/** @jsx React.DOM */

var React = require('react')
  , Hammer = require('hammerjs')
  , UserStore = require('../../stores/user-store')
  , Icon = require('../icon.jsx')
  , Mediator = require('../../shared/mediator')
  , events = require('../../shared/constants').events
  , actions = require('../../shared/actions');

var Modal = React.createClass({

  getInitialState: function () {
    return {
      isVisible: false,
      gender: null
    };
  },

  componentDidMount: function () {
    Hammer(this.getDOMNode()).on('dragend', function (event) {
      event.stopPropagation();
    });

    UserStore.onCurrentUserUpdated(function () {
      var currentUser = UserStore.getCurrentUser()
        , gender = currentUser ? currentUser.gender : null;

      this.setState({
        gender: gender
      });
    }.bind(this));

    Mediator.on(events.SHOW_MODAL, this.toggleVisibility);
  },

  render: function () {
    var style = { display: this.state.isVisible ? 'block' : 'none' }
      , options = ['male', 'female', 'trans'].map(this.createGenderOption);

    style.left = this.currentLocationIndex * 100 + '%';

    return (
      <div className="modal" style={style}>
        <a className="modal-close" href onTouchEnd={this.hideModal}>
          <Icon type="close" />
        </a>
        <h1>Tjo!</h1>
        <p>
         Så var det dags för fest! Genom att använda Kö-kollen får du veta hur lång tid det är kvar till insläpp.
         <br /><br />
         Ju fler vi är som använder appen i kön, desto mer exakt blir kötiden. Samtidigt hjälper du andra att se kötiden innan de kommer till klubben.
        </p>
        <p>Katt eller kis?</p>
        <p>
          {options}
        </p>
        <p>
          <a href className="button" onTouchEnd={this.confirmSelection}>Bekräfta val</a>
        </p>
      </div>
    );
  },

  createGenderOption: function (gender) {
    var cls = 'modal-gender-option'
      , selectedCls = ' modal-gender-option-selected';

    cls += gender === this.state.gender ? selectedCls : '';

    return (
      <label className={cls}>
        <Icon type="gender" mod={gender} />
        <input type="radio" name="gender" value={gender} onChange={this.selectGender} />
      </label>
    );

  },

  selectGender: function (event) {
    this.setState({
      gender: event.target.value
    });
  },

  confirmSelection: function (event) {
    event.preventDefault();
    if (this.state.gender) {
      actions.createUser(this.state.gender);
      this.toggleVisibility();
    }
  },

  hideModal: function (event) {
    event.preventDefault();
    this.toggleVisibility();
  },

  toggleVisibility: function (currentLocationIndex) {
    this.currentLocationIndex = currentLocationIndex;
    this.setState({
      isVisible: !this.state.isVisible
    });
  }
});

module.exports = Modal;
