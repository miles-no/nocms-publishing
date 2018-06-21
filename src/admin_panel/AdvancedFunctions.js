// @TODO: rewrite
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'nocms-atoms';
import { dictionary } from 'nocms-i18n';
import ImportPages from './advanced_functions/ImportPages';
import PatchPageData from './advanced_functions/PatchPageData';
import DeletePageData from './advanced_functions/DeletePageData';
import MenuSectionWrapper from './MenuSectionWrapper';


export default class AdvancedFunctions extends Component {
  constructor(props) {
    super(props);
    this.openFilePath = this.openFilePath.bind(this);
    this.state = {
      modalHeight: '',
    };
  }

  openFilePath() {
    const url = `${this.context.config.webApi}/nocms/export-pages`;
    window.open(url, 'Download page data');
  }

  render() {
    const { admin: isAdmin, developer } = this.props.claims;
    const { adminLang, i18n } = this.context;
    if (!isAdmin) {
      return null;
    }
    const menuItemClass = 'admin-menu__item';
    return (
      <MenuSectionWrapper folderName={dictionary(i18n, 'Avanserte funksjoner', adminLang)}>
        <div className="admin-menu__edit">
          <ul className="admin-menu__actions unstyled-list">
            <li className={menuItemClass}>
              <IconButton
                iconType={'layers'}
                text={dictionary(i18n, 'Eksportere sidedata', adminLang)}
                transparent
                noBorder
                onClick={this.openFilePath}
              />
            </li>
            <li className={menuItemClass}>
              <ImportPages />
            </li>
            { developer &&
              <li className={menuItemClass}>
                <PatchPageData />
                <DeletePageData />
              </li>
            }
          </ul>
        </div>
      </MenuSectionWrapper>
    );
  }
}

AdvancedFunctions.contextTypes = {
  adminLang: PropTypes.string,
  config: PropTypes.object,
  i18n: PropTypes.object,
};

AdvancedFunctions.propTypes = {
  claims: PropTypes.object,
};

AdvancedFunctions.defaultProps = {
  claims: {},
};
