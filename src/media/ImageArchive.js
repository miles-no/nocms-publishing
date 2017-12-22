import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ajax from 'nocms-ajax';
import ImageThumbnail from './ImageThumbnail';

export default class ImageArchive extends Component {
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

    ajax.get(`${imageApi}/list`, (err, results) => {
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
    const thumbnails = this.state.data.map((image, idx) => {
      return <ImageThumbnail publicId={image.public_id} key={idx} />;
    });
    return (
      <div>
        {thumbnails}
      </div>
    );
  }
}

ImageArchive.contextTypes = {
  config: PropTypes.object,
};
