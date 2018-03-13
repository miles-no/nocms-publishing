import React from 'react';
import PropTypes from 'prop-types';
import { EditableArea } from 'nocms-publishing';
import Banner from './Banner';
import Images from './Images';

const aspectRatioTopBanner = {
  large: {
    width: 16,
    height: 7,
  },
  small: {
    width: 5,
    height: 4,
  },
};

const Template = (props) => {
  const topBanner = <Banner heroBanner scope="banner" {...props.banner} className="banner--hero" aspectRatio={aspectRatioTopBanner} />;
  const images = <Images scope="images" />;
  return (
    <div>
      <EditableArea label="Banner">{topBanner}</EditableArea>
      <EditableArea label="Banner">{images}</EditableArea>
    </div>
  );
};

Template.propTypes = {
  banner: PropTypes.object,
  serviceBanner: PropTypes.object,
  navigationItems: PropTypes.array,
  serviceItems: PropTypes.array,
};

Template.defaultProps = {
  pageHeader: '',
  banner: {},
  serviceBanner: {},
};

export default Template;
