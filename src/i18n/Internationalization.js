import React from 'react';
import PropTypes from 'prop-types';

const dictionary = require('./dictionary');

const Internationalization = (props, context) => {
  return <span>{dictionary(props.children, context.lang)}</span>;
};

Internationalization.contextTypes = {
  lang: PropTypes.string,
};

Internationalization.propTypes = {
  children: PropTypes.node,
};

Internationalization.dictionary = dictionary;

module.exports = Internationalization;
