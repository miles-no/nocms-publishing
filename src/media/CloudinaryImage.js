import React from 'react';
import PropTypes from 'prop-types';
import cloudinary from 'nocms-cloudinary-utils';

const CloudinaryImage = (props, context) => {
  const {
    publicId,
    options,
    className,
    alt,
  } = props;

  const url = cloudinary.url(publicId, context.config.cloudinaryCloudName, options);
  return (
    <img className={className} src={url} alt={alt} />
  );
};

CloudinaryImage.propTypes = {
  publicId: PropTypes.string,
  options: PropTypes.object,
  alt: PropTypes.string,
  className: PropTypes.string,
};

CloudinaryImage.defaultProps = {
  publicId: 'backgrounds/darkness_nocms',
  options: null,
  alt: '',
  className: '',
};

CloudinaryImage.contextTypes = {
  config: PropTypes.object,
};

export default CloudinaryImage;
