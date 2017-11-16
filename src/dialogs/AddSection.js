import React from 'react';
import PropTypes from 'prop-types';
import SectionFolderList from '../section/SectionFolderList';
import templateSectionCategories from '../../../data/templateSectionCategories';

const filter = function filter(sections) {
  const tmpData = {};
  for (const section of sections) {
    tmpData[section] = true;
  }

  const list = [];
  for (const category of templateSectionCategories) {
    const filteredSections = [];
    for (const section of category.sections) {
      if (tmpData[section]) {
        filteredSections.push(section);
      }
    }

    if (filteredSections.length > 0) {
      list.push({
        name: category.name,
        sections: filteredSections,
      });
    }
  }

  return list;
};

const AddSection = (props) => {
  const { sections, onClick } = props;
  const list = filter(sections);

  return (
    <SectionFolderList list={list} onClick={onClick} />
  );
};

AddSection.propTypes = {
  onClick: PropTypes.func.isRequired,
  sections: PropTypes.array,
};

module.exports = AddSection;
