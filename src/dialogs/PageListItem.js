import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'nocms-atoms';
import moment from 'moment';
import { dictionary } from '../i18n/Internationalization';

const PageListItem = (props, context) => {
  const { page, iconSize, onItemClick } = props;
  const notificationIconType = page.published ? 'notifications' : 'notifications_none';
  let iconClass = '';
  let statusText = dictionary('Denne siden er ikke publisert', context.lang);

  if (page.published) {
    iconClass = 'admin_pagelist__item__page-status-icon--success';
    statusText = dictionary('Denne siden er publisert', context.lang);
  }

  if (page.hasUnpublishedChanges) {
    iconClass = 'admin_pagelist__item__page-status-icon--alert';
    statusText = dictionary('Denne siden har upubliserte endringer', context.lang);
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
        <span className="admin-pagelist__item__content--sub">
          {dictionary('Sist endret', context.lang)} { moment(page.created).format('DD.MM.YYYY [kl] HH:mm:ss') }
        </span>
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
  lang: PropTypes.string,
};

PageListItem.propTypes = {
  page: PropTypes.object.isRequired,
  iconSize: PropTypes.string,
  onItemClick: PropTypes.func,
};

export default PageListItem;
