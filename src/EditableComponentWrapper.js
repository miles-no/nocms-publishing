import React from 'react';
import PropTypes from 'prop-types';
import EditableComponent from './EditableComponent';
import urlUtils from './utils/url';

const EditableComponentWrapper = (props) => {
  const {
    children,
    components,
  } = props;
  const editableComponents = children.map((component, idx) => {
    if (!components[idx].id) {
      components[idx].id = urlUtils.forComponent(components[idx].type);
    }

    return <EditableComponent key={components[idx].id} componentIndex={idx} label={components[idx].type} components={components}>{component}</EditableComponent>;
  });
  return (
    <div className="edit-mode__wrapper">
      {editableComponents}
    </div>
  );
};

EditableComponentWrapper.propTypes = {
  children: PropTypes.array,
  components: PropTypes.array,
};

export default EditableComponentWrapper;
