import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'nocms-forms';
import events from 'nocms-events';
import { dictionary } from '../i18n/Internationalization';

const storeName = 'nocms-update-page-settings';

export default class PageSettings extends Component {
  constructor(props) {
    super(props);
    this.handleUpdatePageSettings = this.handleUpdatePageSettings.bind(this);
    this.initialState = {
      pageTitle: props.pageTitle,
      metaDescription: props.metaDescription,
      lang: props.lang,
    };
  }

  handleUpdatePageSettings(formData) {
    events.trigger('nocms.store-page-values', formData);
    this.props.onClose();
  }

  render() {
    const languages = ['no', 'en'];
    return (
      <div>
        <div className="modal__content modal__content--centered">
          <Form
            store={storeName}
            submitButton={dictionary('OK, jeg er ferdig', this.context.adminLang)}
            initialState={this.initialState}
            onSubmit={this.handleUpdatePageSettings}
          >
            <Field
              name="pageTitle"
              store={storeName}
              label={dictionary('Sidetittel', this.context.adminLang)}
            />
            <Field
              name="metaDescription"
              store={storeName}
              label={dictionary('Meta-beskrivelse', this.context.adminLang)}
            />
            <Field
              type="select"
              store={storeName}
              label={dictionary('Sidespråk', this.context.adminLang)}
              options={languages}
              name="lang"
            />
          </Form>
        </div>
      </div>
    );
  }
}

PageSettings.contextTypes = {
  adminLang: PropTypes.string,
  config: PropTypes.object,
};

PageSettings.propTypes = {
  pageTitle: PropTypes.string,
  lang: PropTypes.string,
  metaDescription: PropTypes.string,
  onClose: PropTypes.func,
};

PageSettings.defaultProps = {
  pageTitle: '',
  lang: 'no',
  metaDescription: '',
};

module.exports = PageSettings;
