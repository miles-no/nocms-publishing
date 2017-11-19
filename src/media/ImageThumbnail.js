/* eslint jsx-a11y/no-static-element-interactions: off */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { triggerGlobal } from 'nocms-events';
import cloudinary from '../utils/cloudinary';
import I from '../i18n/Internationalization';


export default class ImageThumbnail extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    triggerGlobal('nocms.image-selected', { publicId: this.props.publicId, format: this.props.format });
  }

  render() {
    const {
      publicId,
      width,
      height,
      format,
      isPdf,
    } = this.props;
    const options = {
      width: 200,
      height: 200,
      crop: 'fit',
    };
    let url = cloudinary.url(publicId, this.context.config.cloudinaryCloudName, options);
    const size = `${height}x${width}px`;
    const name = publicId.substr(publicId.lastIndexOf('/') + 1);
    const fileName = `${name}.${format}`;
    if (isPdf) {
      url = `${url}.jpg`;
    }
    return (
      <div className="thumbnail" onClick={this.onClick}>
        <div className="admin-button admin-button--dark thumbnail__select-button">
          <I>Bruk bildet</I>
        </div>
        <div className="thumbnail__content">
          <div className="thumbnail__image">
            <img src={url} alt="" />
          </div>
          <div className="thumbnail__image-info">
            <div className="thumbnail__size">{size}</div>
            <div className="thumbnail__format">{fileName}</div>
          </div>
        </div>
      </div>
    );
  }
}

ImageThumbnail.propTypes = {
  publicId: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  format: PropTypes.string,
  isPdf: PropTypes.bool,
};

ImageThumbnail.contextTypes = {
  config: PropTypes.object,
};
