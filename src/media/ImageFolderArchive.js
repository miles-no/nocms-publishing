/* eslint jsx-a11y/no-static-element-interactions: off */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ajax from 'nocms-ajax';
import { Icon } from 'nocms-atoms';
import ImageThumbnail from './ImageThumbnail';
import PdfThumbnail from './PdfThumbnail';
import IconButton from '../atoms/IconButton';

export default class ImageFolderArchive extends Component {
  constructor(props) {
    super(props);
    this.onToggleFolder = this.onToggleFolder.bind(this);
    this.state = {
      isLoading: false,
      loadingError: false,
      data: [],
      isOpen: props.isOpen,
    };
  }

  componentDidMount() {
    if (this.state.isOpen) {
      this.loadData();
    }
  }

  onToggleFolder() {
    if (this.state.data.length === 0) {
      this.loadData();
    }
    this.setState({ isOpen: !this.state.isOpen });
  }

  loadData() {
    this.setState({ isLoading: true });
    const widgetApi = this.context.config.widgetApi;
    ajax.get(`${widgetApi}/images/folders/${this.props.folderName}`, (err, results) => {
      if (err) {
        this.handleLoadError(err);
      } else {
        this.handleLoadSuccess(results);
      }
    });
  }

  handleLoadSuccess(results) {
    this.setState({ data: results.resources, isLoading: false, loadingError: false });
  }

  handleLoadError(err) {
    console.log(err);
    this.setState({ isLoading: false, loadingError: true });
  }

  render() {
    const {
      isPdf,
      folderName,
      onClick,
      activeImageId,
    } = this.props;
    let images;
    if (isPdf) {
      images = this.state.data.map((image, idx) => { return <PdfThumbnail publicId={image.public_id} onClick={onClick} format={image.format} key={idx} activeImageId />; });
    } else {
      images = this.state.data.map((image, idx) => {
        return (<ImageThumbnail
          publicId={image.public_id}
          width={image.width}
          height={image.height}
          format={image.format}
          key={idx}
          activeImageId={activeImageId}
        />);
      });
    }
    const folderClass = this.state.isOpen ? 'folder folder--open' : 'folder';
    return (
      <div className={folderClass}>
        <div className="folder__header" onClick={this.onToggleFolder}>
          <span className="folder__title"><Icon type="folder_open" /><span>{folderName}</span></span>
          <IconButton transparent iconOnly noBorder onClick={this.onToggleFolder} iconClass="folder__icon" iconType="keyboard_arrow_down" />
        </div>
        {this.state.isOpen ? <div className="thumbnails">{images}</div> : null}
      </div>
    );
  }
}

ImageFolderArchive.propTypes = {
  folderName: PropTypes.string,
  activeImageId: PropTypes.string,
  isOpen: PropTypes.bool,
  isPdf: PropTypes.bool,
  onClick: PropTypes.func,
};

ImageFolderArchive.contextTypes = {
  config: PropTypes.object,
};
