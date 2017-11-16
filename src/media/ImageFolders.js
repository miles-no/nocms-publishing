import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ajax from 'nocms-ajax';
import ImageFolderArchive from './ImageFolderArchive.jsx';

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
    const widgetApi = this.context.config.widgetApi;
    ajax.get(`${widgetApi}/image-folders`, (err, results) => {
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
    const pdfFolders = this.context.config.pdfFolders;
    const folders = this.state.data
      .filter(function removePdfFolders(folder) {
        return this.indexOf(folder.name) < 0;
      }, pdfFolders)
      .map((folder, idx) => { return <ImageFolderArchive isOpen={this.props.firstDefaultOpen && idx === 0} folderName={folder.name} key={idx} />; });
    return (
      <div className="image-folders">
        {folders}
      </div>
    );
  }
}

ImageFolders.propTypes = {
  firstDefaultOpen: PropTypes.bool,
};

ImageFolders.defaultProps = {
  firstDefaultOpen: false,
};

ImageFolders.contextTypes = {
  config: PropTypes.object,
};

module.exports = ImageFolders;
