import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I from '../../i18n/Internationalization';

export default class ImageMeta extends Component {
  constructor(props) {
    super(props);
    this.onMetaChange = this.onMetaChange.bind(this);
  }

  onMetaChange(e, type) {
    this.props.onMetaChange(e.target.value, type, this.props.size);
  }

  render() {
    return (
      <form className="form form--admin">
        <div>
          <div className="form__control-group">
            <label>
              <span className="form__label"><I>Alt-tekst</I></span>
              <input type="text" value={this.props.alt} placeholder="Kort tekst som beskriver bildet" onChange={(e) => { return this.onMetaChange(e, 'alt'); }} />
            </label>
          </div>
          <div className="form__control-group">
            <label>
              <span className="form__label"><I>Bildetekst</I></span>
              <input type="text" value={this.props.caption} onChange={(e) => { return this.onMetaChange(e, 'caption'); }} />
            </label>
          </div>
        </div>
      </form>
    );
  }
}

ImageMeta.propTypes = {
  alt: PropTypes.string,
  caption: PropTypes.string,
  onMetaChange: PropTypes.func.isRequired,
  size: PropTypes.string,
};

ImageMeta.defaultProps = {
  alt: '',
  caption: '',
};
