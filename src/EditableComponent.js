/* eslint jsx-a11y/no-static-element-interactions: off */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { dictionary } from 'nocms-i18n';
import { Icon } from 'nocms-atoms';
import SectionMenu from './SectionMenu';

export default class EditableComponent extends Component {
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
      componentIndex,
      components,
      label,
    } = this.props;
    const {
      i18n,
      lang,
    } = this.context;
    const className = this.state.activeEditMode ? 'edit-mode edit-mode--active' : 'edit-mode edit-mode--not-active';
    const activeEditModeProps = this.state.componentEditButton ? this.state.activeEditMode : true;
    const childWithProps = React.cloneElement(children, {
      activeEditMode: activeEditModeProps,
    });
    const translatedLabel = dictionary(i18n, label, lang);
    return (
      <div className={className} onClick={this.onEditClick}>
        <div className="edit-mode__label">
          <span>{translatedLabel}</span>
          <Icon type="edit" />
        </div>
        <SectionMenu onEditAbortClick={this.onEditAbortClick} componentIndex={componentIndex} components={components} label={translatedLabel} />
        {childWithProps}
      </div>
    );
  }
}

EditableComponent.propTypes = {
  children: PropTypes.object,
  componentIndex: PropTypes.number,
  components: PropTypes.array,
  label: PropTypes.string,
};

EditableComponent.contextTypes = {
  lang: PropTypes.string,
  i18n: PropTypes.object,
};
