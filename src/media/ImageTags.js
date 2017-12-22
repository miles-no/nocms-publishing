import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ajax from 'nocms-ajax';

class ImageTags extends Component {
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

    ajax.get(`${imageApi}/tags`, (err, results) => {
      if (err) {
        this.handleLoadError(err);
      } else {
        this.handleLoadSuccess(results);
      }
    });
  }

  handleLoadSuccess(results) {
    this.setState({ data: results.tags, isLoading: false, loadingError: false });
  }

  handleLoadError(err) {
    console.log(err);
    this.setState({ isLoading: false, loadingError: true });
  }

  render() {
    const tags = this.state.data.map((tag, idx) => {
      return <li key={idx}>{tag}</li>;
    });
    return (
      <ul>
        {tags}
      </ul>
    );
  }
}

ImageTags.contextTypes = {
  config: PropTypes.object,
};

export default ImageTags;
