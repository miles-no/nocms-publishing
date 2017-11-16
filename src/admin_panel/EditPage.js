import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminMenuDialog from '../AdminMenuDialog';
import PageSettings from '../dialogs/PageSettings';
import DeletePage from '../dialogs/DeletePage';
import MovePage from '../dialogs/MovePage';
import { dictionary } from '../i18n/Internationalization';
// import smoothscroll from 'smoothscroll';
import IconButton from '../atoms/IconButton';

export default class EditPage extends Component {
  constructor(props) {
    super(props);
    this.copySite = this.copySite.bind(this);
    this.deletePage = this.deletePage.bind(this);
    this.movePage = this.movePage.bind(this);
    this.previousVersions = this.previousVersions.bind(this);
  }

  render() {
    const menuItemClass = 'admin-menu__item';
    return (
      <div className="admin-menu__edit">
        <ul className="admin-menu__actions unstyled-list">
          <li className={menuItemClass}>
            <AdminMenuDialog
              instructionContent={dictionary('Sideinnstillinger', this.context.lang)}
              instructionTitle={dictionary('Jeg ønsker å endre på sideinnstillingene', this.context.lang)}
              text={dictionary('Sideinnstillinger', this.context.lang)} icon="settings"
            >
              <PageSettings {...this.props.pageData} />
            </AdminMenuDialog>
          </li>
          <li className={menuItemClass}>
            <IconButton iconType="content_copy" text={dictionary('Kopier siden', this.context.lang)} transparent noBorder onClick={this.copySite} />
          </li>
          <li className={menuItemClass}>
            <AdminMenuDialog
              instructionContent={dictionary('Flytt siden', this.context.lang)}
              instructionTitle={dictionary('Jeg ønsker å flytte siden', this.context.lang)}
              text={dictionary('Flytt side', this.context.lang)} icon="trending_flat"
            >
              <MovePage {...this.props.pageData} />
            </AdminMenuDialog>
          </li>
          <li className={menuItemClass}>
            <AdminMenuDialog
              instructionContent={dictionary('Slett siden', this.context.lang)}
              instructionTitle={dictionary('Jeg ønsker å slette siden', this.context.lang)}
              text={dictionary('Slett side', this.context.lang)} icon="delete"
            >
              <DeletePage {...this.props.pageData} />
            </AdminMenuDialog>
          </li>
          <li className={menuItemClass}>
            <IconButton iconType="undo" text={dictionary('Tidligere versjoner av siden', this.context.lang)} transparent noBorder onClick={this.previousVersions} />
          </li>
        </ul>
      </div>
    );
  }
}

EditPage.propTypes = {
  pageData: PropTypes.object,
};
