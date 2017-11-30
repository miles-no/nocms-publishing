import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'nocms-atoms';

class IconButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick();
  }
  render() {
    const {
      type,
      className,
      text,
      iconType,
      iconOnly,
      transparent,
      vertical,
      primary,
      green,
      dark,
      iconSize,
      noBorder,
    } = this.props;
    let buttonClassNames = 'admin-button';
    if (transparent) { buttonClassNames += ' admin-button--transparent'; }
    if (iconOnly) {
      buttonClassNames += ' admin-button__icon';
    } else {
      buttonClassNames += ' admin-button__text-icon';
    }
    if (vertical) { buttonClassNames += ' admin-button__text-icon--vertical'; }
    if (primary) { buttonClassNames += ' admin-button__primary'; }
    if (dark) { buttonClassNames += ' admin-button--dark'; }
    if (noBorder) { buttonClassNames += ' admin-button--noBorder'; }
    if (green) { buttonClassNames += ' admin-button--green'; }
    return (
      <button
        type={type}
        className={`${buttonClassNames} ${className}`}
        onClick={this.onClick}
        aria-controls={this.props.ariaControls}
        aria-expanded={this.props.ariaExpanded}
        aria-haspopup={this.props.ariaHaspopup}
      >
        <Icon type={iconType} size={iconSize} className={this.props.iconClass} />
        <span>{text}</span>
      </button>
    );
  }
}

IconButton.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  transparent: PropTypes.bool,
  noBorder: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  iconType: PropTypes.string,
  iconSize: PropTypes.string,
  vertical: PropTypes.bool,
  iconOnly: PropTypes.bool,
  primary: PropTypes.bool,
  green: PropTypes.bool,
  dark: PropTypes.bool,
  iconClass: PropTypes.string,
  ariaControls: PropTypes.string,
  ariaExpanded: PropTypes.bool,
  ariaHaspopup: PropTypes.bool,
};

IconButton.defaultProps = {
  type: 'button',
  className: '',
  iconType: '',
  iconSize: 'normal',
  vertical: false,
  iconOnly: false,
  primary: false,
  transparent: false,
  noBorder: false,
};

export default IconButton;
