import React from 'react';
import PropTypes from 'prop-types';
import SectionFolder from '../section/SectionFolder';

const SectionFolderList = (props) => {
  const { list, onClick, folders } = props;
  const categoriesList = folders.map((folder) => {
    return {
      id: folder.id,
      title: folder.title,
      sections: [],
    };
  });
  list.forEach((section) => {
    const group = section.categories;
    group.forEach((category) => {
      const parentCategory = categoriesList.find((item) => {
        return category === item.id;
      });
      if (typeof parentCategory !== 'undefined') {
        parentCategory.sections.push(section);
      } else {
        console.log(`Couldn't find category for type ${category.id}`);
      }
    });
  });
  const folderItems = categoriesList.map((folder, idx) => {
    return (
      <SectionFolder
        folder={folder}
        onClick={onClick}
        isOpen={idx === 0}
        key={folder.id}
      />
    );
  });

  return (
    <ul className="folders unstyled-list">
      {folderItems}
    </ul>
  );
};

SectionFolderList.propTypes = {
  onClick: PropTypes.func,
  list: PropTypes.array,
  folders: PropTypes.array,
};

export default SectionFolderList;
