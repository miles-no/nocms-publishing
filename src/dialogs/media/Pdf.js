import React from 'react';
import PropTypes from 'prop-types';
import ImageFolderArchive from '../../media/ImageFolderArchive';

const Pdf = (props) => {
  const { onClick } = props;
  return (
    <div>
      <ImageFolderArchive folderName="Pdf" isOpen isPdf onClick={onClick} />
    </div>
  );
};

Pdf.propTypes = {
  onClick: PropTypes.func,
};

Pdf.defaultProps = {
  placeholderImage: '/assets/img/dummy.jpg',
};

Pdf.contextTypes = {
  config: PropTypes.object,
};

export default Pdf;
