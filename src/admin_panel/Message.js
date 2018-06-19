import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'nocms-atoms';

const Message = ({ type, iconSize, children }) => {
  let className = 'message ';
  if (type === 'warning') {
    className += 'message__warning';
  }
  if (type === 'error') {
    className += 'message__error';
  }
  if (type === 'info') {
    className += 'message__info';
  }
  return (
    <div className={className}>
      <Icon type={type === 'info' ? 'info' : 'warning'} size={iconSize} />
      <div className="message__body">
        { children }
      </div>
    </div>
  );
};

Message.propTypes = {
  type: PropTypes.string,
  iconSize: PropTypes.string,
  children: PropTypes.node,
};

Message.defaultProps = {
  type: PropTypes.oneOf([
    'warning', 'error', 'info',
  ]),
  iconSize: 'large',
};

export default Message;
