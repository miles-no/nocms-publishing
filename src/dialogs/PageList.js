import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ajax from 'nocms-ajax';
import { triggerGlobal } from 'nocms-events';
import PageListItem from './PageListItem';

const handleItemClick = (page) => {
  triggerGlobal('navigate', page.uri, page);
};

export default class PageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
    };
  }

  componentDidMount() {
    const webApi = this.context.config.webApi;
    if (webApi) {
      ajax.get(`${webApi}/pages`, (err, res) => {
        if (err) {
          console.warn(err);
          return;
        }
        this.setState({ pages: res.pages });
      });
    }
  }

  render() {
    return (
      <div className="admin-pagelist__wrapper">
        {
          this.state.pages.map((page) => {
            return (
              <PageListItem
                key={page.pageId}
                page={page}
                iconSize="small"
                onItemClick={() => { return handleItemClick(page); }}
              />);
          })
        }
      </div>
    );
  }
}

PageList.contextTypes = {
  lang: PropTypes.string,
  config: PropTypes.object,
  adminConfig: PropTypes.object,
};

