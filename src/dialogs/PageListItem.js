/* eslint jsx-a11y/no-static-element-interactions: off */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'nocms-atoms';
import { dictionary } from 'nocms-i18n';

const PageListItem = (props, context) => {
  const { page, iconSize, onItemClick } = props;
  const { adminLang, i18n } = context;
  const notificationIconType = page.published ? 'notifications' : 'notifications_none';
  let iconClass = '';
  let statusText = dictionary(i18n, 'Denne siden er ikke publisert', adminLang);

  if (Object.keys(page.published).length !== 0) {
    iconClass = 'admin_pagelist__item__page-status-icon--success';
    statusText = dictionary(i18n, 'Denne siden er publisert', adminLang);
  }

  if (page.hasUnpublishedChanges) {
    iconClass = 'admin_pagelist__item__page-status-icon--alert';
    statusText = dictionary(i18n, 'Denne siden har upubliserte endringer', adminLang);
  }

  return (
    <div className="admin-pagelist__item" onClick={onItemClick}>
      <Icon
        type="note"
        size={iconSize}
        className="admin-pagelist__note-icon"
      />
      <div className="admin-pagelist__item__content">
        <span className="admin-pagelist__pagetitle">{page.pageTitle}</span>
      </div>
      <div className="admin-pagelist__item__page-status">
        <Icon
          type={notificationIconType}
          size={iconSize}
          className={iconClass}
        />
        <span className="admin-pagelist__item__page-status-text">{statusText}</span>
      </div>
    </div>
  );
};

PageListItem.contextTypes = {
  adminLang: PropTypes.string,
  i18n: PropTypes.object,
};

PageListItem.propTypes = {
  page: PropTypes.object.isRequired,
  iconSize: PropTypes.string,
  onItemClick: PropTypes.func,
};

export default PageListItem;
