import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'nocms-forms';
import ajax from 'nocms-ajax';
import { triggerGlobal } from 'nocms-events';
import { dictionary } from '../i18n/Internationalization';

const storeName = 'nocms-publish-page-dialog';

export default class PublishPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInterval: false,
    };
    this.handlePublishPage = this.handlePublishPage.bind(this);
    this.handlePublishTypeChange = this.handlePublishTypeChange.bind(this);
    this.initialState = {
      publishType: 'published',
      pageId: props.pageId,
    };
  }

  handlePublishPage(formData, cb) {
    let published;
    if (formData.publishType === 'published') {
      published = true;
    }
    if (formData.publishType === 'notPublished') {
      published = false;
    }
    if (formData.publishType === 'interval') {
      published = {
        from: formData.publishedFrom,
        to: formData.publishedTo,
      };
    }
    const messageObj = {
      messageType: 'nocms-publish-page',
      data: {
        published,
        pageId: formData.pageId,
        segment: formData.segment,
        isVariant: formData.isVariant,
      },
    };

    const options = {
      responseRequired: true,
    };
    const onClose = this.props.onClose;
    ajax.post(this.context.config.messageApi, messageObj, options, (err, res) => {
      if (err) {
        cb(err.message);
        return;
      }
      triggerGlobal('nocms.new-page-version', res.newPageId, res.newPageRevision);
      onClose();
    });
  }

  handlePublishTypeChange(e, value) {
    this.setState({ isInterval: value === 'interval' });
  }

  render() {
    const radioOptions = [
      {
        label: dictionary('Publisert', this.context.adminLang),
        value: 'published',
      },
      {
        label: dictionary('Lagre som kladd', this.context.adminLang),
        value: 'notPublished',
      },
      {
        label: dictionary('Tidsrom', this.context.adminLang),
        value: 'interval',
      },
    ];

    let segments = null;
    if (this.context.adminConfig.segments) {
      segments = [{ value: 0, label: dictionary('Alle segmenter', this.context.adminLang) }].concat(this.context.adminConfig.segments);
    }
    return (
      <div>
        <div className="modal__content modal__content--centered">
          <Form
            store={storeName}
            submitButton={dictionary('Publisere side', this.context.adminLang)}
            initialState={this.initialState}
            onSubmit={this.handlePublishPage}
          >
            <Field
              type="radio"
              store={storeName}
              label=""
              name="publishType"
              options={radioOptions}
              onChange={this.handlePublishTypeChange}
            />
            <Field
              type="datetime-local"
              store={storeName}
              label={dictionary('Fra', this.context.adminLang)}
              disabled={!this.state.isInterval}
              name="publishedFrom"
              validate="datetime"
            />
            <Field
              type="datetime-local"
              store={storeName}
              label={dictionary('Til', this.context.adminLang)}
              disabled={!this.state.isInterval}
              name="publishedTo"
              validate="datetime"
            />
          </Form>
        </div>
      </div>
    );
  }
}

PublishPage.contextTypes = {
  adminLang: PropTypes.string,
  config: PropTypes.object,
  adminConfig: PropTypes.object,
};

PublishPage.propTypes = {
  onClose: PropTypes.func,
  pageId: PropTypes.string,
};

PublishPage.defaultProps = {
  pageTitle: '',
  lang: 'no',
  metaDescription: '',
};

module.exports = PublishPage;
