import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { I, dictionary } from 'nocms-i18n';

export default class ImageMeta extends Component {
  constructor(props) {
    super(props);
    this.onMetaChange = this.onMetaChange.bind(this);
  }

  onMetaChange(e, type) {
    this.props.onMetaChange(e.target.value, type, this.props.size);
  }

  render() {
    const { adminLang, i18n } = this.context;
    const {
      disableCaption,
      disableAttribution,
      alt,
      caption,
      attribution,
    } = this.props;

    return (
      <form>
        <div>
          <div className="admin-form__control-group">
            <label>
              <span className="admin-form__label"><I>Alt-tekst</I></span>
              <input type="text" value={alt} placeholder={dictionary(i18n, 'Kort tekst som beskriver bildet', adminLang)} onChange={(e) => { return this.onMetaChange(e, 'alt'); }} />
            </label>
          </div>
          { !disableCaption ?
            <div className="admin-form__control-group">
              <label>
                <span className="admin-form__label"><I>Bildetekst</I></span>
                <input type="text" value={caption} onChange={(e) => { return this.onMetaChange(e, 'caption'); }} />
              </label>
            </div>
            : null}
          { !disableAttribution ?
            <div className="admin-form__control-group">
              <label>
                <span className="admin-form__label"><I>Attribusjon</I></span>
                <input type="text" value={attribution} onChange={(e) => { return this.onMetaChange(e, 'attribution'); }} />
              </label>
            </div>
            : null}
        </div>
      </form>
    );
  }
}

ImageMeta.propTypes = {
  alt: PropTypes.string,
  caption: PropTypes.string,
  attribution: PropTypes.string,
  onMetaChange: PropTypes.func.isRequired,
  size: PropTypes.string,
  disableCaption: PropTypes.bool,
  disableAttribution: PropTypes.bool,
};

ImageMeta.defaultProps = {
  alt: '',
  caption: '',
  attribution: '',
};

ImageMeta.contextTypes = {
  adminLang: PropTypes.string,
  i18n: PropTypes.object,
};
