import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import I from '../i18n/Internationalization';

const SiteInfo = (props) => {
  const { templateId, createdBy, published, publishedDate, revision, templates } = props;
  const template = templates.find((obj) => { return obj.id === templateId; });
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
  templates: PropTypes.array,
};

export default SiteInfo;
