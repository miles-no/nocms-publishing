import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'nocms-atoms';
import { dictionary } from 'nocms-i18n';

const openPreviewPopup = (type, title) => {
  const url = `/assets/preview.html?type=${type}&url=${window.location.href}`;
  const config = {
    mobile: 'height=981,width=497,resizable=no',
    tablet: 'height=1266,width=908,resizable=no',
    tabletLandscape: 'height=898,width=1264,resizable=no',
  };
  window.open(url, title, config[type]);
};

export default class PreviewPage extends Component {
  constructor() {
    super();
    this.previewMobile = this.previewMobile.bind(this);
    this.previewTablet = this.previewTablet.bind(this);
    this.previewTabletLandscape = this.previewTabletLandscape.bind(this);
  }


  previewMobile() {
    openPreviewPopup('mobile', dictionary(this.context.i18n, 'Forhåndsvisning, mobil', this.context.adminLang));
  }

  previewTablet() {
    openPreviewPopup('tablet', dictionary(this.context.i18n, 'Forhåndsvisning, tablet', this.context.adminLang));
  }

  previewTabletLandscape() {
    openPreviewPopup('tabletLandscape', dictionary(this.context.i18n, 'Forhåndsvisning, tablet', this.context.adminLang));
  }

  render() {
    const { i18n, adminLang } = this.context;
    const menuItemClass = 'admin-menu__item';
    return (
      <div>
        <div className="admin-menu__preview">
          <div className="admin-menu__actions">
            <ul className="unstyled-list">
              <li className={menuItemClass}>
                <IconButton iconType="phone_iphone" text={dictionary(i18n, 'Mobil', adminLang)} transparent noBorder onClick={this.previewMobile} />
              </li>
              <li className={menuItemClass}>
                <IconButton iconType="tablet_mac" text={dictionary(i18n, 'Tablet', adminLang)} transparent noBorder onClick={this.previewTablet} />
              </li>
              <li className={menuItemClass}>
                <IconButton iconType="tablet" text={dictionary(i18n, 'Tablet', adminLang)} transparent noBorder onClick={this.previewTabletLandscape} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

PreviewPage.contextTypes = {
  adminLang: PropTypes.string,
  i18n: PropTypes.object,
};
