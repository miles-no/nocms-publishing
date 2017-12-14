import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { triggerGlobal } from 'nocms-events';
import { dictionary } from '../i18n/Internationalization';
import Field from '../atoms/Field';
import Form from '../atoms/Form';

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
    triggerGlobal('nocms.store-page-values', formData);
    this.props.onClose();
  }

  render() {
    // @TODO: from props/context
    const languages = ['no', 'en'];
    const { adminLang } = this.context;
    return (
      <div>
        <div className="modal__content modal__content--centered">
          <Form
            store={storeName}
            submitButton={dictionary('OK, jeg er ferdig', adminLang)}
            initialState={this.initialState}
            onSubmit={this.handleUpdatePageSettings}
          >
            <Field
              name="pageTitle"
              store={storeName}
              label={dictionary('Sidetittel', adminLang)}
              required
              errorText="Siden må ha en tittel"
            />
            <Field
              name="metaDescription"
              store={storeName}
              label={dictionary('Meta-beskrivelse', adminLang)}
            />
            <Field
              type="select"
              store={storeName}
              label={dictionary('Sidespråk', adminLang)}
              options={languages}
              name="lang"
              required
              errorText="Siden må ha et språk"
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
