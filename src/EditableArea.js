/* eslint jsx-a11y/no-static-element-interactions: off */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'nocms-atoms';
import SectionMenu from './SectionMenu';

export default class EditableArea extends Component {
  constructor(props) {
    super(props);
    this.onEditClick = this.onEditClick.bind(this);
    this.onEditAbortClick = this.onEditAbortClick.bind(this);
    this.state = {
      activeEditMode: false,
      componentEditButton: true,
    };
  }

  onEditClick() {
    if (this.state.activeEditMode || !this.state.componentEditButton) {
      return;
    }
    this.setState({ activeEditMode: true });
  }

  onEditAbortClick() {
    this.setState({ activeEditMode: false });
  }

  render() {
    const {
      children,
      label,
      areaClassName,
    } = this.props;
    const className = `edit-mode ${areaClassName} ${this.state.activeEditMode ? 'edit-mode--active' : 'edit-mode--not-active'}`;
    const activeEditModeProps = this.state.componentEditButton ? this.state.activeEditMode : true;
    const childWithProps = React.cloneElement(children, {
      activeEditMode: activeEditModeProps,
    });
    return (
      <div className={className} onClick={this.onEditClick}>
        <div className="edit-mode__label">
          <span>{label}</span>
          <Icon type="edit" />
        </div>
        <SectionMenu sticky onEditAbortClick={this.onEditAbortClick} label={label} />
        {childWithProps}
      </div>
    );
  }
}

EditableArea.propTypes = {
  children: PropTypes.object,
  label: PropTypes.string,
  areaClassName: PropTypes.string,
};

EditableArea.defaultProps = {
  label: '',
  areaClassName: '',
};
