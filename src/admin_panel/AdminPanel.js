import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { triggerGlobal } from 'nocms-events';
import { Icon } from 'nocms-atoms';
import { dictionary, I } from 'nocms-i18n';
import CreatePage from '../dialogs/CreatePage';
import PageList from '../dialogs/PageList';
import AdminMenuDialog from '../AdminMenuDialog';
import SiteInfo from './SiteInfo';
import EditPage from './EditPage';
import PreviewPage from './PreviewPage';
import MenuSectionWrapper from './MenuSectionWrapper';
import NotificationArea from './notifications/NotificationArea';
import Applications from './Applications';
import AdvancedFunctions from './AdvancedFunctions';
import AddSection from '../section/AddSection';
import urlUtils from '../utils/url';

const logout = (e) => {
  e.preventDefault();
  window.location = global.NoCMS.getConfig('publisherLogoutUrl');
};

export default class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.onAddSection = this.onAddSection.bind(this);
  }

  onAddSection(type) {
    const { pageData, onAddSection, sections } = this.props;
    const components = pageData.components || [];
    const name = type.name;
    const section = sections.find((s) => { return s.name === name; });
    const sectionData = section ? section.defaultData : null;
    const componentObject = {
      type: name,
      id: urlUtils.forComponent(type.name),
    };
    if (sectionData) {
      componentObject.data = { ...sectionData };
    }
    components.push(componentObject);

    triggerGlobal('nocms.value-changed', 'components', components);
    const componentId = `s${(components.length - 1)}`;
    setTimeout(() => {
      const elem = document.getElementById(componentId);
      // @TODO: Finn en erstatning for smoothscroll, den er altfor inngripende
      // smoothscroll(elem);
      elem.classList.add('fade-in');
      elem.click();
    }, 0);

    if (typeof onAddSection === 'function') {
      onAddSection(type);
    }
  }

  getAdminRoles(publisher) {
    const { lang, i18n } = this.context;
    const claims = publisher.claims;
    const roles = [];
    if (claims.publisher) {
      roles.push(dictionary(i18n, 'publiserer', lang));
    }
    if (claims.admin) {
      roles.push(dictionary(i18n, 'administrator', lang));
    }
    if (claims.developer) {
      roles.push(dictionary(i18n, 'utvikler', lang));
    }
    if (claims.employee) {
      roles.push(dictionary(i18n, 'ansatt', lang));
    }
    if (claims.milesCampAdmin) {
      roles.push(dictionary(i18n, 'camp-admin', lang));
    }
    return roles;
  }

  render() {
    const { templates, languages, pageData, folders, applications } = this.props;
    const { adminLang, i18n } = this.context;
    const publisherInfo = global.NoCMS.getNoCMSUserInfo();
    const template = templates.find((obj) => {
      return obj.id === pageData.templateId;
    });
    return (
      <div className="admin-menu">
        <div className="admin-menu__toolbar-top">
          <div className="button-container button-container--center" style={{ justifyContent: 'space-evenly' }}>
            <AdminMenuDialog
              vertical
              iconSize="large"
              text={dictionary(i18n, 'Alle sider', adminLang)}
              icon="layers"
              showTitle
              title={dictionary(i18n, 'Oversikt alle sider', adminLang)}
              centered
            >
              <PageList />
            </AdminMenuDialog>
            <AdminMenuDialog
              vertical iconSize="large" text={dictionary(i18n, 'Ny side', adminLang)} icon="note_add" showTitle title="Opprett en ny side" centered widthConstrained
            >
              <CreatePage templates={templates} languages={languages} />
            </AdminMenuDialog>
          </div>
        </div>
        <MenuSectionWrapper folderName={dictionary(i18n, 'Rediger side', adminLang)} startOpen>
          <EditPage pageData={pageData} languages={languages} />
          <div className="button-container button-container--center">
            <div className="admin_menu__add-section-container">
              {template.sections.length > 0 ?
                <AddSection
                  sections={template.sections}
                  onClick={this.onAddSection}
                  template={template}
                  folders={folders}
                />
                : null}
            </div>
          </div>
        </MenuSectionWrapper>
        <MenuSectionWrapper folderName={dictionary(i18n, 'Sideinformasjon', adminLang)}>
          <SiteInfo {...pageData} templates={templates} />
        </MenuSectionWrapper>
        <MenuSectionWrapper folderName={dictionary(i18n, 'Forhåndsvis', adminLang)}>
          <PreviewPage pageData={pageData} />
        </MenuSectionWrapper>
        {applications && applications.length !== 0 ? <Applications claims={publisherInfo.claims} applications={applications} /> : null }
        <AdvancedFunctions claims={publisherInfo.claims} />
        <MenuSectionWrapper folderName={<img className="admin-menu__header-avatar" src={publisherInfo.photo} alt="profile" />}>
          <dl className="admin-menu__publisher-info">
            <dt><I>Innlogget som</I></dt>
            <dd>{publisherInfo.name}</dd>
            <dt><I>Rolle</I></dt>
            {this.getAdminRoles(publisherInfo).map((role) => {
              return <dd key={role} className="admin-menu__publisher-role">{role}</dd>;
            })}
          </dl>
          <ul className="unstyled-list admin-menu__actions">
            <li>
              <a href="#" onClick={logout} className="flex-container--centered admin-menu__log-out admin-button admin-button--transparent admin-button__text-icon admin-button--noBorder">
                <Icon type="power_settings_new" />
                {dictionary(i18n, 'Logg ut', adminLang)}
              </a>
            </li>
          </ul>
        </MenuSectionWrapper>
        <NotificationArea />
      </div>
    );
  }
}

AdminPanel.propTypes = {
  pageData: PropTypes.object,
  onAddSection: PropTypes.func,
  templates: PropTypes.array,
  sections: PropTypes.array,
  languages: PropTypes.array,
  folders: PropTypes.array,
  applications: PropTypes.array,
};

AdminPanel.contextTypes = {
  adminLang: PropTypes.string,
  i18n: PropTypes.object,
};
