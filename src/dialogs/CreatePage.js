import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ajax from 'nocms-ajax';
import { triggerGlobal } from 'nocms-events';
import { I, dictionary } from 'nocms-i18n';
import uuid from 'uuid';
import Field from '../atoms/Field';
import Form from '../atoms/Form';

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
    };
  }

  handleCreatePage(formData, cb) {
    const data = {
      lang: formData.lang,
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
        let message;
        if (!err.message) {
          message = dictionary(this.context.i18n, `${err.status}`, this.context.lang);
        } else {
          message = err.message;
        }
        cb(message);
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
    const { lang, i18n } = this.context;
    const templateOptions = templates
      .filter((tmpl) => { return tmpl.siteTemplate; })
      .map((tmpl) => { return { label: tmpl.name, value: tmpl.id }; });
    return (
      <Fragment>
        <Form
          store={store}
          submitButtonText={dictionary(i18n, 'Opprett ny side', lang)}
          onSubmit={this.handleCreatePage}
        >
          <Field
            name="pageTitle"
            required
            label={dictionary(i18n, 'Sidetittel', lang)}
            errorText={dictionary(i18n, 'Du må gi siden en tittel', lang)}
            validate="notEmpty"
          />
          <Field
            name="uri"
            required
            label={dictionary(i18n, 'Side-URL', lang)}
            validate="notEmpty"
            readOnly={!this.state.overrideUri}
            dependOn={!this.state.overrideUri ? 'pageTitle' : null}
            dependencyFunc={!this.state.overrideUri ? getUriForPageTitle : null}
            errorText={dictionary(i18n, 'Siden må ha en URL', lang)}
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
            emptyLabel={dictionary(i18n, 'Velg sidemal', lang)}
            label={dictionary(i18n, 'Sidemal', lang)}
            options={templateOptions}
            errorText={dictionary(i18n, 'Du må velge sidemal', lang)}
          />
          <Field
            type="select"
            required
            validate="notEmpty"
            name="lang"
            emptyLabel={dictionary(i18n, 'Velg språk', lang)}
            label={dictionary(i18n, 'Sidespråk', lang)}
            options={languages}
            errorText={dictionary(i18n, 'Du må angi språk', lang)}
          />
        </Form>
      </Fragment>
    );
  }
}

CreatePage.contextTypes = {
  lang: PropTypes.string,
  config: PropTypes.object,
  adminConfig: PropTypes.object,
};

CreatePage.propTypes = {
  templates: PropTypes.array,
  languages: PropTypes.array,
};
