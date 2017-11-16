import React from 'react';
import PropTypes from 'prop-types';
import SectionFolder from '../section/SectionFolder';

const SectionFolderList = (props) => {
  const { list, onClick } = props;
  const folders = list.map((data, idx) => {
    return (
      <SectionFolder name={data.name} sections={data.sections} onClick={onClick} isOpen={idx === 0} key={idx} />
    );
  });

  return (
    <ul className="folders unstyled-list">
      {folders}
    </ul>
  );
};

SectionFolderList.propTypes = {
  onClick: PropTypes.func,
  list: PropTypes.array,
};

module.exports = SectionFolderList;
