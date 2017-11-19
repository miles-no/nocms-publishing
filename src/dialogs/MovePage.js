import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'nocms-forms';
import ajax from 'nocms-ajax';
import { triggerGlobal } from 'nocms-events';
import uuid from 'uuid';
import { dictionary } from '../i18n/Internationalization';

const store = 'nocms-move-page-dialog';

export default class MovePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalUri: props.uri,
      errorText: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData) {
    const originalUri = this.state.originalUri;
    const newUri = formData.uri;
    if (originalUri === newUri) {
      this.setState({ errorText: 'Du må endre URLen før siden kan flyttes.' });
      return;
    }
    this.setState({ errorText: null });
    const defaults = {
      newPageId: uuid.v4(),
      site: this.context.adminConfig.site,
    };
    const messageObj = {
      messageType: 'nocms-move-page',
      uri: formData.uri,
      data: Object.assign(formData, defaults),
    };
    const options = {
      responseRequired: true,
    };
    console.log('newuri', formData.uri);
    ajax.post(this.context.config.messageApi, messageObj, options, (err, res) => {
      if (err) {
        this.setState({ error: 'Flytting av side feilet.' });
        return;
      }
      triggerGlobal('notify', { duration: 4, message: `Siden er flyttet fra ${originalUri} til ${newUri}` });
      triggerGlobal('navigate', res.newPageUri);
    });
  }

  render() {
    const initialState = { pageId: this.props.pageId };
    const lang = this.context.lang;
    return (
      <div className="modal__content modal__content--centered">
        <div className="nocms-admin-form">
          <Form
            submitButton={dictionary('Flytt siden', lang)}
            store={store}
            errorText={this.state.errorText}
            initialState={initialState}
            onSubmit={this.handleSubmit}
          >
            <Field
              name="uri"
              required
              label={dictionary('Ny side-URI', this.context.lang)}
              value={this.props.uri}
              validate="notEmpty"
              errorText={dictionary('Siden må ha en URL', this.context.lang)}
            />

          </Form>
        </div>
      </div>
    );
  }
}
MovePage.contextTypes = {
  lang: PropTypes.string,
  config: PropTypes.object,
  adminConfig: PropTypes.object,
};

MovePage.propTypes = {
  uri: PropTypes.string,
  pageId: PropTypes.string,
};

MovePage.defaultProps = {
};

module.exports = MovePage;
