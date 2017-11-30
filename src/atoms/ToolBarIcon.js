import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'nocms-atoms';

const ToolBarIcon = (props, context) => {
  const {
    toggleEdit,
  } = props;
  const {
    editMode,
  } = context;
  return (
    <div className="admin-edit">
      <button className="admin-edit__button" onClick={toggleEdit}>
        {editMode ? <Icon type="close" /> : <Icon type="border_color" />}
      </button>
    </div>
  );
};

ToolBarIcon.propTypes = {
  toggleEdit: PropTypes.func,
};

ToolBarIcon.contextTypes = {
  editMode: PropTypes.bool,
};

export default ToolBarIcon;
