import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ajax from 'nocms-ajax';
import { triggerGlobal } from 'nocms-events';
import { I, dictionary } from 'nocms-i18n';
import Field from '../atoms/Field';
import Form from '../atoms/Form';
import Message from '../admin_panel/Message';

export default class DeletePage extends Component {
  constructor(props) {
    super(props);
    this.handleDeletePage = this.handleDeletePage.bind(this);
    this.state = {
      hasError: false,
    };
  }

  handleDeletePage(formData, cb) {
    const messageObj = {
      messageType: 'nocms-delete-page',
      uri: this.props.uri,
      data: { pageId: this.props.pageId },
    };
    const options = {
      responseRequired: true,
    };
    ajax.post(this.context.config.messageApi, messageObj, options, (err) => {
      if (err) {
        this.setState({ hasError: true });
        return;
      }

      triggerGlobal('notify', `Siden på ${this.props.uri} ble slettet`);
      triggerGlobal('navigate', '/');
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
        submitButtonText={dictionary(i18n, 'Slett side', adminLang)}
        onSubmit={this.handleDeletePage}
        initialData={initialData}
      >
        <Message type="warning">
          <p><I>Ved å slette siden, vil den fjernes fra websidene og alle aktuelle grensesnitt.</I></p>
          <p><I>Er du sikker på at du vil slette siden?</I></p>
        </Message>
        <Field
          type="checkbox"
          label={dictionary(i18n, 'Ja, jeg ønsker å slette siden', adminLang)}
          name="confirm"
          required
          validate={confirmValidate}
          errorText="Du må bekrefte at du vil slette siden"
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
