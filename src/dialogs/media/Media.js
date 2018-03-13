import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { I, dictionary } from 'nocms-i18n';
import cloudinary from 'nocms-cloudinary-utils';
import { listenToGlobal, stopListenToGlobal, triggerGlobal } from 'nocms-events';
import ImageFolders from '../../media/ImageFolders';
import Button from '../../atoms/Button';
import CloudinaryImage from '../../media/CloudinaryImage';
import TabHeader from '../../atoms/TabHeader';
import ImageMeta from './ImageMeta';
import Spinner from '../../atoms/Spinner';

const ImageCropper = typeof window !== 'undefined' ? require('nocms-image-cropper').ImageCropper : null;
// @TODO: Hvis man har valgt bilde, kjør transformasjon på bildet når man åpner dialogen på nytt

export default class Media extends Component {
  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this);
    this.onImageSelect = this.onImageSelect.bind(this);
    this.onMetaChange = this.onMetaChange.bind(this);
    this.onEnableCropperClick = this.onEnableCropperClick.bind(this);
    this.onTabClick = this.onTabClick.bind(this);
    this.onChangeSameImagesAcrossDevices = this.onChangeSameImagesAcrossDevices.bind(this);
    this.state = {
      largeDevice: props.large,
      smallDevice: props.small,
      enableLarge: false,
      enableSmall: false,
      format: props.format,
      selectedTab: 'large',
      sameImageAcrossDevices: props.sameImageAcrossDevices,
      spinnerVisible: false,
    };
  }

  componentDidMount() {
    listenToGlobal('nocms.image-selected', this.onImageSelect);
  }

  componentWillUnmount() {
    stopListenToGlobal('nocms.image-selected', this.onImageSelect);
  }

  onFinish() {
    let image;
    if (this.props.targetDevices) {
      if (this.state.selectedTab === 'large' && this.state.enableLarge) {
        this.setCropperData();
      } else if (this.state.selectedTab === 'small' && this.state.enableSmall) {
        this.setCropperData();
      }
      if (this.state.sameImageAcrossDevices) {
        // @TODO: Rewrite logic for displaying images, and save once only?
        image = {
          sameImageAcrossDevices: this.state.sameImageAcrossDevices,
          large: this.state.largeDevice,
          small: this.state.largeDevice,
        };
      } else {
        image = {
          sameImageAcrossDevices: this.state.sameImageAcrossDevices,
          large: this.state.largeDevice,
          small: this.state.smallDevice,
        };
      }
    } else {
      if (this.state.enableLarge) {
        this.setCropperData();
      }
      image = {
        large: this.state.largeDevice,
      };
    }
    triggerGlobal('nocms.value-changed', `${this.props.scope}`, image);
    this.props.onClose();
  }


  onTabClick(id, event) {
    // @TODO Display loader spinner before image is fetched.
    // @TODO: Prevent image loading multiple times when switching tabs?
    event.preventDefault();

    if (this.state.enableLarge || this.state.enableSmall) {
      this.setCropperData();
    }

    this.setState({
      selectedTab: id,
      enableLarge: false,
      enableSmall: false,
    });
  }

  onMetaChange(e, type, size) {
    const updateObj = (type === 'alt') ? { alt: e } : { caption: e };
    if (this.state.sameImageAcrossDevices) {
      const smallObj = Object.assign({}, this.state.smallDevice, updateObj);
      const largeObj = Object.assign({}, this.state.largeDevice, updateObj);
      this.setState({ smallDevice: smallObj, largeDevice: largeObj });
    } else if (size === 'large') {
      const newObj = Object.assign({}, this.state.largeDevice, updateObj);
      this.setState({ largeDevice: newObj });
    } else {
      const newObj = Object.assign({}, this.state.smallDevice, updateObj);
      this.setState({ smallDevice: newObj });
    }
  }

  onChangeSameImagesAcrossDevices() {
    this.setState({
      sameImageAcrossDevices: !this.state.sameImageAcrossDevices,
      smallDevice: this.state.largeDevice,
    });
  }

  onEnableCropperClick() {
    this.setCropperData();
    if (this.state.selectedTab === 'large') {
      this.setState({
        enableLarge: true,
      });
    } else {
      this.setState({
        enableSmall: true,
      });
    }
  }

  onImageSelect(info) {
    const newImage = { publicId: info.publicId, format: info.format };
    if (this.props.targetDevices) {
      const selectedTab = this.state.selectedTab;
      if (selectedTab === 'large') {
        let small = this.state.smallDevice;
        if (this.state.sameImageAcrossDevices) {
          small = newImage;
        }
        this.setState({
          largeDevice: newImage, enableLarge: true, smallDevice: small,
        });
      } else {
        let large = this.state.largeDevice;
        if (this.state.sameImageAcrossDevices) {
          large = newImage;
        }
        this.setState({
          smallDevice: newImage, enableSmall: true, largeDevice: large,
        });
      }
    } else {
      this.setState({
        largeDevice: newImage, enableLarge: true,
      });
    }
  }

  getImagePreviewMarkup() {
    const { i18n, lang } = this.context;
    let publicId;
    if (this.props.targetDevices) {
      if (this.state.selectedTab === 'large') {
        publicId = this.state.largeDevice.publicId;
      } else {
        publicId = this.state.smallDevice.publicId;
      }
    } else {
      publicId = this.state.largeDevice.publicId;
    }

    if (!publicId) {
      return (
        <div className="media__image-placeholder">
          <img src={this.props.placeholderImage} alt="" />
        </div>
      );
    }

    const options = this.getCloudinaryOptionsForPreview();

    return (
      <div className="media__image-preview">
        <Button onClick={this.onEnableCropperClick} text={dictionary(i18n, 'Endre utsnitt', lang)} dark />
        <CloudinaryImage publicId={publicId} options={options} />
      </div>
    );
  }

  getCropperMarkup(publicId) {
    const { aspectRatio, targetDevices } = this.props;
    let appliedAspectRatio = aspectRatio;
    if (targetDevices) {
      if (this.state.selectedTab === 'large') {
        appliedAspectRatio = aspectRatio.large;
      } else {
        appliedAspectRatio = aspectRatio.small;
      }
    }
    const src = this.getImageSrcForCropper(publicId);
    return (
      <ImageCropper src={src} aspectRatio={appliedAspectRatio} ref="cropper" /> // eslint-disable-line react/no-string-refs
    );
  }

  getImageSrcForCropper(publicId) {
    const { cloudinaryCloudName } = this.context.config;
    const { transformation } = this.props;
    const options = transformation ? { transformation } : {
      quality: 'auto:eco',
    };
    return publicId ? cloudinary.url(publicId, cloudinaryCloudName, options) : '/assets/img/dummy.jpg';
  }

  setCropperData() {
    if (!this.state.enableLarge && !this.state.enableSmall) {
      return;
    }

    const cropperData = this.refs.cropper.getData(); // eslint-disable-line react/no-string-refs
    const smallDeviceData = Object.assign({}, this.state.smallDevice, cropperData);
    const largeDeviceData = Object.assign({}, this.state.largeDevice, cropperData);
    if (this.state.sameImageAcrossDevices) {
      this.setState({ largeDevice: largeDeviceData, smallDevice: smallDeviceData });
    } else if (this.state.enableSmall) {
      this.setState({ smallDevice: smallDeviceData });
    } else {
      this.setState({ largeDevice: largeDeviceData });
    }
  }

  getCloudinaryOptionsForPreview() {
    const { transformation, targetDevices, aspectRatio } = this.props;
    let appliedAspectRatio = aspectRatio;
    let options;
    if (targetDevices) {
      if (this.state.selectedTab === 'large') {
        options = this.state.largeDevice;
        appliedAspectRatio = aspectRatio.large;
      } else {
        options = this.state.smallDevice;
        appliedAspectRatio = aspectRatio.small;
      }
    } else {
      options = this.state.largeDevice || {};
    }
    const defaultOptions = {
      quality: 'auto:eco',
      crop: 'crop',
    };
    if (transformation) {
      return {
        transformation: transformation.concat([
          {
            x: options.x,
            y: options.y,
            width: options.width,
            aspect_ratio: `${appliedAspectRatio.width}:${appliedAspectRatio.height}`,
            crop: 'crop',
          },
        ]),
      };
    }

    return Object.assign(defaultOptions, {
      x: options.x,
      y: options.y,
      width: options.width,
      aspect_ratio: `${appliedAspectRatio.width}:${appliedAspectRatio.height}`,
    });
  }

  render() {
    const { i18n, adminLang } = this.context;
    let imageMarkup;
    let imageMetaMarkup = null;
    let activeImageId = null;
    let fileName;
    if (this.props.targetDevices && this.state.selectedTab === 'large' || !this.props.targetDevices) { // eslint-disable-line no-mixed-operators
      imageMarkup = this.state.enableLarge ? this.getCropperMarkup(this.state.largeDevice.publicId) : this.getImagePreviewMarkup();
      fileName = this.state.largeDevice.publicId ? `${this.state.largeDevice.publicId}.${this.state.largeDevice.format}` : 'Ingen valgt';
      if (this.state.largeDevice.publicId) {
        activeImageId = this.state.largeDevice.publicId;
      }
      if (!this.props.presentationalImage) {
        imageMetaMarkup = <ImageMeta onMetaChange={this.onMetaChange} onChangeSameImagesAcrossDevices={this.onChangeSameImagesAcrossDevices} {...this.state.largeDevice} size="large" />;
      }
    } else {
      imageMarkup = this.state.enableSmall ? this.getCropperMarkup(this.state.smallDevice.publicId) : this.getImagePreviewMarkup();
      fileName = this.state.smallDevice.publicId ? `${this.state.smallDevice.publicId}.${this.state.smallDevice.format}` : 'Ingen valgt';
      if (this.state.smallDevice.publicId) {
        activeImageId = this.state.smallDevice.publicId;
      }
      if (!this.props.presentationalImage) {
        imageMetaMarkup = <ImageMeta onMetaChange={this.onMetaChange} onChangeSameImagesAcrossDevices={this.onChangeSameImagesAcrossDevices} {...this.state.smallDevice} size="small" />;
      }
    }
    const tabs = [
      { id: 'large', name: 'Desktop & tablet', disabled: false },
      { id: 'small', name: 'Mobil' },
    ];
    const renderedTabsHeader = tabs.map((item) => { return <TabHeader key={item.id} active={this.state.selectedTab === item.id} item={item} onClick={this.onTabClick} />; },
    );
    return (
      <div>
        <div className="tabs tabs--sm-stacked">
          {this.props.targetDevices ?
            <ul className="tabs__header">
              {renderedTabsHeader}
            </ul>
            : null}
          {this.state.spinnerVisible ? <Spinner /> : null}
          <div className="tabs__content">
            <div className="media__image-info">
              <div className="media__image">
                {imageMarkup}
                <div className="media__image-name">
                  <span className="form__label"><I>Bildenavn</I></span>
                  <span>{fileName}</span>
                </div>
              </div>
              <div className="media__details admin-form">
                {this.props.targetDevices && this.state.selectedTab === 'small' ?
                  <div className="admin-form__control-group admin-form__control-group--inline">
                    <label>
                      <input type="checkbox" checked={this.state.sameImageAcrossDevices} onChange={this.onChangeSameImagesAcrossDevices} />
                      <span className="admin-form__label"><I>Bruk samme bilde som på desktop & tablet</I></span>
                    </label>
                  </div> : null}
                {!this.props.presentationalImage ?
                  imageMetaMarkup
                  : null}
              </div>
            </div>
          </div>
        </div>
        <ImageFolders firstDefaultOpen activeImageId={activeImageId} />
        <footer className="modal__footer">
          <Button primary text={dictionary(i18n, 'OK, jeg er ferdig', adminLang)} onClick={this.onFinish} />
        </footer>
      </div>
    );
  }
}

Media.propTypes = {
  scope: PropTypes.string,
  onClose: PropTypes.func,
  aspectRatio: PropTypes.object,
  presentationalImage: PropTypes.bool,
  large: PropTypes.object,
  small: PropTypes.object,
  sameImageAcrossDevices: PropTypes.bool,
  format: PropTypes.string,
  placeholderImage: PropTypes.string,
  transformation: PropTypes.array,
  targetDevices: PropTypes.bool,
};

Media.defaultProps = {
  placeholderImage: '/assets/img/dummy.jpg',
  large: {},
  small: {},
  sameImageAcrossDevices: true,
  format: '',
};

Media.contextTypes = {
  config: PropTypes.object,
  i18n: PropTypes.object,
  adminLang: PropTypes.string,
};
