/* eslint jsx-a11y/no-static-element-interactions: off */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cloudinary from '../utils/cloudinary';
import I from '../i18n/Internationalization';

export default class PdfThumbnail extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const {
      publicId,
      onClick,
    } = this.props;

    if (typeof onClick === 'function') {
      onClick(publicId);
    }
  }

  render() {
    const {
      publicId,
      format,
    } = this.props;
    const options = {
      width: 200,
      height: 200,
      crop: 'fit',
    };
    const url = cloudinary.url(publicId, this.context.config.cloudinaryCloudName, options);
    const name = publicId.substr(publicId.lastIndexOf('/') + 1);
    const fileName = `${name}.${format}`;
    return (
      <div className="thumbnail" onClick={this.onClick}>
        <div className="admin-button admin-button--dark thumbnail__select-button">
          <I>Legg til</I>
        </div>
        <div className="thumbnail__content">
          <div className="thumbnail__image">
            <img src={`${url}.jpg`} alt="" />
          </div>
          <div className="thumbnail__image-info">
            <div className="thumbnail__format">{fileName}</div>
          </div>
        </div>
      </div>
    );
  }
}

PdfThumbnail.propTypes = {
  publicId: PropTypes.string,
  format: PropTypes.string,
  onClick: PropTypes.func,
};

PdfThumbnail.contextTypes = {
  config: PropTypes.object,
};
