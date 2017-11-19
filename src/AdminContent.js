import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { listenToGlobal, triggerGlobal } from 'nocms-events';
import moment from 'moment';
import { Icon } from 'nocms-atoms';
import shortcuts from 'nocms-shortcuts';
import utils from 'nocms-utils';
import ToolBarIcon from './atoms/ToolBarIcon';
import { dictionary } from './i18n/Internationalization';
import AdminPanel from './admin_panel/AdminPanel';

const menuOpenClass = 'admin-menu--open';

export default class AdminContent extends Component {
  constructor() {
    moment.locale('nb');
    super();
    const config = JSON.parse(document.getElementById('nocms.config').innerHTML);
    const adminConfig = JSON.parse(document.getElementById('nocms.adminConfig').innerHTML);

    this.state = {
      showCreateNotFound: false,
      notFoundUri: null,
      editMode: false,
      hidePanel: false,
      pageData: global.NoCMS && global.NoCMS.getPageData ? global.NoCMS.getPageData() : {},
      config,
      adminConfig,
      adminLang: adminConfig.lang,
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.togglePanel = this.togglePanel.bind(this);
    this.onAddSection = this.onAddSection.bind(this);

    listenToGlobal('edit-mode-changed', (editMode) => {
      this.setState({ editMode });
    });
    listenToGlobal('nocms.page-changed', (e) => {
      const notFoundUri = e.pageData.exception && e.pageData.exception.statusCode === 404 ? e.pageData.exception.uri || '/' : null;
      this.setState({ pageData: e.pageData, notFoundUri, showCreateNotFound: notFoundUri !== null });
    });
    listenToGlobal('nocms.pagedata-updated', (pageData) => {
      this.setState({ pageData });
    });
    listenToGlobal('page_not_found', (url) => {
      this.setState({ showCreateNotFound: true, notFoundUri: url });
    });
    listenToGlobal('nocms.client-loaded', (url, pageData) => {
      this.setState({ showCreateNotFound: false, notFoundUri: null, pageData });
    });

    shortcuts.addHandler('ctrl-e', dictionary('Åpne/lukke NoCMS-menyen', adminConfig.lang), this.toggleEdit);
  }

  getChildContext() {
    return {
      editMode: this.state.editMode,
      config: this.state.config,
      adminLang: 'no',
      adminConfig: this.state.adminConfig,
    };
  }

  componentDidMount() {
    const isIdUrl = (window.location.pathname + window.location.search).match(/^\/\?pageId=[a-f0-9-]+&rev=([\d]+)$/);
    if (isIdUrl) {
      triggerGlobal('notify', { message: `Viser versjon ${isIdUrl[1]} av denne siden.` });
    }
  }

  onAddSection() {
    const isOnLargeDevice = window.innerWidth > 1280;
    if (utils.isBrowser) {
      this.setState({
        hidePanel: !isOnLargeDevice,
      }, () => {
        this.toggleMenuOpenClass();
      });
    }
  }

  getTogglePanelButton() {
    const { hidePanel } = this.state;
    const arrowDirection = hidePanel ? 'back' : 'forward';
    const buttonState = hidePanel ? 'open' : 'close';
    const buttonLabel = hidePanel ? dictionary('Vis meny', 'no') : dictionary('Skjul meny', 'no');
    return (
      <button className={`admin-panel__toggle admin-panel__${buttonState}`} onClick={this.togglePanel}>
        <Icon type={`arrow_${arrowDirection}`} />
        <span>{buttonLabel}</span>
      </button>
    );
  }

  toggleEdit() {
    const editMode = !this.state.editMode;
    this.setState({ editMode, hidePanel: false }, () => {
      document.documentElement.classList.toggle(menuOpenClass);
    });
    triggerGlobal('nocms.toggle-edit', editMode);
  }

  togglePanel() {
    this.setState({
      hidePanel: !this.state.hidePanel,
    }, () => {
      this.toggleMenuOpenClass();
    });
  }

  toggleMenuOpenClass() {
    if (this.state.hidePanel) {
      document.documentElement.classList.remove(menuOpenClass);
    } else {
      document.documentElement.classList.add(menuOpenClass);
    }
  }

  render() {
    const togglePanelMarkup = this.getTogglePanelButton();
    const className = this.state.hidePanel ? 'closed' : 'open';

    return (
      <div key="admin-panel" className={`admin-panel admin-panel--${className}`}>
        {togglePanelMarkup}
        <ToolBarIcon pageData={this.state.pageData} toggleEdit={this.toggleEdit} />
        <AdminPanel pageData={this.state.pageData} onAddSection={this.onAddSection} />
      </div>
    );
  }
}

AdminContent.childContextTypes = {
  editMode: PropTypes.bool,
  config: PropTypes.object,
  adminConfig: PropTypes.object,
  adminLang: PropTypes.string,
};
