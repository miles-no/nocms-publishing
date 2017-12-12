import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { dictionary } from '../i18n/Internationalization';
import IconButton from '../atoms/IconButton';

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
    openPreviewPopup('mobile', dictionary('Forhåndsvisning, mobil', this.context.adminLang));
  }

  previewTablet() {
    openPreviewPopup('tablet', dictionary('Forhåndsvisning, tablet', this.context.adminLang));
  }

  previewTabletLandscape() {
    openPreviewPopup('tabletLandscape', dictionary('Forhåndsvisning, tablet', this.context.adminLang));
  }

  render() {
    const menuItemClass = 'admin-menu__item';    
    return (
      <div>
        <div className="admin-menu__preview">
          <div className="admin-menu__actions">
            <ul className="unstyled-list">
              <li className={menuItemClass}>
                <IconButton iconType="phone_iphone" text={dictionary('Mobil', this.context.adminLang)} transparent noBorder onClick={this.previewMobile} />
              </li>
              <li className={menuItemClass}>
                <IconButton iconType="tablet_mac" text={dictionary('Tablet', this.context.adminLang)} transparent noBorder onClick={this.previewTablet} />
              </li>
              <li className={menuItemClass}>
                <IconButton iconType="tablet" text={dictionary('Tablet', this.context.adminLang)} transparent noBorder onClick={this.previewTabletLandscape} />
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
};
