import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'nocms-forms';
import ajax from 'nocms-ajax';
import { triggerGlobal } from 'nocms-events';
import uuid from 'uuid';
import I, { dictionary } from '../i18n/Internationalization';
// import nocmsConfig from '../../../../nocms_config';

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
    let defaults;
    if (formData.templateId === 'blogpost' || formData.templateId === 'newspage') {
      defaults = {
        published: false,
        pageId: uuid.v4(),
        revision: 1,
        publishedMeta: { date: new Date() },
      };
    } else {
      defaults = {
        published: false,
        pageId: uuid.v4(),
        revision: 1,
      };
    }

    const messageObj = {
      messageType: 'nocms-create-page',
      uri: formData.uri,
      data: Object.assign(formData, defaults),
    };

    const options = {
      responseRequired: true,
    };
    ajax.post(this.context.config.messageApi, messageObj, options, (err, res) => {
      if (err) {
        cb(err.message);
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
    const { nocmsConfig } = this.props;
    const lang = this.context.lang;
    const site = this.context.adminConfig.site;
    const templateOptions = nocmsConfig.templates.map((tmpl) => { return { label: tmpl.name, value: tmpl.id }; });
    return (
      <div className="modal__content modal__content--centered">
        <div className="nocms-admin-form">
          <Form
            store={store}
            submitButton={dictionary('Opprett ny side', lang)}
            onSubmit={this.handleCreatePage}
            initialState={{ site }}
          >
            <Field
              name="pageTitle"
              required
              label={dictionary('Sidetittel', this.context.lang)}
              errorText={dictionary('Du må gi siden en tittel', this.context.lang)}
              validate="notEmpty"
            />
            <Field
              name="uri"
              required
              label={dictionary('Side-URI', this.context.lang)}
              validate="notEmpty"
              readOnly={!this.state.overrideUri}
              dependOn={!this.state.overrideUri ? 'pageTitle' : null}
              dependencyFunc={!this.state.overrideUri ? getUriForPageTitle : null}
              errorText={dictionary('Siden må ha en URL', this.context.lang)}
            />
            <div className="form__control-group form__control-group--compressed">
              <label>
                <input type="checkbox" onChange={this.handleOverrideUriChange} checked={this.state.overrideUri} value="1" name="overrideUri" />
                <span className="form__label"><I>Egendefinert side-URL</I></span>
              </label>
            </div>
            <Field
              type="select"
              required
              name="templateId"
              validate="notEmpty"
              emptyLabel={dictionary('Velg sidemal', this.context.lang)}
              label={dictionary('Sidemal', this.context.lang)}
              options={templateOptions}
              errorText={dictionary('Du må velge sidemal', this.context.lang)}
            />
            <Field
              type="select"
              required
              validate="notEmpty"
              name="lang"
              emptyLabel={dictionary('Velg språk', this.context.lang)}
              label={dictionary('Sidespråk', this.context.lang)}
              options={nocmsConfig.languages}
              errorText={dictionary('Du må angi språk', this.context.lang)}
            />
          </Form>
        </div>
      </div>
    );
  }
}

CreatePage.contextTypes = {
  lang: PropTypes.string,
  config: PropTypes.object,
  adminConfig: PropTypes.object,
};

CreatePage.propTypes = {
  nocmsConfig: PropTypes.object,
};
