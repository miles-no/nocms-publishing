import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { I, dictionary } from 'nocms-i18n';
import AdminMenuDialog from '../AdminMenuDialog';
import PageHistory from '../dialogs/PageHistory';

const SiteInfo = (props, context) => {
  const { templateId, created, firstPublished, revision, templates, uri, site } = props;
  const { adminLang, i18n } = context;
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
        <dt><I>Publisert 1. gang</I></dt>
        <dd>{Object.keys(firstPublished).length === 0 ?
          <I>Ikke publisert</I>
          : `${moment(firstPublished.time).format('L')}`}
        </dd>
        <dt><I>Publisert 1. gang av</I></dt>
        <dd>{Object.keys(firstPublished).length === 0 ?
          <I>Ikke publisert</I>
          : `${firstPublished.user}`}
        </dd>
      </dl>
      <AdminMenuDialog
        title={dictionary(i18n, 'Jeg ønsker å se historikken til siden', adminLang)}
        text={dictionary(i18n, 'Sidehistorikk', adminLang)}
        icon="history"
        centered
        widthConstrained
      >
        <PageHistory uri={uri} site={site} />
      </AdminMenuDialog>
    </div>
  );
};

SiteInfo.contextTypes = {
  adminLang: PropTypes.string,
  i18n: PropTypes.object,
};

SiteInfo.propTypes = {
  templateId: PropTypes.string,
  firstPublished: PropTypes.object,
  uri: PropTypes.string,
  site: PropTypes.string,
  created: PropTypes.object,
  revision: PropTypes.number,
  templates: PropTypes.array,
};

SiteInfo.defaultProps = {
  published: {},
  firstPublished: {},
};

export default SiteInfo;
