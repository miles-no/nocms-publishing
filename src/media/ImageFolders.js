import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ajax from 'nocms-ajax';
import ImageFolderArchive from './ImageFolderArchive';

class ImageFolders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      loadingError: false,
      data: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const imageApi = this.context.config.imageApi;
    ajax.get(`${imageApi}/folders`, (err, results) => {
      if (err) {
        this.handleLoadError(err);
      } else {
        this.handleLoadSuccess(results);
      }
    });
  }

  handleLoadSuccess(results) {
    this.setState({ data: results.folders, isLoading: false, loadingError: false });
  }

  handleLoadError(err) {
    console.log(err);
    this.setState({ isLoading: false, loadingError: true });
  }

  render() {
    const { firstDefaultOpen, activeImageId } = this.props;
    const pdfFolders = this.context.config.pdfFolders;
    const folders = this.state.data
      .filter(function removePdfFolders(folder) {
        return this.indexOf(folder.name) < 0;
      }, pdfFolders)
      .map((folder, idx) => { return <ImageFolderArchive isOpen={firstDefaultOpen && idx === 0} folderName={folder.name} key={idx} activeImageId={activeImageId} />; });
    return (
      <div className="image-folders">
        {folders}
      </div>
    );
  }
}

ImageFolders.propTypes = {
  firstDefaultOpen: PropTypes.bool,
  activeImageId: PropTypes.string,
};

ImageFolders.defaultProps = {
  firstDefaultOpen: false,
};

ImageFolders.contextTypes = {
  config: PropTypes.object,
};

export default ImageFolders;
