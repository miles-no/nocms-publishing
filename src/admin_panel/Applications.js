// @TODO: rewrite
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminMenuDialog from '../AdminMenuDialog';
import MenuSectionWrapper from './MenuSectionWrapper';
import { dictionary } from '../i18n/Internationalization';

export default class Applications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalHeight: '',
    };
    this.setFrameHeight = this.setFrameHeight.bind(this);
  }

  setFrameHeight() {
    const height = `${(this.ifr.contentWindow.document.body.scrollHeight + 200)}px`;
    this.setState({
      modalHeight: height,
    });
  }
  render() {
    const { admin: isAdmin, publisher: isPublisher } = this.props.claims;
    if (!isAdmin && !isPublisher) {
      return null;
    }
    const menuItemClass = 'admin-menu__item';
    return (
      <MenuSectionWrapper folderName={dictionary('Applikasjoner', this.context.lang)}>
        <div className="admin-menu__edit">
          <ul className="admin-menu__actions unstyled-list">
            { isPublisher ?
              <li className={menuItemClass}>
                <AdminMenuDialog
                  instructionContent={dictionary('Språk', this.context.lang)}
                  title={dictionary('Jeg ønsker å håndtere språk og uttrykk', this.context.lang)}
                  text={dictionary('Språk', this.context.lang)} icon="language"
                >
                  <iframe
                    className="application__iframe"
                    src="/applications/i18n"
                    title="Internationalization"
                    onLoad={() => {
                      this.setFrameHeight();
                    }}
                    ref={(iframe) => { this.ifr = iframe; }}
                    style={{ height: this.state.modalHeight }}
                  />
                </AdminMenuDialog>
              </li>
              : null }
            { isAdmin ?
              <li className={menuItemClass}>
                <AdminMenuDialog
                  instructionContent={dictionary('Menneskene', this.context.lang)}
                  title={dictionary('Jeg ønsker å endre data om menneskene', this.context.lang)}
                  text={dictionary('Menneskene', this.context.lang)} icon="people"
                >
                  <iframe
                    className="application__iframe"
                    src="/applications/people-admin"
                    title="People admin"
                    onLoad={() => {
                      this.setFrameHeight();
                    }}
                    ref={(iframe) => { this.ifr = iframe; }}
                    style={{ height: this.state.modalHeight }}
                  />
                </AdminMenuDialog>
              </li>
              : null }
            { isAdmin ?
              <li className={menuItemClass}>
                <AdminMenuDialog
                  instructionContent={dictionary('Sosialt', this.context.lang)}
                  title={dictionary('Jeg ønsker å endre/legge til arrangement', this.context.lang)}
                  text={dictionary('Sosialt', this.context.lang)} icon="event"
                >
                  <iframe
                    className="application__iframe"
                    src="/applications/smiles-admin"
                    title="SMiles"
                    onLoad={() => {
                      this.setFrameHeight();
                    }}
                    ref={(iframe) => { this.ifr = iframe; }}
                    style={{ height: this.state.modalHeight }}
                  />
                </AdminMenuDialog>
              </li>
              : null }
          </ul>
        </div>
      </MenuSectionWrapper>
    );
  }
}

Applications.propTypes = {
  claims: PropTypes.object,
};

Applications.defaultProps = {
  claims: {},
};
