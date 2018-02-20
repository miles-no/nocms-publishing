import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'nocms-atoms';
import { dictionary } from 'nocms-i18n';
import AdminMenuDialog from '../AdminMenuDialog';
import PublishPage from '../dialogs/PublishPage';
import PageSettings from '../dialogs/PageSettings';
import DeletePage from '../dialogs/DeletePage';
import MovePage from '../dialogs/MovePage';
// import smoothscroll from 'smoothscroll';

const EditPage = (props, context) => {
  const { pageData } = props;
  const { adminLang, i18n } = context;
  const menuItemClass = 'admin-menu__item';
  return (
    <div className="admin-menu__edit">
      <div className="admin-menu__about-page">
        <div className="admin-menu__page-info-wrapper">
          <span className="admin-menu__page-info">
            <div>{pageData.pageTitle}</div>
            <div className="admin-menu__page-info-uri">{pageData.uri}</div>
            <div className="admin-menu__content-status">
              {pageData.hasUnpublishedChanges ? <Icon size="small" type="notifications" /> : null }
              {pageData.hasUnpublishedChanges ? 'Denne siden har upubliserte endringer' : null}
            </div>
          </span>
        </div>
        <AdminMenuDialog
          icon="publish" title={dictionary(i18n, 'Publiser side', adminLang)}
          showTitle
          vertical
          noBorder
          green
          text={dictionary(i18n, 'Publiser', adminLang)}
          centered
          widthConstrained
        >
          <PublishPage {...pageData} />
        </AdminMenuDialog>
      </div>
      <div className="admin-menu__actions">
        <ul className="unstyled-list">
          <li className={menuItemClass}>
            <AdminMenuDialog
              title={dictionary(i18n, 'Jeg ønsker å endre på sideinnstillingene', adminLang)}
              text={dictionary(i18n, 'Sideinnstillinger', adminLang)} icon="settings"
              centered
              widthConstrained
            >
              <PageSettings {...pageData} />
            </AdminMenuDialog>
          </li>
          <li className={menuItemClass}>
            <AdminMenuDialog
              title={dictionary(i18n, 'Jeg ønsker å flytte siden', adminLang)}
              text={dictionary(i18n, 'Flytt side', adminLang)}
              icon="trending_flat"
              centered
              widthConstrained
            >
              <MovePage {...pageData} />
            </AdminMenuDialog>
          </li>
          <li className={menuItemClass}>
            <AdminMenuDialog
              title={dictionary(i18n, 'Jeg ønsker å slette siden', adminLang)}
              text={dictionary(i18n, 'Slett side', adminLang)} icon="delete"
              centered
              widthConstrained
            >
              <DeletePage {...pageData} />
            </AdminMenuDialog>
          </li>
        </ul>
      </div>
    </div>
  );
};

EditPage.propTypes = {
  pageData: PropTypes.object,
};

EditPage.contextTypes = {
  adminLang: PropTypes.string,
  editPage: PropTypes.object,
  i18n: PropTypes.object,
};

export default EditPage;
