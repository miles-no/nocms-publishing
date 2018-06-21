import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'nocms-atoms';
import { dictionary } from 'nocms-i18n';
import AdminMenuDialog from '../AdminMenuDialog';
import PublishPage from '../dialogs/PublishPage';
import PageSettings from '../dialogs/PageSettings';
import DeletePage from '../dialogs/DeletePage';
import UnpublishPage from '../dialogs/UnpublishPage';
import MovePage from '../dialogs/MovePage';
// import smoothscroll from 'smoothscroll';

const EditPage = (props, context) => {
  const { pageData, languages } = props;
  const { adminLang, i18n, adminConfig } = context;
  const menuItemClass = 'admin-menu__item';
  const hasChanges = pageData.changed && pageData.changed.time;
  const publisherInfo = global.NoCMS.getNoCMSUserInfo();
  const isDeveloper = publisherInfo && publisherInfo.claims && publisherInfo.claims.developer;
  // const isPublished = pageData.published && pageData.published.time;
  // const canEdit = typeof pageData.deprecatedBy === 'undefined' && !isPublished;
  const canEdit = true;
  return (
    <div className="admin-menu__edit">
      <div className="admin-menu__about-page">
        <div className="admin-menu__page-info-wrapper">
          <span className="admin-menu__page-info">
            <div>{pageData.pageTitle}</div>
            <div className="admin-menu__page-info-uri">{pageData.uri}</div>
            { canEdit &&
              <div className="admin-menu__content-status">
                {hasChanges ? <Icon size="small" type="notifications" /> : null }
                {hasChanges ? 'Denne siden har upubliserte endringer' : null}
              </div>
            }
          </span>
        </div>
        { canEdit &&
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
        }
      </div>
      <div className="admin-menu__actions">
        <ul className="unstyled-list">
          { canEdit &&
            <li className={menuItemClass}>
              <AdminMenuDialog
                title={dictionary(i18n, 'Jeg ønsker å endre på sideinnstillingene', adminLang)}
                text={dictionary(i18n, 'Sideinnstillinger', adminLang)} icon="settings"
                centered
                widthConstrained
              >
                <PageSettings {...pageData} languages={languages} />
              </AdminMenuDialog>
            </li>
          }
          { canEdit &&
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
          }
          { canEdit && adminConfig.unpublish && typeof pageData.pageUnpublishData === 'undefined' && typeof pageData.firstPublished === typeof {} ?
            <li className={menuItemClass}>
              <AdminMenuDialog
                title={dictionary(i18n, 'Jeg ønsker å avpublisere siden', adminLang)}
                text={dictionary(i18n, 'Avpubliser side', adminLang)} icon="vertical_align_bottom"
                centered
                widthConstrained
              >
                <UnpublishPage {...pageData} />
              </AdminMenuDialog>
            </li> : null }
          { isDeveloper &&
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
          }
        </ul>
      </div>
    </div>
  );
};

EditPage.propTypes = {
  pageData: PropTypes.object,
  languages: PropTypes.array,
};

EditPage.contextTypes = {
  adminLang: PropTypes.string,
  editPage: PropTypes.object,
  i18n: PropTypes.object,
  adminConfig: PropTypes.object,
};

export default EditPage;
