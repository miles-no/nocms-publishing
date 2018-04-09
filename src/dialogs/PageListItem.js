/* eslint jsx-a11y/no-static-element-interactions: off */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Icon } from 'nocms-atoms';
import { dictionary } from 'nocms-i18n';

const PageListItem = (props, context) => {
  const { page, iconSize, onItemClick } = props;
  const published = page.published || {};
  const isPublished = Object.keys(published).length !== 0;
  const { adminLang, i18n } = context;
  const notificationIconType = isPublished ? 'notifications' : 'notifications_none';
  let iconClass = '';
  let statusText = dictionary(i18n, 'Denne siden er ikke publisert', adminLang);
  const hasChanges = page.changed && page.changed.time;
  if (isPublished) {
    iconClass = 'admin_pagelist__item__page-status-icon--success';
    statusText = dictionary(i18n, 'Denne siden er publisert', adminLang);
  }

  if (hasChanges) {
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
        { page.created ?
          <span className="admin-pagelist__item__content--sub">
          {dictionary(i18n, 'Opprettet', adminLang)} { moment(page.created.time).format('DD.MM.YYYY [kl] HH:mm:ss') }
        </span> : null}
        { isPublished ?
          <span className="admin-pagelist__item__content--sub">
          {dictionary(i18n, 'Publisert', adminLang)} { moment(published.time).format('DD.MM.YYYY [kl] HH:mm:ss') }
        </span> : null}
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
