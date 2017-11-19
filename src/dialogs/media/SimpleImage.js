import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { listenToGlobal, stopListenToGlobal, triggerGlobal } from 'nocms-events';
import I, { dictionary } from '../../i18n/Internationalization';

import Button from '../../atoms/Button';
import ImageMeta from './ImageMeta';
import Checkbox from '../../atoms/Checkbox';
import ImageFolders from '../../media/ImageFolders';
import cloudinary from '../../utils/cloudinary';

export default class SimpleImage extends Component {
  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this);
    this.onImageSelect = this.onImageSelect.bind(this);
    this.onMetaChange = this.onMetaChange.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
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
    const updateObj = (type === 'alt') ? { alt: e } : { caption: e };
    const imageObj = Object.assign({}, this.state.image, updateObj);
    this.setState({ image: imageObj });
  }

  onImageSelect(info) {
    if (this.state.image.isRound) {
      const newImage = { publicId: info.publicId, format: info.format, isRound: true };
      this.setState({ image: newImage });
    } else {
      const newImage = { publicId: info.publicId, format: info.format, isRound: false };
      this.setState({ image: newImage });
    }
  }

  onCheckboxChange(isChecked) {
    if (this.state.image.publicId && isChecked) {
      const updateObj = { isRound: true };
      const imageObj = Object.assign({}, this.state.image, updateObj);
      this.setState({ image: imageObj });
    } else {
      const updateObj = { isRound: false };
      const imageObj = Object.assign({}, this.state.image, updateObj);
      this.setState({ image: imageObj });
    }
  }

  render() {
    const { config } = this.context;
    let src;
    if (this.state.image.publicId && this.state.image.isRound) {
      const transformations = [
        { quality: 'auto:eco',
          radius: 'max',
          gravity: 'face',
          crop: 'fill',
          border: '4px_solid_white',
        },
      ];
      src = cloudinary.url(this.state.image.publicId, config.cloudinaryCloudName, { transformation: transformations });
    } else {
      const transformations = [{ quality: 'auto:eco' }];
      src = cloudinary.url(this.state.image.publicId, config.cloudinaryCloudName, { transformations });
    }
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
            {this.state.image.publicId ?
              <Checkbox name="Gjør bilde rundt" label={dictionary('Gjør bildet rundt (*krever .png)', 'no')} onCheckboxChange={this.onCheckboxChange} />
              : null
            }
          </div>
        </div>
        <ImageFolders firstDefaultOpen />
        <footer className="modal__footer">
          <Button primary text={dictionary('OK, jeg er ferdig', 'no')} onClick={this.onFinish} />
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
};
