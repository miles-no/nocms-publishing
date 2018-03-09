import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ajax from 'nocms-ajax';
import { triggerGlobal } from 'nocms-events';
import uuid from 'uuid';
import { dictionary } from 'nocms-i18n';
import Field from '../atoms/Field';
import Form from '../atoms/Form';
import Message from '../admin_panel/Message';
import getErrorMsgForStatusCode from '../utils/get_error_message';

const store = 'nocms-move-page-dialog';

export default class MovePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalUri: props.uri,
      errorText: null,
      error: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData, cb) {
    const originalUri = this.state.originalUri;
    const newUri = formData.uri;
    if (originalUri === newUri) {
      this.setState({
        error: {
          ...this.state.error,
          message: dictionary(
            this.context.i18n,
            'Du må endre URLen før siden kan flyttes.',
            this.context.adminLang,
          ),
        },
      });
      cb();
      return;
    }

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
    ajax.post(this.context.config.messageApi, messageObj, options, (err, res) => {
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
      triggerGlobal('notify', { duration: 4, message: `Siden er flyttet fra ${originalUri} til ${newUri}` });
      triggerGlobal('navigate', res.newPageUri);
      cb();
    });
  }

  render() {
    const initialState = { pageId: this.props.pageId, uri: this.props.uri };
    const { adminLang, i18n } = this.context;
    return (
      <div className="modal__content modal__content--centered">
        <div className="nocms-admin-form">
          <Form
            submitButtonText={dictionary(i18n, 'Flytt siden', adminLang)}
            store={store}
            errorText={
              <Message type="error">
                {this.state.errorText}
              </Message>
            }
            initialState={initialState}
            onSubmit={this.handleSubmit}
          >
            { this.state.error &&
            <Message type="error">
              <p>{ this.state.error.message }</p>
            </Message> }
            <Field
              name="uri"
              required
              label={dictionary(i18n, 'Ny side-URI', adminLang)}
              validate="notEmpty"
              errorText={dictionary(i18n, 'Siden må ha en URL', adminLang)}
            />
          </Form>
        </div>
      </div>
    );
  }
}
MovePage.contextTypes = {
  adminLang: PropTypes.string,
  config: PropTypes.object,
  adminConfig: PropTypes.object,
  i18n: PropTypes.object,
};

MovePage.propTypes = {
  uri: PropTypes.string,
  pageId: PropTypes.string,
};

MovePage.defaultProps = {
};
