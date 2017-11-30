import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ajax from 'nocms-ajax';
import { triggerGlobal } from 'nocms-events';
import I, { dictionary } from '../i18n/Internationalization';
import Button from '../atoms/Button';

export default class DeletePage extends Component {
  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this);
    this.handleDeletePage = this.handleDeletePage.bind(this);
  }

  onFinish() {
    this.props.onClose();
  }

  handleDeletePage() {
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
        this.setState({ error: 'Sletting av side feilet.' });
        return;
      }

      triggerGlobal('notify', `Siden på ${this.props.uri} ble slettet`);
      triggerGlobal('navigate', '/');
    });
  }

  render() {
    return (
      <div>
        <div className="modal__content modal__content--centered">
          <div className="tabs tabs--sm-stacked">
            <ul className="tabs__header">
              <li className="tabs__tab tabs__tab--active">Sideinformasjon</li>
              <li className="tabs__tab">Sidehistorikk</li>
              <li className="tabs__tab">Publiseringsdetaljer</li>
            </ul>
          </div>
          <div className="nocms-admin-form">
            <p><I>Ved å slette siden, vil den fjernes fra websidene og alle aktuelle grensesnitt.</I></p>
            <p><I>Er du sikker på at du vil slette siden</I></p>
            <Button primary text={dictionary('Slett siden', 'no')} onClick={this.handleDeletePage} />
          </div>
        </div>
        <footer className="modal__footer">
          <Button primary text={dictionary('Avbryt', 'no')} onClick={this.onFinish} />
        </footer>
      </div>
    );
  }
}

DeletePage.contextTypes = {
  lang: PropTypes.string,
  config: PropTypes.object,
};

DeletePage.propTypes = {
  onClose: PropTypes.func,
  pageId: PropTypes.string,
  uri: PropTypes.string,
};

DeletePage.defaultProps = {
  pageTitle: '',
  lang: 'no',
};
