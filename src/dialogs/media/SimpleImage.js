import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { I, dictionary } from 'nocms-i18n';
import cloudinary from 'nocms-cloudinary-utils';
import { listenToGlobal, stopListenToGlobal, triggerGlobal } from 'nocms-events';
import Button from '../../atoms/Button';
import ImageMeta from './ImageMeta';
import ImageFolders from '../../media/ImageFolders';

export default class SimpleImage extends Component {
  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this);
    this.onImageSelect = this.onImageSelect.bind(this);
    this.onMetaChange = this.onMetaChange.bind(this);
    this.state = {
      spinnerVisible: false,
      image: props.image,
    };
  }

  componentDidMount() {
    listenToGlobal('nocms.image-selected', this.onImageSelect);
  }

  componentWillUnmount() {
    stopListenToGlobal('nocms.image-selected', this.onImageSelect);
  }

  onFinish() {
    triggerGlobal('nocms.value-changed', `${this.props.scope}`, this.state.image);
    this.props.onClose();
  }

  onMetaChange(e, type) {
    let updateObj;
    if (type === 'alt') {
      updateObj = { alt: e };
    } else if (type === 'caption') {
      updateObj = { caption: e };
    } else {
      updateObj = {
        attribution: e,
      };
    }
    const imageObj = Object.assign({}, this.state.image, updateObj);
    this.setState({ image: imageObj });
  }

  onImageSelect(info) {
    const newImage = { publicId: info.publicId, format: info.format };
    this.setState({ image: newImage });
  }

  render() {
    const { config, i18n, adminLang } = this.context;
    const transformations = [{ quality: 'auto:eco' }];
    const src = cloudinary.url(this.state.image.publicId, config.cloudinaryCloudName, { transformations });
    const fileName = this.state.image.publicId ? `${this.state.image.publicId}.${this.state.image.format}` : 'Ingen valgt';
    return (
      <div>
        <div className="media__image-info">
          <div className="media__image">
            {this.state.image.publicId ?
              <img src={src} alt="Preview" />
              : <div className="media__image-placeholder">
                <img src="/assets/img/dummy.jpg" alt="" />
              </div>}
            <div className="media__image-name">
              <span className="form__label"><I>Bildenavn</I></span>
              <span>{fileName}</span>
            </div>
          </div>
          <div className="media__details">
            <ImageMeta onMetaChange={this.onMetaChange} {...this.state.image} />
          </div>
        </div>
        <ImageFolders firstDefaultOpen activeImageId={this.state.image.publicId} />
        <footer className="admin-modal__footer">
          <Button primary text={dictionary(i18n, 'OK, jeg er ferdig', adminLang)} onClick={this.onFinish} />
        </footer>
      </div>
    );
  }
}

SimpleImage.propTypes = {
  scope: PropTypes.string,
  onClose: PropTypes.func,
  placeholderImage: PropTypes.string,
  image: PropTypes.object,
};

SimpleImage.defaultProps = {
  placeholderImage: '/assets/img/dummy.jpg',
  format: '',
};

SimpleImage.contextTypes = {
  config: PropTypes.object,
  i18n: PropTypes.object,
  adminLang: PropTypes.string,
};
