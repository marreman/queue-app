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
      gender: UserStore.getCurrentUser().gender
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

    return (
      <div className="modal" style={style}>
        <a className="modal-close" href onClick={this.toggleVisibility}>
          <Icon type="close" />
        </a>
        <h1>Information</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
        </p>
        <p>Välj ditt kön nedan:</p>
        <p>
          {options}
        </p>
        <p>
          <a href className="button" onClick={this.confirmSelection}>Bekräfta val</a>
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

  toggleVisibility: function (event) {
    if (event) {
      event.preventDefault();
    }

    this.setState({
      isVisible: !this.state.isVisible
    });
  }
});

module.exports = Modal;
