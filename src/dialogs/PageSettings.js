import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { triggerGlobal } from 'nocms-events';
import { dictionary } from 'nocms-i18n';
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
    const data = {
      lang: formData.lang || this.props.languages[0],
      pageTitle: formData.pageTitle,
      metaDescription: formData.metaDescription,
    };

    triggerGlobal('nocms.store-page-values', data);
    this.props.onClose();
  }

  render() {
    const { languages } = this.props;
    const { adminLang, i18n } = this.context;
    const languageOptions = languages.map((language) => { return { label: dictionary(this.context.i18n, language, this.context.adminLang), value: language }; });
    return (
      <div>
        <div className="admin-modal__content admin-modal__content--centered">
          <Form
            store={storeName}
            submitButtonText={dictionary(i18n, 'OK, jeg er ferdig', adminLang)}
            initialState={this.initialState}
            onSubmit={this.handleUpdatePageSettings}
          >
            <Field
              name="pageTitle"
              store={storeName}
              label={dictionary(i18n, 'Sidetittel', adminLang)}
              required
              errorText="Siden må ha en tittel"
            />
            <Field
              name="metaDescription"
              store={storeName}
              label={dictionary(i18n, 'Meta-beskrivelse', adminLang)}
            />
            <Field
              type="select"
              store={storeName}
              label={dictionary(i18n, 'Sidespråk', adminLang)}
              options={languageOptions}
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
  i18n: PropTypes.object,
};

PageSettings.propTypes = {
  pageTitle: PropTypes.string,
  lang: PropTypes.string,
  metaDescription: PropTypes.string,
  onClose: PropTypes.func,
  languages: PropTypes.array,
};

PageSettings.defaultProps = {
  pageTitle: '',
  lang: 'no',
  metaDescription: '',
};
