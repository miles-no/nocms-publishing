/* eslint jsx-a11y/no-noninteractive-element-interactions: off */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'nocms-atoms';
import { I } from 'nocms-i18n';

export default class Section extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const {
      section,
      onClick,
    } = this.props;

    if (typeof onClick === 'function') {
      onClick(section);
    }
  }

  render() {
    const { section } = this.props;
    // @TODO if section has an icon, use that instead of type add
    return (
      <li className="thumbnail thumbnail__icon-and-text thumbnail--dark" onClick={this.onClick}>
        <div className="admin-button admin-button--dark thumbnail__select-button">
          <I>Legg til</I>
        </div>
        <div className="thumbnail__content">
          <div><Icon type="add" size="large" /></div>
          <div className="thumbnail__text"><I>{section.label}</I></div>
        </div>
      </li>
    );
  }
}

Section.propTypes = {
  section: PropTypes.object,
  onClick: PropTypes.func,
};
