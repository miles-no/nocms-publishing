import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NameUrlTab from '../NameUrlTab';

export default class LinkButton extends Component {
  render() {
    const linkWrapperClassName = this.props.noPadding ? '' : 'button-link__wrapper';
    const linkClassname = this.props.className ? `${this.props.className}` : 'button-link__link';
    const linkButton = this.props.content.title ? <a className={linkClassname} href={this.props.content.url}>{this.props.content.title}</a> : null;
    const renderedResult = this.context.editMode && this.props.activeEditMode
      ? <div className={linkWrapperClassName}><NameUrlTab activeEditMode={this.props.activeEditMode} content={this.props.content} scope={this.props.scope} /></div>
      : <div className={linkWrapperClassName}>{linkButton}</div>;
    return renderedResult;
  }
}

LinkButton.contextTypes = {
  editMode: PropTypes.bool,
};

LinkButton.propTypes = {
  activeEditMode: PropTypes.bool,
  content: PropTypes.object,
  scope: PropTypes.string,
  className: PropTypes.string,
  noPadding: PropTypes.bool,
};

LinkButton.defaultProps = {
  content: {},
  noPadding: false,
};
