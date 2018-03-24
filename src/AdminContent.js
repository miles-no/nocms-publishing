import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { I, dictionary } from 'nocms-i18n';
import { listenToGlobal, triggerGlobal } from 'nocms-events';
import moment from 'moment';
import { Icon } from 'nocms-atoms';
import shortcuts from 'nocms-shortcuts';
import utils from 'nocms-utils';
import ajax from 'nocms-ajax';

import ToolBarIcon from './atoms/ToolBarIcon';
import AdminPanel from './admin_panel/AdminPanel';
import i18n from './i18n/dictionary';
import pageStore from './page_store';

const menuOpenClass = 'admin-menu--open';

export default class AdminContent extends Component {
  constructor() {
    moment.locale('nb');
    super();
    const config = JSON.parse(document.getElementById('nocms.config').innerHTML);
    const adminConfig = JSON.parse(document.getElementById('nocms.adminConfig').innerHTML);

    this.toggleEdit = this.toggleEdit.bind(this);
    this.togglePanel = this.togglePanel.bind(this);
    this.onAddSection = this.onAddSection.bind(this);

    const pageData = pageStore.init(config)
      .getPageData();

    this.state = {
      showCreateNotFound: false,
      notFoundUri: null,
      editMode: false,
      hidePanel: false,
      pageData,
      config,
      adminConfig,
      adminLang: adminConfig.lang,
    };

    listenToGlobal('edit-mode-changed', (editMode) => {
      this.setState({ editMode });
    });
    listenToGlobal('nocms.page-changed', (e) => {
      const notFoundUri = e.pageData.exception && e.pageData.exception.statusCode === 404 ? e.pageData.exception.uri || '/' : null;
      this.setState({ pageData: e.pageData, notFoundUri, showCreateNotFound: notFoundUri !== null });
    });
    listenToGlobal('nocms.pagedata-updated', (updatedPageData) => {
      this.setState({ pageData: updatedPageData });
    });
    listenToGlobal('page_not_found', (url) => {
      this.setState({ showCreateNotFound: true, notFoundUri: url });
    });
    listenToGlobal('nocms.client-loaded', (url, loadedPageData) => {
      this.setState({ showCreateNotFound: false, notFoundUri: null, loadedPageData });
    });

    shortcuts.addHandler('ctrl-e', dictionary(i18n, 'Åpne/lukke NoCMS-menyen', adminConfig.lang), this.toggleEdit);

    ajax.applyOnResponse((req, err, res, next) => {
      if (req.url[0] === '/') {
        if (err && err.status === 401) {
          ajax.get(config.tokenRefreshUrl, { skipResponseFunctions: true }, (reauthError) => {
            if (reauthError) {
              window.location = config.publisherLoginUrl;
              next({ interrupt: true });
              return;
            }
            next({ replay: true });
          });
          next({ interrupt: true });
          return;
        }
      }
      next();
    });
  }

  getChildContext() {
    return {
      editMode: this.state.editMode,
      config: this.state.config,
      adminLang: 'no',
      adminConfig: this.state.adminConfig,
      i18n,
    };
  }

  componentDidMount() {
    const isIdUrl = (window.location.pathname + window.location.search).match(/^\/\?pageId=[a-f0-9-]+&rev=([\d]+)$/);
    if (isIdUrl) {
      triggerGlobal('notify', { message: `Viser versjon ${isIdUrl[1]} av denne siden.` });
    }
  }

  componentWillUnmount() {
    ajax.clearResponseFunctions();
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
    return (
      <button className={`admin-panel__toggle admin-panel__${buttonState}`} onClick={this.togglePanel}>
        <I>Meny</I>
        <Icon type={`arrow_${arrowDirection}`} size="small" />
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
    const { templates, sections, languages, folders, applications } = this.props;
    const togglePanelMarkup = this.getTogglePanelButton();
    const className = this.state.hidePanel ? 'closed' : 'open';

    return (
      <div key="admin-panel" className={`admin-panel admin-panel--${className}`}>
        {togglePanelMarkup}
        <ToolBarIcon pageData={this.state.pageData} toggleEdit={this.toggleEdit} />
        <AdminPanel
          pageData={this.state.pageData}
          templates={templates}
          sections={sections}
          languages={languages}
          onAddSection={this.onAddSection}
          folders={folders}
          applications={applications}
        />
      </div>
    );
  }
}

AdminContent.propTypes = {
  templates: PropTypes.array,
  sections: PropTypes.array,
  languages: PropTypes.array,
  folders: PropTypes.array,
  applications: PropTypes.array,
};

AdminContent.childContextTypes = {
  editMode: PropTypes.bool,
  config: PropTypes.object,
  adminConfig: PropTypes.object,
  adminLang: PropTypes.string,
  i18n: PropTypes.object,
};
