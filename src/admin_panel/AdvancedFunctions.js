// @TODO: rewrite
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImportPages from './advanced_functions/ImportPages';
import MenuSectionWrapper from './MenuSectionWrapper';
import { dictionary } from '../i18n/Internationalization';

export default class AdvancedFunctions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalHeight: '',
    };
  }
  render() {
    const { admin: isAdmin } = this.props.claims;
    if (!isAdmin) {
      return null;
    }
    const menuItemClass = 'admin-menu__item';
    return (
      <MenuSectionWrapper folderName={dictionary('Avanserte funksjoner', this.context.lang)}>
        <div className="admin-menu__edit">
          <ul className="admin-menu__actions unstyled-list">
            <li className={menuItemClass}>
              <ImportPages />
            </li>
          </ul>
        </div>
      </MenuSectionWrapper>
    );
  }
}

AdvancedFunctions.contextTypes = {
  lang: PropTypes.string,
  config: PropTypes.object,
};

AdvancedFunctions.propTypes = {
  claims: PropTypes.object,
};

AdvancedFunctions.defaultProps = {
  claims: {},
};
