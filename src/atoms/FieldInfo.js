import React from 'react';
import PropTypes from 'prop-types';

const FieldInfo = (props) => {
  const {
    text,
  } = props;

  return (
    <div className="admin-form__field-info">
      {text}
    </div>
  );
};

FieldInfo.propTypes = {
  text: PropTypes.string,
};

export default FieldInfo;
