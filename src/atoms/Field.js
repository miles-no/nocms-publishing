import React from 'react';
import { Field as FormField } from 'nocms-forms';

const Field = (props) => {
  return (<FormField
    requiredMark={null}
    notRequiredMark="Valgfritt"
    controlGroupClass="admin-form__control-group"
    errorWrapperClass="admin-form__error-wrapper"
    errorTextClass="admin-form__error-text"
    labelClass="admin-form__label"
    {...props}
  />);
};

export default Field;
