import React from 'react';
import { Form as NoCMSForm } from 'nocms-forms';

const Form = (props) => {
  return (<NoCMSForm
    className="admin-form"
    submitButtonClassName="button admin-form__button-submit"
    {...props}
  />);
};

export default Form;
