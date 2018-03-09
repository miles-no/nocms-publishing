import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'nocms-atoms';

const Message = ({ type, iconSize, children }) => {
  let className = 'message ';
  className += type === 'warning' ? 'message__warning' : 'message__error';

  return (
    <div className={className}>
      <Icon type="warning" size={iconSize} />
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
  type: PropTypes.oneOf(['warning', 'error']),
  iconSize: 'large',
};

export default Message;
