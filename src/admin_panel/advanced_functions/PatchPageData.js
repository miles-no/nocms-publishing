import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { I, dictionary } from 'nocms-i18n';
import { triggerGlobal } from 'nocms-events';
import Form from '../../atoms/Form';
import Field from '../../atoms/Field';
import AdminMenuDialog from '../../AdminMenuDialog';

const validateJson = (json) => {
  try {
    JSON.parse(json);
    return true;
  } catch (e) {
    return false;
  }
};

export default class PatchPageData extends Component {
  constructor(props) {
    super(props);

    this.patchPageData = this.patchPageData.bind(this);

    this.state = {
      updated: false,
    };
  }

  patchPageData(formData, cb) {
    const data = JSON.parse(formData.jsonObject);

    triggerGlobal('nocms.store-page-values', data);
    this.setState({ updated: true });
    cb();
  }

  render() {
    const { i18n, adminLang } = this.context;
    return (
      <AdminMenuDialog
        instructionContent={dictionary(i18n, 'Endre sideverdier', adminLang)}
        title={dictionary(i18n, 'Endre sideverdier', adminLang)}
        text={dictionary(i18n, 'Endre sideverdier', adminLang)}
        icon="build"
      >
        <div>
          <Form
            store="patch-page-data"
            submitButtonText={dictionary(i18n, 'Endre sideverdier', adminLang)}
            onSubmit={this.patchPageData}
          >
            <Field
              required
              type="textarea"
              label={dictionary(i18n, 'Skriv inn JSON med felter for å overskrive pageData', adminLang)}
              name="jsonObject"
              errorText={dictionary(i18n, 'Teksten er ikke gyldig json', adminLang)}
              validate={validateJson}
            />
          </Form>
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
