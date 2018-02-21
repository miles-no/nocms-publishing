import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { I } from 'nocms-i18n';

const SiteInfo = (props) => {
  const { templateId, created, published, revision, templates } = props;
  const template = templates.find((obj) => { return obj.id === templateId; });
  return (
    <div className="admin-menu__site-info">
      <dl>
        <dt><I>Versjon</I></dt>
        <dd>{revision}</dd>
        <dt><I>Maltype</I></dt>
        <dd><I>{template.name}</I></dd>
        <dt><I>Opprettet</I></dt>
        <dd>{moment(created.time).format('L')}</dd>
        <dt><I>Opprettet av</I></dt>
        <dd>{created.user}</dd>
        <dt><I>Publisert</I></dt>
        <dd>{Object.keys(published).length === 0 ?
          <I>Denne versjonen er ikke publisert</I>
          : `${moment(published.time).format('L')}`}
        </dd>
        <dt><I>Publisert av</I></dt>
        <dd>{Object.keys(published).length === 0 ?
          <I>Denne versjonen er ikke publisert</I>
          : `${published.user}`}
        </dd>
      </dl>
    </div>
  );
};

SiteInfo.propTypes = {
  templateId: PropTypes.string,
  published: PropTypes.object,
  created: PropTypes.object,
  revision: PropTypes.number,
  templates: PropTypes.array,
};

export default SiteInfo;
