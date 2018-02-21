import React from 'react';
import PropTypes from 'prop-types';
import SectionFolderList from '../section/SectionFolderList';

const AddSection = (props) => {
  const { onClick, template, folders } = props;

  return (
    <SectionFolderList
      onClick={onClick}
      list={template.sections}
      folders={folders}
    />
  );
};

AddSection.propTypes = {
  onClick: PropTypes.func.isRequired,
  template: PropTypes.object,
  folders: PropTypes.array,
};

export default AddSection;
