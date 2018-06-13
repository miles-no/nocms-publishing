import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ajax from 'nocms-ajax';
import moment from 'moment';
import { I, dictionary } from 'nocms-i18n';
import Spinner from '../atoms/Spinner';

export default class PageHistory extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      data: null,
      error: null,
    };

    ajax.get(`${context.config.webApi}/nocms/page-history?uri=${props.uri}&site=${props.site}`, (err, res) => {
      if (err) {
        this.setState({ error: dictionary(context.i18n, 'Lasting av sidehistorikk feilet', context.adminLang) });
        return;
      }
      this.setState({ data: res });
    });
  }
  render() {
    if (this.state.error) {
      return <p className="error">{this.state.error}</p>;
    }

    if (!this.state.data) {
      return <Spinner />;
    }

    return (
      <div>
        <h3>
          <I>Sidehistorikk for </I>
          {this.props.uri}
        </h3>
        <table>
          <thead>
            <tr>
              <th><I>Revisjon</I></th>
              <th><I>Publisert</I></th>
              <th><I>Av</I></th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((page) => {
              return (
                <tr key={page.revision}>
                  <td>{page.revision}</td>
                  <td>{ page.published.time ? moment(page.published.time).format('DD.MM.YYYY [kl] HH:mm:ss') : '-'}</td>
                  <td>{page.published.publishedBy || '-'}</td>
                  <td><a href={`/?pageId=${page.pageId}`}><I>Åpne</I></a></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

PageHistory.contextTypes = {
  adminLang: PropTypes.string,
  config: PropTypes.object,
  i18n: PropTypes.object,
};

PageHistory.propTypes = {
  uri: PropTypes.string.isRequired,
  site: PropTypes.string,
};
