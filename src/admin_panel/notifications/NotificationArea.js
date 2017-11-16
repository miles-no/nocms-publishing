/* eslint no-param-reassign: off */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import events from 'nocms-events';
import { Icon } from 'nocms-atoms';
import Notification from './Notification';

import { dictionary } from '../../i18n/Internationalization';

const DEFAULT_DURATION = 5000;

export default class NotificationArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
    };
  }

  componentDidMount() {
    events.listenTo('nocms.error', (errorMsg) => {
      this.addNotification({
        content: <div><Icon type="error" size="small" />{errorMsg}</div>,
        id: 'nocms.error',
      });
    });
    events.listenTo('nocms.value-changed', () => {
      const notification = {
        text: dictionary('Lagrer', this.context.adminLang),
        icon: 'save-changes',
        id: 'nocms.value-changed',
        clear: ['nocms.page-saved', 'nocms.value-changed'],
      };
      this.addNotification(notification);
    });
    events.listenTo('nocms.page-saved', () => {
      const notification = {
        text: dictionary('Lagret', this.context.adminLang),
        icon: 'check',
        id: 'nocms.page-saved',
        clear: ['nocms.page-saved', 'nocms.value-changed'],
      };
      this.addNotification(notification);
    });
  }

  addNotification(notification) {
    let notifications = this.state.notifications;
    notifications = notifications.filter((n) => {
      if (notification.clear && notification.clear.includes(n.id)) {
        clearTimeout(n.timeoutId);
        return false;
      }
      return true;
    });

    notification.timeoutId = setTimeout(() => {
      this.setState({ notifications: this.state.notifications.filter((n) => {
        return n.id !== notification.id;
      }) });
    }, notification.duration || DEFAULT_DURATION);

    notifications.push(notification);
    this.setState({ notifications });
  }

  render() {
    const notifications = this.state.notifications.map((n, idx) => { return <Notification key={idx} text={n.text} icon={n.icon} />; });
    return (
      <div className="admin-menu__notification">
        {notifications}
      </div>
    );
  }
}

NotificationArea.propTypes = {

};

NotificationArea.contextTypes = {
  lang: PropTypes.string,
};
