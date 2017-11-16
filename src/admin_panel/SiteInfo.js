import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import I from '../i18n/Internationalization';
import config from '../../../../nocms_config.js';

const SiteInfo = (props) => {
  const { templateId, createdBy, published, publishedDate, revision } = props;
  const template = config.templates
    .filter((obj) => { return obj.id === templateId; });
  return (
    <div className="admin-menu__site-info">
      <dl>
        <dt><I>Versjon</I></dt>
        <dd>{revision}</dd>
        <dt><I>Maltype</I></dt>
        <dd>{template[0].name}</dd>
        <dt><I>Opprettet</I></dt>
        <dd>{moment(publishedDate).format('L')}</dd>
        <dt><I>Opprettet av</I></dt>
        <dd>{createdBy}</dd>
        { published ?
          <span>
            <dt><I>Publisert periode</I></dt>
            <dd />
          </span> : null }
      </dl>
    </div>
  );
};

SiteInfo.propTypes = {
  templateId: PropTypes.string,
  createdBy: PropTypes.string,
  published: PropTypes.bool,
  publishedDate: PropTypes.string,
  revision: PropTypes.number,
};

module.exports = SiteInfo;
