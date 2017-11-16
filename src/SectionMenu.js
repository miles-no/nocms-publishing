import React, { Component } from 'react';
import PropTypes from 'prop-types';
import events from 'nocms-events';
import { dictionary } from './i18n/Internationalization';
import IconButton from './atoms/IconButton';


export default class SectionMenuSticky extends Component {
  constructor(props) {
    super(props);
    this.onEditAbortClick = this.onEditAbortClick.bind(this);
    this.onComponentMove = this.onComponentMove.bind(this);
    this.onDeleteComponentClick = this.onDeleteComponentClick.bind(this);
    this.onMoreDropdown = this.onMoreDropdown.bind(this);
    this.state = {
      moreDropdownOpen: false,
    };
  }

  onDeleteComponentClick() {
    const scope = 'components';
    const components = this.props.components;
    components.splice(this.props.componentIndex, 1);
    events.trigger('nocms.component-removed');
    events.trigger('nocms.value-changed', scope, components);
    events.trigger('nocms.history-save', scope, components);
  }

  onComponentMove(direction) {
    const {
      componentIndex,
      components,
    } = this.props;
    if (componentIndex === 0 && direction === 'up') {
      return;
    }
    if (componentIndex === components.length - 1 && direction === 'down') {
      return;
    }

    const newIndex = direction === 'up' ? componentIndex - 1 : componentIndex + 1;
    const newComponents = components.slice();
    const tmp = newComponents[componentIndex];
    newComponents[componentIndex] = newComponents[newIndex];
    newComponents[newIndex] = tmp;
    events.trigger('nocms.value-changed', 'components', newComponents);
    events.trigger('nocms.history-save');
    events.trigger('navigate_in_page', `s${newIndex}`);
  }

  onMoreDropdown() {
    this.setState({ adminDropdownOpen: !this.state.adminDropdownOpen });
  }

  onEditAbortClick() {
    if (typeof this.props.onEditAbortClick === 'function') {
      this.props.onEditAbortClick();
    }
  }

  render() {
    const {
      label,
      sticky,
      componentIndex,
      components,
    } = this.props;
    return (
      <div className="edit-mode__widget-menu">
        <div className="edit-mode__widget-title">{label}</div>
        <div className="edit-mode__widget-buttons">
          {!sticky && componentIndex < components.length - 1 ?
            <IconButton transparent iconOnly noBorder dark iconType="keyboard_arrow_down" onClick={() => { return this.onComponentMove('down'); }} />
            : null}
          {!sticky && componentIndex !== 0 ?
            <IconButton transparent iconOnly noBorder dark iconType="keyboard_arrow_up" onClick={() => { return this.onComponentMove('up'); }} />
            : null}
          {!sticky ?
            <div>
              <IconButton transparent iconOnly noBorder dark iconType="more_vert" onClick={this.onMoreDropdown} />
              <nav id="adminDropdown" aria-hidden="true" className="edit-mode__more-dropdown">
                {this.state.adminDropdownOpen ?
                  <ul className="unstyled-list">
                    <li className="edit-mode__more-dropdown-item">
                      <IconButton onClick={this.onDeleteComponentClick} transparent dark iconType="delete" text={dictionary('Slett seksjon', this.context.lang)} />
                    </li>
                  </ul> : null}
              </nav>
            </div>
            : null}
          <IconButton onClick={this.onEditAbortClick} iconType="check" text={dictionary('OK', this.context.lang)} dark />
        </div>
      </div>
    );
  }
}

SectionMenuSticky.propTypes = {
  onEditAbortClick: PropTypes.func,
  label: PropTypes.string,
  sticky: PropTypes.bool,
  componentIndex: PropTypes.number,
  components: PropTypes.array,
};

SectionMenuSticky.defaultProps = {
  sticky: false,
};
