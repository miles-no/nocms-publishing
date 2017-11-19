import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'nocms-atoms';
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
import PublishPage from '../dialogs/PublishPage';
// import templateComponents from '../../../data/templateComponents';
import AddSection from '../section/AddSection';
import urlUtils from '../utils/url';

const logout = (e) => {
  e.preventDefault();
  window.location = global.NoCMS.getConfig('publisherLogoutUrl');
};

export default class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.viewPages = this.viewPages.bind(this);
    this.createPage = this.createPage.bind(this);
    this.viewSettings = this.viewSettings.bind(this);
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
    const { templateComponents, pageData } = this.props;
    const allowedInTemplate = (templateComponents[pageData.templateId].indexOf(type) > -1);
    if (allowedInTemplate) {
      const components = this.props.pageData.components || [];
      components.push({ type, id: urlUtils.forComponent(type) });
      triggerGlobal('nocms.value-changed', 'components', components);
      const componentId = `s${(components.length - 1)}`;
      setTimeout(() => {
        const elem = document.getElementById(componentId);
        // @TODO: Finn en erstatning for smoothscroll, den er altfor inngripende
        // smoothscroll(elem);
        elem.classList.add('fade-in');
        elem.click();
      }, 0);

      if (typeof this.props.onAddSection === 'function') {
        this.props.onAddSection(type);
      }
    }
  }

  getAdminRoles(publisher) {
    const claims = publisher.claims;
    const roles = [];
    if (claims.publisher) {
      roles.push(dictionary('publiserer', this.context.lang));
    }
    if (claims.admin) {
      roles.push(dictionary('administrator', this.context.lang));
    }
    return roles.join(', ');
  }

  render() {
    const { templateComponents, pageData } = this.props;
    const publisherInfo = global.NoCMS.getNoCMSUserInfo();
    const availableComponentList = templateComponents[pageData.templateId] || [];
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
                  <li className="admin-menu__admin-dropdown-item"><a href="#" onClick={logout}>{dictionary('Logg ut', this.context.lang)}</a></li>
                </ul> : null}
            </nav>
          </div>
        </div>
        <div className="admin-menu__toolbar-top">
          <div className="button-container button-container--center">
            <IconButton transparent noBorder vertical text={dictionary('Alle sider', this.context.lang)} iconType="content_copy" iconSize="large" onClick={this.viewPages} />
            <AdminMenuDialog
              instructionTitle={dictionary('Opprett en ny side', this.context.lang)}
              instructionContent={dictionary('Opprett ny side-instruksjoner', this.context.lang)}
              vertical iconSize="large" text={dictionary('Opprett ny side', this.context.lang)} icon="note_add"
            >
              <CreatePage />
            </AdminMenuDialog>
          </div>
          <div className="admin-menu__about-page">
            <div className="admin-menu__page-info-wrapper">
              <Icon type="star_border" className="admin-menu__favourite" />
              <span className="admin-menu__page-info">
                <div>{this.props.pageData.title}</div>
                <div className="admin-menu__page-info-uri">{this.props.pageData.uri}</div>
                <div className="admin-menu__content-status" />
              </span>
            </div>
            <AdminMenuDialog
              icon="publish" instructionTitle={dictionary('Publisér side', this.context.lang)}
              instructionContent={dictionary('Publisér side-instruksjoner', this.context.lang)}
              vertical noBorder green text={dictionary('Publiser', this.context.lang)}
            >
              <PublishPage {...this.props.pageData} />
            </AdminMenuDialog>
          </div>
        </div>
        <MenuSectionWrapper folderName={dictionary('Rediger side', this.context.lang)}><EditPage pageData={this.props.pageData} /></MenuSectionWrapper>
        <MenuSectionWrapper folderName={dictionary('Sideinformasjon', this.context.lang)}>
          <SiteInfo {...this.props.pageData} />
        </MenuSectionWrapper>
        <MenuSectionWrapper folderName={dictionary('Forhåndsvis', this.context.lang)}><PreviewPage pageData={this.props.pageData} /></MenuSectionWrapper>
        <Applications claims={publisherInfo.claims} />
        <div className="button-container button-container--center">
          <div className="admin_menu__add-section-container">
            {availableComponentList.length > 0 ?
              <AddSection sections={availableComponentList} onClick={this.onAddSection} />
              : null}
          </div>
        </div>
        <NotificationArea />
      </div>
    );
  }
}

AdminPanel.propTypes = {
  pageData: PropTypes.object,
  onAddSection: PropTypes.func,
  templateComponents: PropTypes.object,
};

AdminPanel.contextTypes = {
  lang: PropTypes.string,
};
