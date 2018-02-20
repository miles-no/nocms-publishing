import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditableComponent from './EditableComponent';
import urlUtils from './utils/url';
import i18n from './i18n/dictionary';

export default class EditableComponentWrapper extends Component {
  getChildContext() {
    return {
      adminLang: 'no',
      i18n,
    };
  }

  render() {
    const {
      children,
      components,
      sections,
    } = this.props;
    const editableComponents = children.map((component, idx) => {
      if (!components[idx].id) {
        components[idx].id = urlUtils.forComponent(components[idx].type);
      }
      const sectionData = sections.find((section) => {
        return section.name === components[idx].type;
      });
      return (<EditableComponent
        key={components[idx].id}
        componentIndex={idx}
        label={sectionData.label}
        components={components}
      >
        {component}
      </EditableComponent>);
    });
    return (
      <div className="edit-mode__wrapper">
        {editableComponents}
      </div>
    );
  }
};

EditableComponentWrapper.propTypes = {
  children: PropTypes.array,
  components: PropTypes.array,
  sections: PropTypes.array,
};

EditableComponentWrapper.childContextTypes = {
  adminLang: PropTypes.string,
  i18n: PropTypes.object,
};
