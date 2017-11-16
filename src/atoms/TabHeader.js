import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TabHeader extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.onClick(this.props.item.id, e);
  }

  render() {
    const activeClass = (this.props.active ? 'tabs__tab--active' : '');
    return (
      <li key={this.props.item.id} className="tabs__tab">
        {this.props.disabled ? <span className="tabs__tab--disabled">{this.props.item.name}</span> : <a href="#" onClick={this.onClick} className={activeClass}>{this.props.item.name}</a>}
      </li>
    );
  }
}

TabHeader.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  item: PropTypes.object,
  active: PropTypes.bool,
};

TabHeader.defaultProps = {
  disabled: false,
};
