import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.state = {
      isChecked: false,
    };
  }

  onCheckboxChange(event) {
    this.setState({ isChecked: event.target.checked });
    this.props.onCheckboxChange(event.target.checked);
  }

  render() {
    return (
      <form className="form form--admin">
        <div className="form__control-group form__control-group--compressed">
          <label>
            <input type="checkbox" name={this.props.name} checked={this.state.isChecked} onChange={this.onCheckboxChange} />
            <span className="form__label">{this.props.label}</span>
          </label>
        </div>
      </form>
    );
  }
}

Checkbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  onCheckboxChange: PropTypes.func,
};
