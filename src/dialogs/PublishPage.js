import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ajax from 'nocms-ajax';
import { triggerGlobal } from 'nocms-events';
import { Icon } from 'nocms-atoms';
import moment from 'moment';
import I, { dictionary } from '../i18n/Internationalization';
import Field from '../atoms/Field';
import Form from '../atoms/Form';

const storeName = 'nocms-publish-page-dialog';

const isInterval = (dependency) => {
  return {
    hidden: dependency.publishType.value !== 'interval',
  };
};

const formats = [
  moment.ISO_8601,
  'DD.MM.YYYY hh:mm',
];

const validateDate = (date) => {
  const momentDate = moment(date, formats, true);
  if (momentDate.isValid()) {
    return true;
  }
  return false;
};

const validateFutureDate = (date) => {
  const momentDate = moment(date, formats, true);
  if (momentDate.isValid() && momentDate.isAfter(moment())) {
    return true;
  }
  return false;
};

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
    // if (formData.publishType === 'notPublished') {
    //  published = false;
    // }
    if (formData.publishType === 'interval') {
      const publishedFrom = moment(formData.publishedFrom, formats, true);
      const publishedTo = moment(formData.publishedTo, formats, true);
      if (publishedTo.isBefore(publishedFrom)) {
        this.setState({ intervalError: true });
        cb();
        return;
      }
      published = {
        from: publishedFrom,
        to: publishedTo,
      };
    }
    const messageObj = {
      messageType: 'nocms-publish-page',
      data: {
        published,
        pageId: formData.pageId,
        // segment: formData.segment,
        // isVariant: formData.isVariant,
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
    const { adminLang } = this.context;
    const radioOptions = [
      {
        label: dictionary('Publiser nå', adminLang),
        value: 'published',
      },
      // {
      //  label: dictionary('Lagre som kladd', adminLang),
      //  value: 'notPublished',
      // },
      // {
      //  label: dictionary('Publiser i et tidsrom', adminLang),
      //  value: 'interval',
      // },
    ];

    return (
      <div>
        <div className="modal__content modal__content--centered">
          <Form
            store={storeName}
            submitButtonText={dictionary('Publiser side', adminLang)}
            initialState={this.initialState}
            onSubmit={this.handlePublishPage}
          >
            { this.state.intervalError ?
              (<div className="message message__error">
                <Icon type="error" size="large" />
                <div className="message__body">
                  <p><I>Til-publiseringsdato kan ikke være før fra-publiseringsdato</I></p>
                </div>
              </div>) : null }
            <Field
              type="radio"
              store={storeName}
              label="Når ønsker du å publisere siden?"
              name="publishType"
              options={radioOptions}
              onChange={this.handlePublishTypeChange}
              required
            />
            <Field
              type="datetime-local"
              store={storeName}
              label={dictionary('Fra', adminLang)}
              disabled={!this.state.isInterval}
              name="publishedFrom"
              validate={validateDate}
              dependOn="publishType"
              dependencyFunc={isInterval}
              required
              placeholder="DD.MM.YYYY hh:mm"
              errorText={dictionary('Du må velge en gyldig dato og et tidspunkt', adminLang)}
            />
            <Field
              type="datetime-local"
              store={storeName}
              label={dictionary('Til', adminLang)}
              disabled={!this.state.isInterval}
              name="publishedTo"
              validate={validateFutureDate}
              dependOn="publishType"
              dependencyFunc={isInterval}
              required
              placeholder="DD.MM.YYYY hh:mm"
              min={moment().format('YYYY-MM-DD')}
              errorText={dictionary('Du må velge en gyldig dato og et tidspunkt', adminLang)}
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
