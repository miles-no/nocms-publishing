import React from 'react';
import PropTypes from 'prop-types';
import { Field as FormField } from 'nocms-forms';

const Field = (props) => {
  let controlGroupClass = 'admin-form__control-group';
  if (props.type === 'radio' || props.type === 'checkbox') {
    controlGroupClass += ' admin-form__control-group--inline';
  }
  return (<FormField
    requiredMark={null}
    notRequiredMark="Valgfritt"
    notRequiredClass="admin-form__label--not-required"
    controlGroupClass={controlGroupClass}
    errorWrapperClass="admin-form__error-wrapper"
    errorTextClass="admin-form__error-text"
    labelClass="admin-form__label"
    {...props}
  />);
};

Field.propTypes = {
  type: PropTypes.string,
};

export default Field;
