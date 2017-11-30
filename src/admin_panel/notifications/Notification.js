import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'nocms-atoms';

const Notification = (props) => {
  return (
    <div className="flex-container flex-container__centered">
      {props.icon ? <Icon type={props.icon} size="small" className="admin-menu__notification-icon" /> : null}
      <span>{props.text}</span>
    </div>
  );
};

Notification.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default Notification;
