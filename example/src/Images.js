import React from 'react';
import PropTypes from 'prop-types';
import { EditImage } from 'nocms-publishing'; // eslint-disable-line

const aspectRatio1 = {
  large: {
    width: 3,
    height: 2,
  },
  small: {
    width: 1,
    height: 2,
  },
};

const aspectRatio2 = {
  width: 1,
  height: 1,
};

const Images = (props) => {
  const {
    activeEditMode,
  } = props;

  const style = {
    height: '100px',
    width: '500px',
    position: 'relative',
  };

  return (
    <div>
      <h2>Target devices</h2>
      <div style={style}>
        <EditImage
          scope="image1"
          data={{}}
          activeEditMode={activeEditMode}
          targetDevices
          aspectRatio={aspectRatio1}
        />
      </div>
      <h2>Not target devices</h2>
      <div style={style}>
        <EditImage
          scope="image2"
          targetDevices={false}
          data={{}}
          activeEditMode={activeEditMode}
          aspectRatio={aspectRatio2}
        />
      </div>
      <h2>Presentational image</h2>
      <div style={style}>
        <EditImage
          scope="image3"
          targetDevices
          presentationalImage
          data={{}}
          activeEditMode={activeEditMode}
          aspectRatio={aspectRatio1}
        />
      </div>
    </div>
  );
};

Images.propTypes = {
  activeEditMode: PropTypes.bool,
};

module.exports = Images;
