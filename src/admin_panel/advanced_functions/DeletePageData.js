/* global NoCMS */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { I, dictionary } from 'nocms-i18n';
import { triggerGlobal } from 'nocms-events';
import Form from '../../atoms/Form';
import Field from '../../atoms/Field';
import AdminMenuDialog from '../../AdminMenuDialog';

const validate = (str) => {
  const pageData = NoCMS.getPageData();

  return typeof pageData[str] !== 'undefined';
};

export default class PatchPageData extends Component {
  constructor(props) {
    super(props);

    this.patchPageData = this.patchPageData.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      updated: false,
      value: null,
    };
  }

  onChange(e) {
    let value = '';
    if (validate(e.target.value)) {
      value = e.target.value;
    }

    this.setState({
      value,
    });
  }

  patchPageData(formData, cb) {
    const pageData = {
      ...NoCMS.getPageData(),
    };

    delete pageData[formData.prop];

    triggerGlobal('nocms.new-page-version', pageData);
    triggerGlobal('nocms.store-page-values', {});
    this.setState({ updated: true });
    cb();
  }

  render() {
    const pageData = NoCMS.getPageData();
    const { i18n, adminLang } = this.context;
    const { value } = this.state;
    let deleteText = '';
    if (pageData[value]) {
      deleteText = JSON.stringify({
        [value]: pageData[value],
      }, null, 2);
    }

    return (
      <AdminMenuDialog
        instructionContent={dictionary(i18n, 'Slett sideverdi', adminLang)}
        title={dictionary(i18n, 'Slett sideverdi', adminLang)}
        text={dictionary(i18n, 'Slett sideverdi', adminLang)}
        icon="build"
      >
        <div>
          <Form
            store="patch-page-data"
            submitButtonText={dictionary(i18n, 'Slett sideverdi', adminLang)}
            onSubmit={this.patchPageData}
          >
            <Field
              required
              type="textarea"
              label={dictionary(i18n, 'Skriv navnet på propertien du vil slette fra pageData', adminLang)}
              name="prop"
              errorText={dictionary(i18n, 'Propertien finnes ikke på pageData', adminLang)}
              validate={validate}
              onChange={this.onChange}
            />
          </Form>
          <h4>{dictionary(i18n, 'Data som slettes:', adminLang)}</h4>
          <p>
            {deleteText}
          </p>
          { this.state.updated && <p><I>Sidedataene ble oppdatert</I></p> }
        </div>
      </AdminMenuDialog>
    );
  }
}

PatchPageData.contextTypes = {
  adminLang: PropTypes.string,
  config: PropTypes.object,
  i18n: PropTypes.object,
};
