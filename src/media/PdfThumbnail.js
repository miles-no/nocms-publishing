/* eslint jsx-a11y/no-static-element-interactions: off */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { I } from 'nocms-i18n';
import cloudinary from '../utils/cloudinary';

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
      activeImageId,
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
    let className = 'thumbnail';
    if (publicId === activeImageId) {
      className += ' thumbnail--active';
    }
    return (
      <div className={className} onClick={this.onClick}>
        <div className="admin-button admin-button--dark thumbnail__select-button">
          <I>Legg til</I>
        </div>
        <div className="thumbnail__content">
          <div className="thumbnail__image">
            <img src={`${url}.jpg`} alt="" />
          </div>
          <div className="thumbnail__image-info">
            <div className="thumbnail__name">{fileName}</div>
          </div>
        </div>
      </div>
    );
  }
}

PdfThumbnail.propTypes = {
  publicId: PropTypes.string,
  activeImageId: PropTypes.string,
  format: PropTypes.string,
  onClick: PropTypes.func,
};

PdfThumbnail.contextTypes = {
  config: PropTypes.object,
};
