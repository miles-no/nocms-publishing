import React from 'react';
import PropTypes from 'prop-types';
import { EditableArea } from 'nocms-publishing';
import Banner from './Banner';

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
  return (
    <div>
      <EditableArea label="Banner">{topBanner}</EditableArea>
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
