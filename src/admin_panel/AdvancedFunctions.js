// @TODO: rewrite
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImportPages from './advanced_functions/ImportPages';
import MenuSectionWrapper from './MenuSectionWrapper';
import { dictionary } from '../i18n/Internationalization';
import IconButton from '../atoms/IconButton';

export default class AdvancedFunctions extends Component {
  constructor(props) {
    super(props);
    this.openFilePath = this.openFilePath.bind(this);
    this.state = {
      modalHeight: '',
    };
  }

  openFilePath() {
    const url = `${this.context.config.widgetApi}/nocms/export-pages`;
    window.open(url, 'Download page data');
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
              <IconButton
                iconType={'layers'}
                text={dictionary('Eksportere sidedata', this.context.lang)}
                transparent
                noBorder
                onClick={this.openFilePath}
              />
            </li>
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
