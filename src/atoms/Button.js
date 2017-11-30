import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const {
    type,
    className,
    text,
    transparent,
    onClick,
    dark,
    primary,
  } = props;
  let buttonClassNames = 'admin-button';
  if (transparent) { buttonClassNames += ' admin-button--transparent'; }
  if (dark) { buttonClassNames += ' admin-button--dark'; }
  if (primary) { buttonClassNames += ' admin-button__primary'; }
  return (
    <button
      type={type}
      className={`${buttonClassNames} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  transparent: PropTypes.bool,
  dark: PropTypes.bool,
  primary: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  type: 'button',
  className: '',
};

export default Button;
