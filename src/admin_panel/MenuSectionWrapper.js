/* eslint jsx-a11y/no-static-element-interactions: off */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'nocms-atoms';

export default class MenuSectionWrapper extends Component {
  constructor(props) {
    super(props);
    this.onToggleFolder = this.onToggleFolder.bind(this);
    this.state = {
      isOpen: props.startOpen || false,
    };
  }

  onToggleFolder() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const folderClass = this.state.isOpen ? 'folder folder--open' : 'folder';
    return (
      <div className={folderClass}>
        <div className="folder__header admin-menu__title" onClick={this.onToggleFolder}>
          <span>{this.props.folderName}</span>
          <IconButton iconOnly noBorder transparent onClick={this.onToggleFolder} iconType="keyboard_arrow_down" iconClass="folder__icon" />
        </div>
        {this.state.isOpen ? <div>{this.props.children}</div> : null}
      </div>
    );
  }
}

MenuSectionWrapper.propTypes = {
  children: PropTypes.node,
  folderName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  startOpen: PropTypes.bool,
};
