import React from 'react';
import PropTypes from 'prop-types';
import { TextArea, LinkButton } from 'nocms-atoms';
import { EditImage } from 'nocms-publishing';
import cloudinary from '../../src/utils/cloudinary';

const Banner = (props) => {
  const {
    scope,
    header,
    link,
    linkButton,
    image,
    heroBanner,
    className,
    placeholderImage,
    activeEditMode,
    aspectRatio,
  } = props;

  const transformation = {
    quality: 'auto:eco',
    fetch_format: 'auto',
    crop: 'crop',
  };
  const imgBgUrl = cloudinary.getResponsiveImgBg('miles', transformation, image, aspectRatio);
  const textArea = <TextArea text={header} paragraph={false} autoresize={false} activeEditMode={activeEditMode} editMode scope={`${scope}.header`} />;
  const headerMarkup = heroBanner ? <h1 className="banner__title">{textArea}</h1> : <h2 className="banner__title">{textArea}</h2>;
  const bannerClassName = heroBanner ? `banner ${className}` : 'banner';

  return (
    <div className={bannerClassName} style={imgBgUrl}>
      <EditImage
        scope="eksempel.image"
        data={image}
        targetDevices
        activeEditMode={activeEditMode}
        aspectRatio={aspectRatio}
        placeholderImage={placeholderImage}
      />
      <div className="banner__gradient" />
      <header className="banner__header">
        {headerMarkup}
        {linkButton ?
          <LinkButton activeEditMode={activeEditMode} placeholder="Legg til lenke" scope={`${scope}.link`} content={link} />
          : null}
      </header>
    </div>
  );
};

Banner.propTypes = {
  header: PropTypes.string,
  link: PropTypes.object,
  image: PropTypes.object,
  scope: PropTypes.string,
  activeEditMode: PropTypes.bool,
  heroBanner: PropTypes.bool,
  linkButton: PropTypes.bool,
  className: PropTypes.string,
  aspectRatio: PropTypes.object.isRequired,
  placeholderImage: PropTypes.string,
};

Banner.defaultProps = {
  heroBanner: false,
  linkButton: true,
  className: '',
  image: {},
};

module.exports = Banner;
