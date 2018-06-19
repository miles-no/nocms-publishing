import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ajax from 'nocms-ajax';
import moment from 'moment';
import { I, dictionary } from 'nocms-i18n';
import Spinner from '../atoms/Spinner';
// import mockData from '../mock/pageHistory.json';

// const mock = window.useMockData || false;
const mock = false;

export default class PageHistory extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      data: mock ? mockData : null, // eslint-disable-line
      error: null,
    };

    if (!mock) {
      ajax.get(`${context.config.webApi}/nocms/page-history?uri=${props.uri}&site=${props.site}`, (err, res) => {
        if (err) {
          this.setState({ error: dictionary(context.i18n, 'Lasting av sidehistorikk feilet', context.adminLang) });
          return;
        }
        this.setState({ data: res });
      });
    }
  }
  render() {
    const { error, data } = this.state;
    if (error) {
      return <p className="error">{error}</p>;
    }

    if (!data) {
      return <Spinner />;
    }

    return (
      <div style={{ overflow: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th><I>Versjon</I></th>
              <th><I>Publisert</I></th>
              <th><I>Publisert av</I></th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {data.map((page) => {
              return (
                <tr key={page.revision}>
                  <td>{page.revision}</td>
                  <td>{ page.published.time ? moment(page.published.time).format('DD.MM.YYYY [kl.] HH:mm') : '-'}</td>
                  <td>{page.published.publishedBy || '-'}</td>
                  <td><a href={`/?pageId=${page.pageId}`}><I>{Object.keys(page.published).length === 0 ? 'Åpne og rediger' : 'Åpne'}</I></a></td>
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
