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

    this.resetFilters = this.resetFilters.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);

    this.state = {
      pages: [],
      filterValues: {},
    };
  }

  componentDidMount() {
    const webApi = this.context.config.webApi;
    if (!webApi) {
      console.warn('Could not load all pages because you have not specified a config value for "webApi"');
      return;
    }

    if (webApi) {
      ajax.get(`${webApi}/nocms/get-all-pages`, (err, pages) => {
        if (err) {
          console.warn(err); // eslint-disable-line no-console
          return;
        }
        this.setState({ pages });
      });
    }
  }

  onFilterChange(name, value) {
    this.setState({
      filterValues: {
        ...this.state.filterValues,
        [name]: value,
      },
    });
  }

  resetFilters() {
    this.setState({
      filterValues: {},
    });
  }

  render() {
    const { pageListFilters } = this.props;
    let filteredPages = this.state.pages.filter((page) => {
      return !page.hasOwnProperty('movedTo'); // eslint-disable-line
    });

    const pageListFiltersMap = pageListFilters.reduce((result, item) => {
      return {
        ...result,
        [item.name]: item,
      };
    }, {});

    Object.keys(this.state.filterValues).forEach((key) => {
      const filterValue = this.state.filterValues[key];
      if (!filterValue) {
        return;
      }

      filteredPages = filteredPages.filter((page) => {
        const handler = pageListFiltersMap[key].handler;
        return handler(filterValue, page);
      });
    });

    filteredPages.sort((a, b) => {
      const uriA = a.uri;
      const uriB = b.uri;
      if (uriA < uriB) {
        return -1;
      }
      if (uriA > uriB) {
        return 1;
      }
      return 0;
    });

    const filterMarkup = pageListFilters.map(({ name, options, type, placeholder }) => {
      const selectedValue = this.state.filterValues[name] || '';
      if (type === 'select') {
        const optionsMarkup = options.map(({ label, value }) => {
          return <option value={value} key={value}>{label}</option>;
        });

        return (
          <select className="admin-pagelist__filter" value={selectedValue} key={name} onChange={(e) => { this.onFilterChange(name, e.target.value); }}>
            <option value="" key="empty">{placeholder}</option>
            {optionsMarkup}
          </select>
        );
      }

      if (type === 'input') {
        return (
          <input className="admin-pagelist__filter" value={selectedValue} key={name} placeholder={placeholder} onChange={(e) => { this.onFilterChange(name, e.target.value); }} />
        );
      }

      return null;
    });

    return (
      <div className="admin-pagelist__wrapper">
        { pageListFilters.length > 0 &&
          <div className="admin-pagelist__filter-container">
            { filterMarkup }
            <button onClick={this.resetFilters}>Nullstill filter</button>
          </div>
        }
        {
          filteredPages.map((page) => {
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

PageList.propTypes = {
  pageListFilters: PropTypes.array,
};

PageList.contextTypes = {
  lang: PropTypes.string,
  config: PropTypes.object,
  adminConfig: PropTypes.object,
};

