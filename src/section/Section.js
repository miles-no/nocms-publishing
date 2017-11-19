/* eslint jsx-a11y/no-noninteractive-element-interactions: off */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'nocms-atoms';
import I from '../i18n/Internationalization';

// import templateSectionData from '../../../data/templateSectionData.js';

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
    const { section, templateSectionData } = this.props;
    return (
      <li className="thumbnail thumbnail__icon-and-text thumbnail--dark" onClick={this.onClick}>
        <div className="admin-button admin-button--dark thumbnail__select-button">
          <I>Legg til</I>
        </div>
        <div className="thumbnail__content">
          <div><Icon type="add" size="large" /></div>
          <div className="thumbnail__text"><I>{templateSectionData.labels[section]}</I></div>
        </div>
      </li>
    );
  }
}

Section.propTypes = {
  section: PropTypes.string,
  onClick: PropTypes.func,
  templateSectionData: PropTypes.object,
};
