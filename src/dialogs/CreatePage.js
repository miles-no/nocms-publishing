import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ajax from 'nocms-ajax';
import { triggerGlobal } from 'nocms-events';
import { I, dictionary } from 'nocms-i18n';
import uuid from 'uuid';
import Field from '../atoms/Field';
import Form from '../atoms/Form';
import Message from '../admin_panel/Message';
import getErrorMsgForStatusCode from '../utils/get_error_message';

const store = 'nocms-create-page-dialog';

const getParentPageUrl = () => {
  return window.location.pathname === '/' ? '' : window.location.pathname;
};

const getUriForPageTitle = (fields) => {
  const pageTitle = fields.pageTitle.value;

  const replace = {
    '-': '-',
    ' ': '-',
    æ: 'ae',
    ø: 'oe',
    å: 'aa',
  };

  const uriifiedTitle = pageTitle.replace(/[^\w]/ig, (chr) => { return replace[chr] || ''; }).toLowerCase();
  return `${getParentPageUrl()}/${uriifiedTitle}`;
};

export default class CreatePage extends Component {
  constructor(props, context) {
    super(props);

    this.handleCreatePage = this.handleCreatePage.bind(this);
    this.handleOverrideUriChange = this.handleOverrideUriChange.bind(this);

    this.state = {
      lang: context.lang,
      overrideUri: false,
      error: null,
    };
  }

  handleCreatePage(formData, cb) {
    const data = {
      lang: formData.lang || this.props.languages[0],
      pageTitle: formData.pageTitle,
      templateId: formData.templateId,
      uri: formData.uri,
      pageId: uuid.v4(),
      revision: 1,
      site: this.context.adminConfig.site,
    };

    const messageObj = {
      messageType: 'nocms-create-page',
      uri: formData.uri,
      data,
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

      triggerGlobal('navigate', res.pageData.uri, res.pageData);
      cb();
    });
  }

  handleOverrideUriChange(e) {
    this.setState({ overrideUri: e.currentTarget.checked });
  }

  render() {
    const { templates, languages } = this.props;
    // lang is undefined
    const { i18n, adminLang } = this.context;
    const templateOptions = templates
      .filter((tmpl) => { return tmpl.siteTemplate; })
      .map((tmpl) => { return { label: tmpl.name, value: tmpl.id }; });
    const languageOptions = languages
      .map((language) => { return { label: dictionary(this.context.i18n, language, this.context.adminLang), value: language }; });
    return (
      <Fragment>
        <Form
          store={store}
          submitButtonText={dictionary(i18n, 'Opprett ny side', adminLang)}
          onSubmit={this.handleCreatePage}
        >
          { this.state.error &&
          <Message type="error">
            <p>{ this.state.error.message }</p>
          </Message> }
          <Field
            name="pageTitle"
            required
            label={dictionary(i18n, 'Sidetittel', adminLang)}
            errorText={dictionary(i18n, 'Du må gi siden en tittel', adminLang)}
            validate="notEmpty"
          />
          <Field
            name="uri"
            required
            label={dictionary(i18n, 'Side-URL', adminLang)}
            validate="notEmpty"
            readOnly={!this.state.overrideUri}
            dependOn={!this.state.overrideUri ? 'pageTitle' : null}
            dependencyFunc={!this.state.overrideUri ? getUriForPageTitle : null}
            errorText={dictionary(i18n, 'Siden må ha en URL', adminLang)}
          />
          <div className="admin-form__control-group admin-form__control-group--compressed">
            <label>
              <input type="checkbox" onChange={this.handleOverrideUriChange} checked={this.state.overrideUri} value="1" name="overrideUri" />
              <span className="admin-form__label"><I>Egendefinert side-URL</I></span>
            </label>
          </div>
          <Field
            type="select"
            required
            name="templateId"
            validate="notEmpty"
            emptyLabel={dictionary(i18n, 'Velg sidemal', adminLang)}
            label={dictionary(i18n, 'Sidemal', adminLang)}
            options={templateOptions}
            errorText={dictionary(i18n, 'Du må velge sidemal', adminLang)}
          />
          { languages.length > 1 ?
            <Field
              type="select"
              required
              validate="notEmpty"
              name="lang"
              emptyLabel={dictionary(i18n, 'Velg språk', adminLang)}
              label={dictionary(i18n, 'Sidespråk', adminLang)}
              options={languageOptions}
              errorText={dictionary(i18n, 'Du må angi språk', adminLang)}
            /> : null}
        </Form>
      </Fragment>
    );
  }
}

CreatePage.contextTypes = {
  adminLang: PropTypes.string,
  config: PropTypes.object,
  adminConfig: PropTypes.object,
  i18n: PropTypes.object,
};

CreatePage.propTypes = {
  templates: PropTypes.array,
  languages: PropTypes.array,
};
