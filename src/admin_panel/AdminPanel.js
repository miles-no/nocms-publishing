import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { triggerGlobal } from 'nocms-events';
import CreatePage from '../dialogs/CreatePage';
import { dictionary } from '../i18n/Internationalization';
import IconButton from '../atoms/IconButton';
import AdminMenuDialog from '../AdminMenuDialog';
import SiteInfo from './SiteInfo';
import EditPage from './EditPage';
import PreviewPage from './PreviewPage';
import MenuSectionWrapper from './MenuSectionWrapper';
import NotificationArea from './notifications/NotificationArea';
import Applications from './Applications';
import AddSection from '../section/AddSection';
import urlUtils from '../utils/url';

const logout = (e) => {
  e.preventDefault();
  window.location = global.NoCMS.getConfig('publisherLogoutUrl');
};

export default class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.onAdminDropdown = this.onAdminDropdown.bind(this);
    this.onAddSection = this.onAddSection.bind(this);
    this.state = {
      adminDropdownOpen: false,
    };
  }

  onAdminDropdown() {
    this.setState({ adminDropdownOpen: !this.state.adminDropdownOpen });
  }

  onAddSection(type) {
    const { pageData, onAddSection } = this.props;
    const components = pageData.components || [];
    const name = type.name;
    components.push({
      type: name,
      id: urlUtils.forComponent(type.name),
    });
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
    const { lang } = this.context;
    const claims = publisher.claims;
    const roles = [];
    if (claims.publisher) {
      roles.push(dictionary('publiserer', lang));
    }
    if (claims.admin) {
      roles.push(dictionary('administrator', lang));
    }
    return roles.join(', ');
  }

  render() {
    const { templates, languages, pageData, folders } = this.props;
    const { lang } = this.context;
    const publisherInfo = global.NoCMS.getNoCMSUserInfo();
    const template = templates.find((obj) => {
      return obj.id === pageData.templateId;
    });
    return (
      <div className="admin-menu">
        <div className="admin-menu__header">
          <div className="admin-menu__publisher">
            <img className="admin-menu__header-avatar" src={publisherInfo.photo} alt="" />
            <div>
              <span className="admin-menu__publisher-name">
                <span>{publisherInfo.name}</span>
                {this.state.adminDropdownOpen ?
                  <IconButton iconOnly noBorder iconType="keyboard_arrow_up" onClick={this.onAdminDropdown} ariaHaspopup ariaControls="adminDropdown" ariaExpanded />
                  : <IconButton iconOnly noBorder iconType="keyboard_arrow_down" onClick={this.onAdminDropdown} ariaHaspopup ariaControls="adminDropdown" ariaExpanded={false} />}
              </span>
              <span className="admin-menu__publisher-role">{this.getAdminRoles(publisherInfo)}</span>
            </div>
            <nav id="adminDropdown" aria-hidden="true" className="admin-menu__admin-dropdown">
              {this.state.adminDropdownOpen ?
                <ul className="unstyled-list">
                  <li className="admin-menu__admin-dropdown-item">Språk: Norsk</li>
                  <li className="admin-menu__admin-dropdown-item"><a href="#" onClick={logout}>{dictionary('Logg ut', lang)}</a></li>
                </ul> : null}
            </nav>
          </div>
        </div>
        <div className="admin-menu__toolbar-top">
          <div className="button-container button-container--center">
            <AdminMenuDialog
              vertical iconSize="large" text={dictionary('Ny side', lang)} icon="note_add" showTitle title="Opprett en ny side" centered widthConstrained
            >
              <CreatePage templates={templates} languages={languages} />
            </AdminMenuDialog>
          </div>
        </div>
        <MenuSectionWrapper folderName={dictionary('Rediger side', lang)} startOpen>
          <EditPage pageData={pageData} />
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
        <MenuSectionWrapper folderName={dictionary('Sideinformasjon', lang)}>
          <SiteInfo {...pageData} templates={templates} />
        </MenuSectionWrapper>
        <MenuSectionWrapper folderName={dictionary('Forhåndsvis', lang)}>
          <PreviewPage pageData={pageData} />
        </MenuSectionWrapper>
        <Applications claims={publisherInfo.claims} />
        
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
};

AdminPanel.contextTypes = {
  lang: PropTypes.string,
};
