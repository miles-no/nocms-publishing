import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ajax from 'nocms-ajax';
import { triggerGlobal } from 'nocms-events';
import { I, dictionary } from 'nocms-i18n';
import Field from '../atoms/Field';
import Form from '../atoms/Form';
import Message from '../admin_panel/Message';
import getErrorMsgForStatusCode from '../utils/get_error_message';

export default class DeletePage extends Component {
  constructor(props) {
    super(props);
    this.handleUnpublishPage = this.handleUnpublishPage.bind(this);
    this.state = {
      error: null,
    };
  }

  handleUnpublishPage(formData, cb) {
    const messageObj = {
      messageType: 'nocms-unpublish-page',
      uri: this.props.uri,
      data: { pageId: this.props.pageId },
    };
    const options = {
      responseRequired: true,
    };
    ajax.post(this.context.config.messageApi, messageObj, options, (err) => {
      if (err) {
        this.setState({
          error: {
            message: getErrorMsgForStatusCode(
              this.context.i18n,
              err.status,
              this.context.adminLang,
            ),
          },
        });
        cb();
        return;
      }

      triggerGlobal('notify', `Siden på ${this.props.uri} ble avpublisert`);
      // triggerGlobal('navigate', '/');
      cb();
    });
  }

  render() {
    const { i18n, adminLang } = this.context;
    const initialData = { confirm: false };
    const confirmValidate = (value) => {
      return value;
    };
    return (
      <Form
        store="delete-page"
        submitButtonText={dictionary(i18n, 'Avpubliser side', adminLang)}
        onSubmit={this.handleUnpublishPage}
        initialData={initialData}
      >
        { this.state.error ?
          <Message type="error">
            { this.state.error.message }
          </Message>
          : <Message type="warning">
            <p><I>Ved å avpublisere siden, vil den ikke lenger være tilgjengelig for brukerne. Som publiserer vil du se siden når du er innlogget, og vil
              ha mulighet for å publisere den på nytt.</I></p>
            <p><I>Er du sikker på at du vil avpublisere siden?</I></p>
          </Message> }
        <Field
          type="checkbox"
          label={dictionary(i18n, 'Ja, jeg ønsker å avpublisere siden', adminLang)}
          name="confirm"
          required
          validate={confirmValidate}
          errorText={dictionary(i18n, 'Du må bekrefte at du vil avpublisere siden', adminLang)}
        />
      </Form>
    );
  }
}

DeletePage.contextTypes = {
  adminLang: PropTypes.string,
  config: PropTypes.object,
  i18n: PropTypes.object,
};

DeletePage.propTypes = {
  pageId: PropTypes.string,
  uri: PropTypes.string,
};

DeletePage.defaultProps = {
  pageTitle: '',
  lang: 'no',
};
